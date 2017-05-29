//tiles object, contains tileset images and properties
var tiles = {
    w: 50,
    h: 50,
    img: new Image()
};
tiles.img.src = "tiles.png";

//map object contains map info and cells array
var map = {
    size: 8,
    cells: [] //parent (x-coordinate) array
};
for(var x=0; x<map.size; x++) {
    map.cells[x] = []; //child (y-coordinate) array
    for(var y=0; y<map.size; y++) {
        //give each cell the default value
        map.cells[x][y] = 0;
    }
}

//for demonstration only
for(var x=0; x<map.size; x++) {
    for(var y=0; y<map.size; y++) {
        if(x == y) { //draw a diagonal line of blue squares
            map.cells[x][y] = 1;
        }
        if(Math.abs(x-y) == (map.size-1)) { //color remainig corners brown
            map.cells[x][y] = 2;
        }
        map.cells[4][6] = 3; //color cell 4,6 black
    }
}

//mirror map vertically
var copy;
for(var x=0; x<map.size; x++) {
    //using slice returns a copy instead of a pointer
    copy = map.cells[x].slice();
    for(var i=0; i<map.size; i++) {
        //push adds to the end, pop takes from the end
        map.cells[x].push(copy.pop());
    }
}
//mirror map horizontally
copy = map.cells.slice();
for(var i=0; i<map.size; i++) {
    map.cells.push(copy.pop());
}
//map is now twice as big
map.size *= 2;

//game entities (terrain, armies, etc) - currently just tile coords
var entities = [];
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

//wait until the document is done loading, otherwise canvas might not exist yet
$(function() {
    //store the canvas element in a variable for easy access
    canvas = document.getElementById("canvas");
    //set size here rather than in index, automatically updates if configs change
    canvas.width = tiles.w * map.size;
    canvas.height = tiles.h * map.size;

    //drawing takes place on the canvas context, not the element, and we want a 2d context
    ctx = canvas.getContext("2d");

    //draw functions cannot be defined before ctx is available
    //tiles.draw takes in coords, not pixel locations
    //i.e. send in 2, 0 to draw in the third cell on the top row
    tiles.draw = function(xTile, yTile, xDraw, yDraw) {
        //drawImage() takes 9 data points:
        //1)source image,
        //2-5)coords and size from that image,
        //6-9)coords and size to draw on the context
        ctx.drawImage(
            this.img,
            xTile * this.w,
            yTile * this.h,
            this.w, this.h,
            xDraw * this.w,
            yDraw * this.h,
            this.w, this.h
        );
    };

    map.draw = function() {
        var xTile, yTile;
        for (var x=0; x<this.size; x++) {
            for(var y=0; y<this.size; y++) {
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
