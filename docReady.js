$(document).ready(function() { //wait until the document is done loading, otherwise canvas might not exist yet
    canvas = document.getElementById("canvas"); //store the canvas element in a variable for easy access
    //set size here rather than in index, automatically updates if configs change
    canvas.width = tiles.w * map.size;
    canvas.height = tiles.h * map.size;

    ctx = canvas.getContext("2d"); //drawing takes place on the canvas context, not the element, and we want a 2d context

    //draw functions cannot be defined before ctx is available
    //tiles.draw takes in coords, not pixel locations, i.e. send in 2, 0 to draw in the third cell on the top row
    tiles.draw = function(xTile, yTile, xDraw, yDraw) {
        //drawImage() takes 9 data points: 1)source image, 2-5)coords and size from that image, 6-9)coords and size to draw on the context
        ctx.drawImage(this.img, xTile * this.w, yTile * this.h, this.w, this.h, xDraw * this.w, yDraw * this.h, this.w, this.h);
    };

    map.draw = function() {
        for (var y = 0; y < this.size; y++) {
            for (var x = 0; x < this.size; x++) {
                entID = this.cells[x][y];
                xTile = entities[entID].x;
                yTile = entities[entID].y;
                tiles.draw(xTile, yTile, x, y);
            }
        }
    }

    //draw map
    map.draw();
});
