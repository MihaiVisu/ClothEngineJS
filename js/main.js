var ClothEngine = ClothEngine || {};

$(function () {

    ClothEngine.config.canvas = document.getElementById('c');
    ClothEngine.config.canvas.width = 560;
    ClothEngine.config.canvas.height = 350;
    ClothEngine.config.ctx = ClothEngine.config.canvas.getContext('2d');
    ClothEngine.ClothManager.initialize(ClothEngine.config.canvas,
                                        ClothEngine.config.ctx);

});
