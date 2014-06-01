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

