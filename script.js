var shape_sketch = function (p) {
  p.setup = function () {
    p.createCanvas(51, 51);
    p.rect(0, 0, 50, 50);
  }
}

var p5_shape = new p5(shape_sketch, "shape");

var grid_sketch = function (p) {
  var grid;

  p.setup = function () {
    p.createCanvas(251, 251);
    grid = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];
  }

  p.draw = function () {
    grid[Math.floor(p.random(5))][Math.floor(p.random(5))] = p.random([true, false]);
    grid.forEach(function (row, y) {
      row.forEach(function (cell, x) {
        if(cell) {
          p.fill(250, 250, 250);
        }
        else {
          p.fill(60, 60, 60);
        }
        p.rect(x*50, y*50, 50, 50);
      })
    })
  }
}


var rules_sketch = function (p) {
  var grid;
  var numrows = 10;
  var numcolumns = 20;
  var rowHeight = 25;
  var columnWidth = 25;

  function my_setup() {
    grid = [];
    for (var row = 0; row < numrows; row++) {
      grid[row] = [];
      for (var col = 0; col < numcolumns; col++) {
        grid[row][col] = false;
      }
    }
    grid[0][0] = true;
  }

  p.setup = function() {
    p.createCanvas(501, 251);
    my_setup();
  }

  function interesting() {
    var row = Math.floor(p.random(numrows));
    var col = Math.floor(p.random(numcolumns));
    var topleft = grid[row-1] && grid[row-1][col-1];
    var top = grid[row-1] && grid[row-1][col];
    var topright = grid[row-1] && grid[row-1][col+1];
    var left = grid[row][col-1];
    var right = grid[row][col+1];
    var bottomleft = grid[row+1] && grid[row+1][col-1];
    var bottom = grid[row+1] && grid[row+1][col];
    var bottomright = grid[row+1] && grid[row+1][col+1];
    var side = top || left || right || bottom;
    var corner = topleft || topright || bottomleft || bottomright;
    if ((top || left || right || bottom) && !(topleft && top && left) && !(top && topright && right) && !(left && bottomleft && bottom) && !(right && bottom && bottomright)){
      grid[row][col] = true;
    }
  }

  p.draw = function () {
    for(var i = 0; i < 10; i++) {
      interesting();
    }
    grid.forEach(function (row, y) {
      row.forEach(function (cell, x) {
        if (cell) {
          p.fill(250, 250, 250);
        }
        else {
          p.fill(60, 60, 60);
        }
        p.rect(x*rowHeight, y*columnWidth, rowHeight, columnWidth);
      })
    })
  }
  p.mouseClicked = function() {
    my_setup();
  }
}


var snake_sketch = function (p) {
  var grid;
  var numrows = 13;
  var numcolumns = 25;
  var rowHeight = 20;
  var columnWidth = 20;
  var row = 1;
  var col = 2;

  function my_setup() {
    grid = [];
    for (var row = 0; row < numrows; row++) {
      grid[row] = [];
      for (var col = 0; col < numcolumns; col++) {
        grid[row][col] = false;
      }
    }
    grid[1][1] = true;
  }

  p.setup = function() {
    p.createCanvas(500, 270);
    my_setup();
  }

  function snake() {
    var topleft = grid[row-1] && grid[row-1][col-1];
    var top = grid[row-1] && grid[row-1][col];
    var topright = grid[row-1] && grid[row-1][col+1];
    var left = grid[row][col-1];
    var right = grid[row][col+1];
    var bottomleft = grid[row+1] && grid[row+1][col-1];
    var bottom = grid[row+1] && grid[row+1][col];
    var bottomright = grid[row+1] && grid[row+1][col+1];
    var side = top || left || right || bottom;
    var corner = topleft || topright || bottomleft || bottomright;
    grid[row][col] = true;
    if (top) {
      if ((p.random(["Right", "Down"]) == "Down") && (row < numrows-1) && !(bottomleft)) {
        row++;
      }
      else {
        col++;
      }
    }
    if (left) {
      var direction = p.random(["Up", "Right", "Down"])
      if ((direction == "Up") && (row > 0) && !(topleft)) {
        row--;
      }
      else if ((direction == "Down") && (row < numrows-1) && !(bottomleft))  {
        row++;
      }
      else {
        col++;
      }
    }
    if (bottom) {
      if ((p.random(["Up", "Right"]) == "Up") && (row > 0) && !(topleft)) {
        row--;
      }
      else {
        col++;
      }
    }
    if (col > numcolumns) {
      p.noLoop();
    }
  }

  p.draw = function() {
    snake();
    grid.forEach(function (row, y) {
      row.forEach(function (cell, x) {
        if (cell) {
          p.fill(p.random(256), p.random(256), p.random(256));
        }
        else {
          p.fill(256, 256, 256);
          p.noStroke();
        }
        p.rect(x*rowHeight, y*columnWidth, rowHeight, columnWidth);
      })
    })
  }
  p.mouseClicked = function () {
    row = 1;
    col = 2;
    my_setup();
    p.loop();
  }
};
