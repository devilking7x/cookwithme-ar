# CookWithMe AR — User Journey

Persona: a home cook making weeknight chai. Hands will get wet, the phone
screen keeps locking, and the recipe is a wall of text. The Lens removes
all three problems.

## Before cooking

1. Cook opens the Lens (Lens Studio preview on laptop / SPECS glasses).
2. The recipe card appears beside the workspace — title "Masala Chai",
   "Step 1 of 6", first instruction, and the ingredients needed now.
3. Nothing is in the centre of view. The cooking area stays clear.

## During cooking (one step at a time)

4. The cook reads the single visible step and does it. Only the current
   step's instruction and ingredients are shown — no scrolling, no list.
5. On timed steps, the timer starts automatically and shows large digits
   over the stove area. The cook can watch it while stirring, without
   looking away from the pan.
6. When a timer finishes, the Lens auto-advances to the next step. No tap
   needed — this is the hands-free moment that matters most.
7. If the cook wants to move manually, the Next / Back zones at the
   bottom corners of the card advance or go back one step. In the
   preview these are clicked with the mouse; on glasses they are
   rebound to a hand gesture or voice command.
8. Ingredient cues update every step: "You need now: ginger, cardamom"
   becomes "You need now: black tea leaves". Steps with no new
   ingredients say so plainly ("No new ingredients") instead of
   showing a stale list.

## Finishing

9. After the last step, the card hides and a Done panel appears:
   "Done! Enjoy your chai."
10. Tapping the Done panel restarts the recipe from Step 1.

## Edge cases (handled in v1)

- **Going back:** Back zone returns to the previous step and resets that
  step's timer.
- **Last step + Next:** shows the Done panel instead of wrapping around
  (wrapping would confuse a cook holding a hot pan).
- **Timer on a non-timed step:** the timer area stays empty — no fake
  countdown is ever shown.
- **Restart:** always available from the Done panel.

## Deliberately NOT in v1 (future work)

- Pause / resume by voice (timer auto-starts and auto-advances; manual
  pause is a post-deadline addition).
- Ingredient chips as separate 3D objects (v1 uses one clear text line;
  the layout doc reserves the bottom-edge slot for chips).
- Multiple recipes / recipe picker (the data array is swappable; a
  picker UI is not built yet).
