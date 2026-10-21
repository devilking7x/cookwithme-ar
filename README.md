# CookWithMe AR — Smart Kitchen Assistant for SPECS Glasses

A hands-free AR utility Lens for the Devpost **Learn AR with SPECS**
hackathon. It projects step-by-step recipe cards beside the workspace,
a visual timer over the stove, and contextual ingredient cues into the
cook's field of view — so phones stay out of the kitchen and hands stay
free (and clean).

- **Team:** Raza7x (solo)
- **Deadline:** 10 Nov 2026, 03:30 IST
- **Prizes:** $2,500 total (1st $1,250 / 2nd $750 / 3rd $500)
- **Demo recipe:** Masala Chai (6 steps, 3 timed steps)

## Why it wins (AR principles, not a floating website)

1. **Shares your view** — cues follow the step you are on now; only the
   current step's ingredients are shown.
2. **Draws in the world** — the card sits beside the workspace at real
   size; the timer sits over the stove where the pan is.
3. **Leaves your body free** — no phone to touch; timers auto-advance,
   and steps move through tap zones (rebound to gesture/voice on
   glasses).

## Repo layout

```
devpost/                  # Mandatory planning docs (design brief, user
                          # journey, spatial UI layout, judging map)
lens/
  Scripts/
    RecipeController.js   # Recipe state machine + timer + script.api
    NextButton.js         # Tap zone -> next step
    PrevButton.js         # Tap zone -> previous step
    RestartButton.js      # Done panel tap -> restart
  scene-hierarchy.md      # Object tree + @input wiring for Lens Studio
  README.md               # Lens Studio / CLAD / MCP build steps
tests/
  recipe-controller.test.js  # Node test (stubbed Lens Studio globals)
DEVPOST_SUBMISSION.md     # Paste-ready Devpost write-up
```

## Run it (Lens Studio preview, no glasses needed)

See `lens/README.md`: create a Lens Studio project, recreate the scene
from `lens/scene-hierarchy.md` (or hand it to CLAD / the Lens Studio
MCP), wire the `@inputs`, press play, and record the preview for the
demo video.

## Test the logic (no Lens Studio needed)

```
node tests/recipe-controller.test.js
```

## Submission status

- [x] Repo built + pushed (planning docs + Lens scripts + tests)
- [ ] Lens assembled + previewed in Lens Studio via CLAD/MCP (laptop)
- [ ] Demo video < 3 min on YouTube, recorded from the preview
- [ ] Devpost project page submitted before 10 Nov 2026, 03:30 IST
  (Start project click + description + video + repo link — your clicks)

## Honesty notes

- `devpost/` docs are plan-lens-equivalent briefs. The canonical
  skill-pack run (`npx skills add challengepost/learn-specs --all -y`,
  then "Run the plan-lens skill") can be run on the laptop for the
  interview output.
- The controller is tested in Node with stubbed Lens Studio globals;
  the Lens Studio preview is the ground truth for final behaviour.
- This is a new project created during the submission period
  (Oct 22, 2026). No old code.
