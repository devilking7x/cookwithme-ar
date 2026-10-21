// CookWithMe AR — NextButton.js
// Lens Studio script. Attach to the Next zone object.
// @input SceneObject controllerObject  (the object holding RecipeController.js)

script.createEvent("TapEvent").bind(function() {
    var controller = controllerObject.getComponent("Component.ScriptComponent");
    if (controller && controller.api && controller.api.nextStep) {
        controller.api.nextStep();
    }
});
