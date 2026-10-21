# CookWithMe AR — Devpost Submission Write-up

## Inspiration

Cooking with a phone is miserable: the screen locks, your hands are wet
or covered in flour, and touching the device mid-recipe is unhygienic.
I wanted the recipe to live where the cooking happens — beside the
workspace, over the stove — without anything to touch.

## What it does

CookWithMe AR is a hands-free kitchen assistant Lens for SPECS glasses:

- **Step-by-step recipe cards** projected beside the workspace (one step
  at a time, never a wall of text).
- **A visual timer over the stove** for timed steps — large digits you
  can watch while stirring.
- **Contextual ingredient cues** — only the current step's ingredients
  ("You need now: ginger, cardamom"), updated every step.
- **Hands-free flow** — timers auto-advance when they finish; steps move
  through tap zones in the preview (rebound to gesture/voice on
  glasses). A Done panel with restart ends the recipe.

Demo recipe: Masala Chai (6 steps, 3 timed steps). The recipe is one
data array, so any recipe can be swapped in.

## How we built it

- Planned with plan-lens-equivalent briefs in the `devpost/` folder
  (design brief, user journey, spatial UI layout, judging map).
- Built in Lens Studio with the CLAD plugin and the Lens Studio MCP:
  a `RecipeController` state machine (steps + timer + `script.api`) and
  three tiny button scripts, wired per `lens/scene-hierarchy.md`.
- Tested the controller logic in Node with stubbed Lens Studio globals
  (`node tests/recipe-controller.test.js`) before previewing.
- No SPECS glasses needed — everything runs in the Lens Studio
  preview on the laptop.

## Challenges we ran into

- **Keeping the cooking area clear:** the first layout idea put the
  card in the centre of view. The spatial UI doc moved it beside the
  workspace and capped on-screen elements at 3 — the cooking area is
  sacred.
- **Hands-free vs. preview input:** glasses gestures can't be tested
  without glasses, so preview tap zones stand in for gesture/voice
  binding, and the timer auto-advance carries the hands-free story.
- **No fake timers:** steps without a timer show an empty timer area,
  never a made-up countdown.

## Accomplishments that we're proud of

- A complete product flow (not a single-panel demo): full recipe,
  timers, ingredient cues, done + restart.
- A timer anchored to the stove — a placement only AR can do.
- Planning docs that map every judging criterion to evidence.

## What we learned

TODO after the preview run: what the Lens Studio preview taught us
about legibility, panel placement, and timer visibility (fill this in
once the preview video is recorded).

## What's next

- Voice pause/resume for timers.
- Ingredient chips as separate 3D objects (v1 uses one clear text line).
- A recipe picker (the data array is already swappable).

## Built with

Lens Studio, CLAD, Lens Studio MCP, JavaScript (Lens Studio scripts).

## AI assistance disclosure

Planning docs and Lens scripts were drafted with an AI coding
assistant (Muse) from the hackathon brief and the plan-lens workflow;
the Lens is assembled, previewed, and recorded in Lens Studio, and the
final submission decisions are the author's.

## Links

- Repo: https://github.com/devilking7x/cookwithme-ar
- Demo video: TODO (record from the Lens Studio preview, under 3 min,
  public on YouTube)
- Team: Raza7x (solo)
