# CookWithMe AR — Judging Criteria Map

## Criteria → evidence

### Design — a complete, coherent product experience

- Full recipe flow, not a single-panel demo: 6 steps, timers,
  ingredient cues, done + restart (see `user-journey.md`).
- Spatial layout follows the AR principles, not a floating website
  (see `spatial-ui-layout.md`).

### Technical Implementation — CLAD, Lens Studio, Lens Studio MCP

- Scripts are written for Lens Studio's runtime (`@input` wiring,
  TapEvent / UpdateEvent, `script.api` for cross-script calls).
- Scene structure is specified for CLAD/MCP assembly
  (`lens/scene-hierarchy.md`); the laptop workflow is in
  `lens/README.md` (create project → recreate hierarchy → wire
  `@inputs` → preview → record).
- Controller logic is tested in Node with stubbed Lens Studio globals
  (`tests/recipe-controller.test.js`).

### Innovation / Idea — creative, novel, different

- Hands-free cooking is a real, unsolved annoyance: phones get dirty,
  wet, and lock mid-recipe.
- The timer is anchored to the stove (where the pan is), not to a
  phone screen — a placement only AR can do.
- Ingredient cues are contextual (current step only), not a static
  shopping list pasted into view.

### Presentation — video shows it working end-to-end

- Video (under 3 minutes, public on YouTube) must show, in the Lens
  Studio preview: card beside workspace → timer over stove → timer
  auto-advance → Next/Back → Done → restart.
- Pitch: problem (dirty hands + locking screens), who (home cooks),
  why it matters (hygiene + flow). See `DEVPOST_SUBMISSION.md`.

## AR principles checklist

- [x] Shares your view — cues follow the current step.
- [x] Draws in the world — card beside workspace, timer over stove.
- [x] Leaves your body free — no phone touch; auto-advance on timers.

## Submission checklist

- [x] New project, created during the submission period (Oct 22, 2026).
- [x] Planning docs in `devpost/` (this folder).
- [x] Public GitHub repo with Lens Studio files + `devpost/` folder.
- [ ] Lens assembled + previewed in Lens Studio via CLAD/MCP (laptop step).
- [ ] Demo video < 3 min on YouTube, recorded from the preview (laptop step).
- [ ] Devpost project page submitted (Start project click + description +
      video + repo link) before **10 Nov 2026, 03:30 IST**.
