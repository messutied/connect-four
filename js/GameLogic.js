var GameLogic = {
  N_CONNECTS_TO_WIN: 4,
  N_ROWS: 6,
  N_COLUMNS: 7,

  /*
   * Checks if there is a victory in the currently placed piece against the
   * given matrix
   *
   * @param {Array} matrix A 2D array containing all the pieces in the board, 1
   *                for player 1, 0 for player 2
   * @param {Number} placedX The position in the X axis of the currently placed piece
   * @param {Number} placedY The position in the Y axis of the currently placed piece
   * @param {Number} nRows The max number of rows the given matrix can have
   * @param {Number} nColumnsThe max number of columns the given matrix can have
   * @param {Number} connectsToWin The number of connects needed to win
   *
   * @returns {Boolean | Array} false if no connect was detected, otherwise an
   *          array with the pieces coordinates that triggered the connect
   */
  isVictory: function(matrix, placedX, placedY, nRows, nColumns, connectsToWin) {
    if (nRows == undefined) nRows = this.N_ROWS;
    if (nColumns == undefined) nColumns = this.N_COLUMNS;
    if (connectsToWin == undefined) connectsToWin = this.N_CONNECTS_TO_WIN;

    var i, j, x, y, maxX, maxY, steps, victoryInfo, count = 0, winPlaces = [];
    var directions = [
      { x: 0, y: 1  }, // Vertical
      { x: 1, y: 0  }, // Horizontal
      { x: 1, y: 1  }, // Northeast to Southwest
      { x: 1, y: -1 }  // Southeast to Northwest
    ];

    // Check all directions
    outerloop:
    for (i = 0; i < directions.length; i++, count = 0) {
      // Set up bounds to go 3 pieces forward and backward
      x     =  placedX - (3 * directions[i].x);
      y     =  placedY - (3 * directions[i].y);
      maxX  =  placedX + (3 * directions[i].x);
      maxY  =  placedY + (3 * directions[i].y);
      steps = Math.max(Math.abs(maxX - x), Math.abs(maxY - y));

      for (j = 0; j <= steps; j++, x += directions[i].x, y += directions[i].y) {
        if ( typeof matrix[x] != 'undefined' && typeof matrix[x][y] != 'undefined' &&
             matrix[x][y] == matrix[placedX][placedY] ) {
          winPlaces.push([x,y]);
          // Increase count
          if (++count >= connectsToWin) {
            break outerloop;
          }
        } else {
          // Reset count
          count = 0;
          winPlaces = [];
        }
      }
    }

    return count >= connectsToWin ? winPlaces : false;
  }
}
