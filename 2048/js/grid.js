function Grid(size, previousState, prevUndoMoves) {
  this.size = size;
  this.cells = previousState ? this.fromState(previousState) : this.empty();
  this.undoMoves = prevUndoMoves ? this.getPrevUndoStates(prevUndoMoves) : this.emptyUndos();
}

// Build a grid of the specified size
Grid.prototype.empty = function () {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }
   return cells;
};

// Empty list of previous moves
Grid.prototype.emptyUndos = function () {
    var undoMoves = [];
   return undoMoves;
};

// Empty list of previous moves
Grid.prototype.getPrevUndoStates = function (state) {
  var prevMoves = [];
  // Don't allow user to undo after they have refreshed a page
  /*
  console.log(state)
  for (var x = 0; x < state.length; x++) {
      prevMoves[x] = state[x];
  }
  console.log(prevMoves);
  */
  return prevMoves;
};

Grid.prototype.fromState = function (state) {
  var cells = [];

  for (var x = 0; x < this.size; x++) {
    var row = cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      var tile = state[x][y];
      // When browser is refreshed, we need to make new Tile objects
      // because after refreshing, they become objects (not necessarily tiles)
      // Therefore, we cannot make call tile methods on it
      row.push(tile ? new Tile(tile.position, tile.value) : null);
    }
  }

  return cells;
};

// Find the first available random position
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

// Check if the specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

// Inserts a tile at its position
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};

Grid.prototype.serialize = function () {
  var cellState = [];
 console.log(this.cells)
  for (var x = 0; x < this.size; x++) {
    var row = cellState[x] = [];

    for (var y = 0; y < this.size; y++) {

      row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
    }
  }
  console.log(this.undoMoves.length)
  return {
    size: this.size,
    cells: cellState,
    undoMoves: this.undoMoves,
  };
};
