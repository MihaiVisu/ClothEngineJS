var ClothEngine = ClothEngine || {};

ClothEngine.Line = function (p1, p2) {

    var Line = function () {
        this.p1 = p1;
        this.p2 = p2;
        this.length = ClothEngine.config.spacing;
    }

    Line.prototype = {
        resolve: function () {
            var diff_x = this.p1.x - this.p2.x,
                diff_y = this.p1.y - this.p2.y,
                dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y),
                diff = (this.length - dist) / dist,
                px = diff_x * diff * 0.5,
                py = diff_y * diff * 0.5;

            if (dist > ClothEngine.config.tear_distance) {
                this.p1.remove_constraint(this);
            }

            this.p1.x += px;
            this.p1.y += py;
            this.p2.x -= px;
            this.p2.y -= py;
        },
        draw: function () {
            var ctx = ClothEngine.config.ctx;

            ctx.moveTo(this.p1.x, this.p1.y);
            ctx.lineTo(this.p2.x, this.p2.y);
        };
    };
    return new Line();
};
