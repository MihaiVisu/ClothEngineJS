var Cloth = window.Cloth || {};

// settings
Cloth.config = function () {
    "use strict";
    var physics_accuracy = 3,
        mouse_influence = 20,
        mouse_cut = 5,
        gravity = 1200,
        cloth_height = 30,
        cloth_width = 50,
        start_y = 20,
        spacing = 7,
        tear_distance = 60,
        canvas,
        ctx,
        cloth,
        boundsx,
        boundsy,
        mouse = {
            down: false,
            button: 1,
            x: 0,
            y: 0,
            px: 0,
            py: 0
        };

    return {
        physics_accuracy: physics_accuracy,
        mouse_influence: mouse_influence,
        mouse_cut: mouse_cut,
        gravity: gravity,
        cloth_height: cloth_height,
        cloth_width: cloth_width,
        start_y: start_y,
        spacing: spacing,
        tear_distance: tear_distance,
        canvas: canvas,
        ctx: ctx,
        cloth: cloth,
        boundsx: boundsx,
        boundsy: boundsy,
        mouse: mouse
    };
};
