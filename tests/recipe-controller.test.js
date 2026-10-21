// CookWithMe AR — controller logic test (Node, no Lens Studio needed).
// Stubs Lens Studio globals (script events, Text / SceneObject components),
// loads the REAL lens/Scripts/*.js files in vm contexts, and simulates
// taps + timer ticks. Run from the repo root:
//   node tests/recipe-controller.test.js
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const assert = require("assert");

const SCRIPTS = path.join(__dirname, "..", "lens", "Scripts");

function loadController() {
    const handlers = {};
    const sandbox = {
        script: {
            api: {},
            createEvent: function (type) {
                return {
                    bind: function (fn) {
                        handlers[type] = fn;
                    },
                };
            },
        },
        cardRoot: { enabled: true },
        donePanel: { enabled: false },
        titleText: { text: "" },
        instructionText: { text: "" },
        counterText: { text: "" },
        timerText: { text: "" },
        ingredientText: { text: "" },
        console: console,
    };
    vm.createContext(sandbox);
    vm.runInContext(
        fs.readFileSync(path.join(SCRIPTS, "RecipeController.js"), "utf8"),
        sandbox
    );
    return { sb: sandbox, handlers: handlers };
}

function loadButton(file, controllerSandbox) {
    const handlers = {};
    const sandbox = {
        script: {
            createEvent: function (type) {
                return {
                    bind: function (fn) {
                        handlers[type] = fn;
                    },
                };
            },
        },
        controllerObject: {
            getComponent: function () {
                return { api: controllerSandbox.script.api };
            },
        },
        console: console,
    };
    vm.createContext(sandbox);
    vm.runInContext(fs.readFileSync(path.join(SCRIPTS, file), "utf8"), sandbox);
    return handlers;
}

let passed = 0;
function check(name, fn) {
    fn();
    passed += 1;
    console.log("PASS: " + name);
}

// --- Initial state -------------------------------------------------------
const c = loadController();
check("initial step is Step 1 of 6 with boil-water title", function () {
    assert.strictEqual(c.sb.counterText.text, "Step 1 of 6");
    assert.strictEqual(c.sb.titleText.text, "Boil water");
    assert.strictEqual(c.sb.ingredientText.text, "You need now: Water");
    assert.strictEqual(c.sb.timerText.text, "2:00");
    assert.strictEqual(c.sb.cardRoot.enabled, true);
    assert.strictEqual(c.sb.donePanel.enabled, false);
});

// --- Button navigation ---------------------------------------------------
const nextTap = loadButton("NextButton.js", c.sb).TapEvent;
const prevTap = loadButton("PrevButton.js", c.sb).TapEvent;
const restartTap = loadButton("RestartButton.js", c.sb).TapEvent;

check("Next tap moves to step 2 with ginger/cardamom + 1:00 timer", function () {
    nextTap();
    assert.strictEqual(c.sb.counterText.text, "Step 2 of 6");
    assert.strictEqual(c.sb.titleText.text, "Add ginger & cardamom");
    assert.strictEqual(c.sb.ingredientText.text, "You need now: Ginger, Cardamom");
    assert.strictEqual(c.sb.timerText.text, "1:00");
});

check("Prev tap returns to step 1 and resets its timer", function () {
    prevTap();
    assert.strictEqual(c.sb.counterText.text, "Step 1 of 6");
    assert.strictEqual(c.sb.timerText.text, "2:00");
});

check("Prev at step 1 clamps (no wrap to step 6)", function () {
    prevTap();
    assert.strictEqual(c.sb.counterText.text, "Step 1 of 6");
});

// --- Timer countdown + auto-advance --------------------------------------
check("timer ticks down 2:00 -> 1:59 on a 1s UpdateEvent", function () {
    c.handlers.UpdateEvent({ getDeltaTime: function () { return 1; } });
    assert.strictEqual(c.sb.timerText.text, "1:59");
});

check("timer expiry auto-advances to the next step", function () {
    c.handlers.UpdateEvent({ getDeltaTime: function () { return 119; } });
    assert.strictEqual(c.sb.counterText.text, "Step 2 of 6");
    assert.strictEqual(c.sb.timerText.text, "1:00");
});

check("non-timed step shows empty timer (step 4: milk & sugar)", function () {
    nextTap(); // step 3
    nextTap(); // step 4
    assert.strictEqual(c.sb.counterText.text, "Step 4 of 6");
    assert.strictEqual(c.sb.timerText.text, "");
    assert.strictEqual(c.sb.ingredientText.text, "You need now: Milk, Sugar");
});

check("UpdateEvent does nothing on a non-timed step", function () {
    c.handlers.UpdateEvent({ getDeltaTime: function () { return 30; } });
    assert.strictEqual(c.sb.counterText.text, "Step 4 of 6");
    assert.strictEqual(c.sb.timerText.text, "");
});

check("step with no new ingredients says so plainly (step 5: simmer)", function () {
    nextTap(); // step 5
    assert.strictEqual(c.sb.counterText.text, "Step 5 of 6");
    assert.strictEqual(c.sb.ingredientText.text, "No new ingredients");
    assert.strictEqual(c.sb.timerText.text, "5:00");
});

// --- Done + restart -------------------------------------------------------
check("Next past the last step shows Done panel, hides card", function () {
    nextTap(); // step 6
    assert.strictEqual(c.sb.counterText.text, "Step 6 of 6");
    nextTap(); // past last -> done
    assert.strictEqual(c.sb.cardRoot.enabled, false);
    assert.strictEqual(c.sb.donePanel.enabled, true);
});

check("Done panel tap restarts at step 1", function () {
    restartTap();
    assert.strictEqual(c.sb.counterText.text, "Step 1 of 6");
    assert.strictEqual(c.sb.cardRoot.enabled, true);
    assert.strictEqual(c.sb.donePanel.enabled, false);
    assert.strictEqual(c.sb.timerText.text, "2:00");
});

// --- Time formatting edge cases (fresh controller) ------------------------
const c2 = loadController();
check("format check via step timers: 60s -> 1:00, 300s -> 5:00", function () {
    assert.strictEqual(c2.sb.timerText.text, "2:00");
    c2.handlers.UpdateEvent({ getDeltaTime: function () { return 115; } });
    assert.strictEqual(c2.sb.timerText.text, "0:05");
});

console.log("\nAll " + passed + " checks passed.");
