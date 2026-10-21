// CookWithMe AR — RecipeController.js
// Lens Studio script. Attach to a SceneObject (e.g. "CookWithMeRoot").
// Wire the @inputs in the Inspector (see lens/scene-hierarchy.md).
// State machine: one visible step at a time, timers auto-start and
// auto-advance, ingredient line follows the current step.
// Other scripts call this one through script.api (Next/Back/Restart).

// @input SceneObject cardRoot
// @input Component.Text titleText
// @input Component.Text instructionText
// @input Component.Text counterText
// @input Component.Text timerText
// @input Component.Text ingredientText
// @input SceneObject donePanel

// Demo recipe. Swapping recipes = editing this one array.
var RECIPE = {
    name: "Masala Chai",
    servings: 2,
    steps: [
        {
            title: "Boil water",
            instruction: "Pour 2 cups of water into a pan and bring it to a rolling boil.",
            durationSeconds: 120,
            ingredients: ["Water"],
            tip: "Use a heavy-bottom pan so it does not boil over."
        },
        {
            title: "Add ginger & cardamom",
            instruction: "Crush a 1-inch piece of ginger and 2 cardamom pods, then add them to the boiling water.",
            durationSeconds: 60,
            ingredients: ["Ginger", "Cardamom"],
            tip: "Crush, don't chop — more flavour releases."
        },
        {
            title: "Add tea leaves",
            instruction: "Add 2 teaspoons of black tea leaves and boil for 2 minutes.",
            durationSeconds: 120,
            ingredients: ["Black tea leaves"],
            tip: ""
        },
        {
            title: "Add milk & sugar",
            instruction: "Pour in 1 cup of milk and sugar to taste. Stir once.",
            durationSeconds: 0,
            ingredients: ["Milk", "Sugar"],
            tip: "Full-cream milk gives the richest taste."
        },
        {
            title: "Simmer",
            instruction: "Simmer on low heat for 5 minutes. Stir occasionally so the milk does not stick.",
            durationSeconds: 300,
            ingredients: [],
            tip: "Low heat only — high heat splits the milk."
        },
        {
            title: "Strain & serve",
            instruction: "Strain the chai into cups and serve hot.",
            durationSeconds: 0,
            ingredients: [],
            tip: ""
        }
    ]
};

var currentStep = 0;
var remainingSeconds = 0;
var timerRunning = false;

function clampStep(i) {
    if (i < 0) return 0;
    if (i > RECIPE.steps.length - 1) return RECIPE.steps.length - 1;
    return i;
}

function formatTime(totalSeconds) {
    var s = Math.max(0, Math.ceil(totalSeconds));
    var m = Math.floor(s / 60);
    var sec = s % 60;
    return m + ":" + (sec < 10 ? "0" + sec : sec);
}

function showStep(i) {
    currentStep = clampStep(i);
    var step = RECIPE.steps[currentStep];
    titleText.text = step.title;
    instructionText.text = step.instruction;
    counterText.text = "Step " + (currentStep + 1) + " of " + RECIPE.steps.length;
    if (step.ingredients.length > 0) {
        ingredientText.text = "You need now: " + step.ingredients.join(", ");
    } else {
        ingredientText.text = "No new ingredients";
    }
    remainingSeconds = step.durationSeconds;
    timerRunning = step.durationSeconds > 0;
    timerText.text = timerRunning ? formatTime(remainingSeconds) : "";
    cardRoot.enabled = true;
    donePanel.enabled = false;
}

function nextStep() {
    if (currentStep < RECIPE.steps.length - 1) {
        showStep(currentStep + 1);
    } else {
        // Last step: do not wrap around (a cook holding a hot pan must
        // never be surprised by Step 1 reappearing).
        timerRunning = false;
        cardRoot.enabled = false;
        donePanel.enabled = true;
    }
}

function prevStep() {
    if (currentStep > 0) {
        showStep(currentStep - 1);
    }
}

function restart() {
    showStep(0);
}

// Timer tick. On expiry, auto-advance — the hands-free moment.
script.createEvent("UpdateEvent").bind(function(event) {
    if (!timerRunning) {
        return;
    }
    remainingSeconds -= event.getDeltaTime();
    if (remainingSeconds <= 0) {
        remainingSeconds = 0;
        timerRunning = false;
        nextStep();
        return;
    }
    timerText.text = formatTime(remainingSeconds);
});

// Public API for the button scripts (NextButton / PrevButton / RestartButton).
script.api.nextStep = nextStep;
script.api.prevStep = prevStep;
script.api.restart = restart;
script.api.getCurrentStep = function() { return currentStep; };

showStep(0);
