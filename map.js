//tiles object, contains tileset images and properties
var tiles = {
    w: 50,
    h: 50
};
tiles.img = new Image();
tiles.img.src = "tiles.png";

//map object contains map info and cells array
var map = {
    size: 8
};
map.cells = new Array(map.size); //1D array
for (var i = 0; i < map.size; i++) {
    map.cells[i] = new Array(map.size); //2D array (x,y) = [x][y]
}
for (var y = 0; y < map.size; y++) {
    for (var x = 0; x < map.size; x++) {
        map.cells[x][y] = 0; //give each cell the default value
    }
}
//for demonstration only
for (var y = 0; y < map.size; y++) {
    for (var x = 0; x < map.size; x++) {
        if (x == y) { //draw a diagonal line of blue squares
            map.cells[x][y] = 1;
        }
        if (Math.abs(x-y) == (map.size-1)) { //color remainig corners brown
            map.cells[x][y] = 2;
        }
        map.cells[4][6] = 3; //color cell 4,6 black
    }
}

//mirror map horizontally and vertically
var copy;
for (var x=0; x<map.size; x++) {
    //using slice returns a copy instead of a pointer
    copy = map.cells[x].slice();
    for (var i=0; i<map.size; i++) {
        //push adds to the end, pop takes from the end
        map.cells[x].push(copy.pop());
    }
}
copy = map.cells.slice();
for (var i=0; i<map.size; i++) {
    map.cells.push(copy.pop());
}
//map is now twice as big
map.size *= 2;

//game entities (terrain, armies, etc) - currently just tile coords
var entities = new Array();
//green square
entities.push({x: 0, y: 0});
//blue square
entities.push({x: 1, y: 0});
//brown square
entities.push({x: 0, y: 1});
//black square
entities.push({x: 1, y: 1});

//initialize canvas variables into the global scope
var canvas;
var ctx;

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
