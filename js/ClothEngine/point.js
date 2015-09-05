var ClothEngine = ClothEngine || {};

ClothEngine.Point = function(x, y) {

    var mouse = ClothEngine.config.mouse,
    mouse_influence = ClothEngine.config.mouse_influence,
    mouse_cut = ClothEngine.config.mouse_cut,
    gravity = ClothEngine.config.gravity;

    var Point = function () {
        this.x      = x;
        this.y      = y;
        this.px     = x;
        this.py     = y;
        this.vx     = 0;
        this.vy     = 0;
        this.pin_x  = null;
        this.pin_y  = null;
        this.constraints = [];
    };

    Point.prototype = {
        update: function (delta) {

            if (mouse.down) {

                var diff_x = this.x - mouse.x,
                    diff_y = this.y - mouse.y,
                    dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

                if (mouse.button === 1) {

                    if (dist < mouse_influence) {
                        this.px = this.x - (mouse.x - mouse.px) * 1.8;
                        this.py = this.y - (mouse.y - mouse.py) * 1.8;
                    }

                } else if (dist < mouse_cut) {
                    this.constraints = [];
                }
            }

            this.add_force(0, gravity);

            delta *= delta;

            this.px = this.x;
            this.py = this.y;

            this.x = this.x + ((this.x - this.px) * 0.99) + ((this.vx / 2) * delta);
            this.y = this.y + ((this.y - this.py) * 0.99) + ((this.vy / 2) * delta);

            this.vy = this.vx = 0;
        },
        draw: function () {

            if (!this.constraints.length) {
                return;
            }

            var i = this.constraints.length;
            while (i) {
                this.constraints[i].draw();
                i -= 1;
            }
        },
        resolve_constraints: function () {

            if (this.pin_x !== null && this.pin_y !== null) {

                this.x = this.pin_x;
                this.y = this.pin_y;
                return;
            }

            var i = this.constraints.length;
            while (i) {
                this.constraints[i].resolve();
                i -= 1;
            }
        },
        attach: function (point) {
            this.constraints.push(
                new ClothEngine.Line(this, point)
            );
        },
        remove_constraint: function (constraint) {
            this.constraints.splice(this.constraints.indexOf(constraint), 1);
        },
        add_force: function (x, y) {
            this.vx += x;
            this.vy += y;
        },
        pin: function (pinx, piny) {
            this.pin_x = pinx;
            this.pin_y = piny;
        }
    };
    return new Point();
};
