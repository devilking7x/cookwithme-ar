# CookWithMe AR — Lens Studio Scene Hierarchy

Recreate this tree in Lens Studio (or hand it to CLAD / the Lens Studio
MCP as the build spec). No external 3D files are needed for v1 — panels
are plain planes with Text components, which keeps the Lens light and
legible on glasses.

## Object tree

```
CookWithMeRoot            (Script: RecipeController.js)
├── RecipeCard            (world-anchored panel beside the workspace)
│   ├── CardBackground    (plane, dark, semi-opaque)
│   ├── TitleText         (Text — step title)
│   ├── InstructionText   (Text — step instruction)
│   ├── CounterText       (Text — "Step X of 6")
│   └── IngredientText    (Text — "You need now: ..." / "No new ingredients")
├── TimerPanel            (world-anchored over the stove area)
│   └── TimerText         (Text — large "m:ss", empty on non-timed steps)
├── NextZone              (plane, bottom-right of card; Script: NextButton.js)
├── PrevZone              (plane, bottom-left of card; Script: PrevButton.js)
└── DonePanel             (plane + Text "Done! Enjoy your chai."; Script: RestartButton.js; initially DISABLED)
```

## @input wiring (Inspector)

RecipeController.js on CookWithMeRoot:

| @input | Wire to |
|---|---|
| cardRoot | RecipeCard |
| titleText | RecipeCard / TitleText |
| instructionText | RecipeCard / InstructionText |
| counterText | RecipeCard / CounterText |
| timerText | TimerPanel / TimerText |
| ingredientText | RecipeCard / IngredientText |
| donePanel | DonePanel |

Button scripts (NextButton / PrevButton / RestartButton):

| @input | Wire to |
|---|---|
| controllerObject | CookWithMeRoot |

Note: the controller exposes `script.api` (`nextStep`, `prevStep`,
`restart`, `getCurrentStep`); the button scripts call it through the
controller object's ScriptComponent. If your Lens Studio version names
the script component differently, CLAD/MCP will map it — the logic and
wiring above are what matter.

## Positioning (set in the preview)

- RecipeCard: beside the workspace, slightly below eye level, at arm's
  length — never over the cooking area.
- TimerPanel: above the stove area, large digits, visible while stirring.
- IngredientText: bottom edge of the card (peripheral slot; future work
  turns this line into separate 3D chips).
- NextZone / PrevZone: bottom corners of the card, big enough to click
  in the preview.
- DonePanel: centre of view, shown only after the last step.

## Preview checklist (for the demo video)

1. Card appears beside the workspace, not over it.
2. Timer runs over the stove area and counts down visibly.
3. A timer finishing auto-advances the step.
4. Next / Back zones change steps; the ingredient line updates.
5. Done panel appears after the last step; tapping it restarts.

## Glasses input (post-preview step)

In the preview, zones are clicked with the mouse. On SPECS, rebind
Next / Back to a hand gesture or voice command in Lens Studio. The
timer already advances hands-free, so the core flow needs no touch.
