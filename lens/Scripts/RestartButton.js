// CookWithMe AR — RestartButton.js
// Lens Studio script. Attach to the Done panel object.
// @input SceneObject controllerObject  (the object holding RecipeController.js)

script.createEvent("TapEvent").bind(function() {
    var controller = controllerObject.getComponent("Component.ScriptComponent");
    if (controller && controller.api && controller.api.restart) {
        controller.api.restart();
    }
});
