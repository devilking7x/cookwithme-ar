# CookWithMe AR — Spatial UI Layout

Layout rule first: the cooking area is sacred. Nothing floats over the
pan, the knife, or the centre of view while cooking is in progress.

## Elements

| Element | Placement | Why there |
|---|---|---|
| Recipe card (title, instruction, step counter) | World-anchored beside the workspace, slightly below eye level, at arm's length | Eyes stay up, hands stay free, cooking area stays clear |
| Timer (large digits) | World-anchored over the stove area, above the pan | The cook watches it while stirring, without looking away |
| Ingredient line | Bottom edge of view (peripheral), one short line | Glanceable, never blocks the work |
| Next / Back zones | Bottom corners of the recipe card | Reachable in preview by mouse click; rebound to gesture/voice on glasses |
| Done panel | Centre of view, only after the last step | Cooking is finished, so centre placement is safe here |

## Legibility rules (non-negotiable)

- **Maximum 3 UI elements on screen at once** during cooking
  (card + timer + ingredient line).
- **Large type everywhere.** The timer digits are the largest element;
  the instruction text is sized to read at arm's length, not phone
  distance.
- **High contrast.** Dark panel + light text (or the reverse) — no thin
  grey text over a busy kitchen background.
- **No scrolling lists, no centre-screen clutter, no pop-ups** while
  cooking. One step, one instruction, one timer.
- **Timer behaviour:** digits count down in `m:ss` format; the last
  30 seconds are the only moment the timer changes colour (amber) so
  the cook notices without an alarm sound.

## Hands-free rule

Nothing in the flow requires touching a phone. Preview clicks stand in
for the glasses input: on SPECS, Next / Back are rebound to a hand
gesture or a voice command, and the timer already advances hands-free.
This binding is a Lens Studio step (see `lens/README.md`), not
something faked in code.

## What the preview must prove (for the video)

1. Card appears beside the workspace, not over it.
2. Timer runs over the stove area and counts down visibly.
3. A timer finishing auto-advances the step.
4. Next / Back zones change steps, and the ingredient line updates.
5. Done panel appears after the last step; tapping it restarts.
