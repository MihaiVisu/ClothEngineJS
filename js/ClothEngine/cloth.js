var ClothEngine = ClothEngine || {};

ClothEngine.Cloth = function () {

    var Cloth = function () {
        this.points = [];
        var canvas = ClothEngine.config.canvas;
        var start_x = canvas.width / 2 - ClothEngine.config.cloth_width * ClothEngine.config.spacing/2

        for (var y = 0; y <= ClothEngine.config.cloth_height; y++) {
            for (var x = 0; x <= ClothEngine.config.cloth_width; x++) {
                var p = new Point(ClothEngine.config.start_x + x * ClothEngine.config.spacing, ClothEngine.config.start_y + y * ClothEngine.config.spacing);

                if (x !== 0) {
                    p.attach(this.points[this.points.length - 1]);
                }
                if ( y === 0) {
                    p.pin(p.x, p.y);
                }
                if ( y !== 0) {
                    p.attach(this.points[x + (y - 1) * (ClothEngine.config.cloth_width + 1)]);
                }

                this.points.push(p);
            }
        }
    };

    Cloth.prototype = {

        update: function () {
            var i = ClothEngine.config.physics_accuracy;

            while(i) {
                var p = this.points.length;
                while(p) {
                    this.points[p].resolve_constraints();
                    p -= 1;
                }
                i -= 1;
            }
            i = this.points.length;
            while(i) {
                this.points[i].update(0.016);
                i--;
            }
        },
        draw: function () {
            ClothEngine.config.ctx.beginPath();

            var i = ClothEngine.config.cloth.points.length;
            while(i) {
                ClothEngine.config.cloth.points[i].draw();
                i -= 1;
            }

            ClothEngine.config.ctx.stroke();
        }
    };
    return new Cloth();
}();
