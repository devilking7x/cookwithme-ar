# CookWithMe AR — Design Brief

> Plan-lens equivalent planning document for the Devpost **Learn AR with SPECS**
> hackathon. Lives in `devpost/` as required: the repo must include the
> planning docs behind the Lens.

- **Team:** Raza7x (solo)
- **Hackathon:** Learn AR with SPECS (Devpost) — deadline **10 Nov 2026, 03:30 IST**
- **Prizes:** $2,500 total (1st $1,250 / 2nd $750 / 3rd $500)
- **Stack:** Lens Studio + CLAD plugin + Lens Studio MCP, preview on laptop
  (no SPECS glasses required)

## One-liner

A hands-free AR kitchen assistant for SPECS glasses: step-by-step recipe
cards beside the workspace, a visual timer over the stove, and contextual
ingredient cues in the cook's field of view.

## Problem

Cooking with a phone or laptop is miserable: screens lock, hands are wet or
covered in flour, and touching a device mid-recipe is unhygienic and breaks
flow. Printed recipes can't show timers, can't highlight what you need
*right now*, and can't adapt when a step takes longer than expected.

## Target user

Home cooks (beginners and busy weeknight cooks) who follow a recipe while
their hands are busy or messy. They don't want a cooking *course* — they
want the next step, visible, without touching anything.

## Why AR — the three principles this Lens follows

1. **It shares your view.** The camera sees the kitchen, so cues relate to
   the step you are on *now* — only the current step's ingredients are
   shown, never the whole shopping list.
2. **It draws in the world.** The recipe card sits beside the workspace at
   real size; the timer sits over the stove where the pan actually is.
   This is not a website floating in front of your face.
3. **It leaves your body free.** No phone to touch. Steps advance through
   tap zones in the preview (rebind to hand gesture / voice on glasses),
   and timers auto-advance when they finish.

## User journey (summary — full doc: `user-journey.md`)

Open Lens → recipe card appears beside the workspace → follow one step at
a time → timer runs over the stove for timed steps → timer finishing
auto-advances to the next step → done panel → tap to restart.

## Spatial UI (summary — full doc: `spatial-ui-layout.md`)

- **Recipe card:** world-anchored beside the workspace, slightly below eye
  level, so the cooking area stays clear and eyes stay up.
- **Timer:** large digits over the stove area, visible in peripheral
  vision while stirring.
- **Ingredient cues:** one short line at the bottom edge of view —
  "You need now: ginger, cardamom" — only for the current step.
- **Legibility rule:** maximum 3 UI elements on screen at once, large
  type, high contrast, nothing cluttering the centre of view.

## Demo recipe

**Masala Chai** — 6 steps, 3 timed steps (boil 2:00, tea 2:00, simmer
5:00). Chosen because it is short, visual, timer-driven, and uses common
ingredients. The recipe is a single data array in
`lens/Scripts/RecipeController.js` — swapping recipes means editing one
array, not the UI code.

## Judging map

See `judging-map.md` (Design / Technical / Innovation / Presentation +
submission checklist).

## Honesty notes

- These `devpost/` docs are plan-lens-equivalent briefs written for this
  repo. The canonical skill-pack run on the laptop is:
  `npx skills add challengepost/learn-specs --all -y`, then
  "Run the plan-lens skill" — it produces the interview output; the
  briefs here are the same planning substance.
- The Lens is assembled and previewed in Lens Studio on the laptop via
  CLAD + MCP (see `lens/README.md`). The demo video must be recorded
  from the Lens Studio preview — reviewers don't clone or run projects,
  so the video is the proof it works.
- The controller logic is tested in Node with stubbed Lens Studio
  globals (`tests/recipe-controller.test.js`). Final behaviour must be
  confirmed in the Lens Studio preview.
