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
    }
}

//game entities (terrain, armies, etc) - currently just tile coords
var entities = new Array();
//green square
entities.push({x: 0, y: 0});
//blue square
entities.push({x: 1, y: 0});

//initialize canvas variables into the global scope
var canvas;
var ctx;

