# CookWithMe AR — Lens Studio folder

Scripts + scene spec for the Lens. Assembly and preview happen in Lens
Studio on a laptop (no SPECS glasses needed).

## Prereqs (per the hackathon)

Lens Studio, Node.js, Git, a coding agent that supports skills, the
CLAD plugin, and the Lens Studio MCP.

## Build steps (laptop)

1. Create a new Lens Studio project.
2. Recreate the object tree from `scene-hierarchy.md` (or hand the spec
   + these scripts to CLAD / the Lens Studio MCP and let it build it).
3. Attach `Scripts/RecipeController.js` to `CookWithMeRoot` and wire its
   `@inputs` per the wiring table in `scene-hierarchy.md`.
4. Attach the button scripts to their zones and set each one's
   `controllerObject` to `CookWithMeRoot`.
5. Position the card beside the workspace and the timer panel over the
   stove area in the preview.
6. Press play in the preview: click Next / Back zones, watch timers
   count down and auto-advance, finish the recipe, tap Done to restart.
7. Record the preview (under 3 minutes) for the Devpost demo video.

## Skill pack (canonical planning run)

```
npx skills add challengepost/learn-specs --all -y
```

Then in your coding agent: "Run the plan-lens skill." The `devpost/`
docs in this repo are the plan-lens-equivalent briefs; the skill-pack
run produces the interview output on top of them.

## Tests (no Lens Studio needed)

From the repo root:

```
node tests/recipe-controller.test.js
```

The harness stubs Lens Studio globals (`script` events, Text and
SceneObject components), loads the real `RecipeController.js` plus the
button scripts, and simulates taps + timer ticks. It asserts step
navigation, clamping, timer formatting/countdown, auto-advance on timer
expiry, ingredient lines, Done panel, and restart.

## Honesty note

The logic is tested in Node, but Lens Studio is the ground truth: if
the preview behaves differently from the test (e.g. the script
component name differs by version), trust the preview and adapt the
wiring — the state machine and layout spec stay the same.
