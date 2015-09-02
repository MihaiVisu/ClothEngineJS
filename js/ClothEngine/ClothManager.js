var ClothEngine = ClothEngine || {};

ClothEngine.ClothManager.prototype = function () {
    'use strict';

    this.initialize = function (canvas, ctx) {
        var mouse = ClothEngine.config.mouse,
            rect = canvas.getBoundingClientRect();

        canvas.on('mousedown', function (e) {
            mouse.button = e.which;
            mouse.px = mouse.x;
            mouse.py = mouse.y;
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.down = true;
            e.preventDefault();
        });

        canvas.on('mouseup', function (e) {
            mouse.down = false;
            e.preventDefault();
        });

        canvas.on('mousemove', function (e) {
            mouse.px  = mouse.x;
            mouse.py  = mouse.y;
            var rect  = canvas.getBoundingClientRect();
            mouse.x   = e.clientX - rect.left;
            mouse.y   = e.clientY - rect.top;
            e.preventDefault();
        });

        canvas.on('contextmenu', function (e) {
            e.preventDefault();
        });

        ClothEngine.config.boundsx = canvas.width - 1;
        ClothEngine.config.boundsy = canvas.height - 1;

        ctx.strokeStyle = '#888';

        ClothEngine.config.cloth = new Cloth();
        this.update();
    };
};