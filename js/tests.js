function assertMultiplePositions(assert, cols, rows, matrix, responseExpected) {
  for (var i = 0; i < cols.length; i++) {
    for (var j = 0; j < rows.length; j++) {
      assertVictory(assert, cols[i], rows[j], matrix, responseExpected);
    }
  }
}

function assertVictory(assert, placeX, placeY, matrix, responseExpected) {
  assert.ok( !!GameLogic.isVictory(matrix, placeX, placeY) == responseExpected,
            'victory is'+(!responseExpected ? ' not ' : '')+
            ' detected at x: '+placeX+' - y: '+placeY );
}

QUnit.test('Game.onVictory should detect horizontal connects', function(assert) {
  var matrix = [
    [1],
    [1],
    [1],
    [1],
    [0],
    [0],
    [0]
  ];
  assertMultiplePositions(assert, [0,1,2,3], [0], matrix, true);
  assertMultiplePositions(assert, [4, 5, 6], [0], matrix, false);
});

QUnit.test('Game.onVictory should detect horizontal connects on higher levels', function(assert) {
  var matrix = [
    [1, 0, 0, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
    [0, 1, 0],
    [1, 0, 1],
    [0, 1],
    [1, 0, 0]
  ];
  assertMultiplePositions(assert, [0,1,2,3], [2], matrix, true);
  assertMultiplePositions(assert, [4], [2], matrix, false);
  assertMultiplePositions(assert, [0, 2, 4, 6], [0, 1], matrix, false);
});

QUnit.test('Game.onVictory should detect vertical connects', function(assert) {
  var matrix = [
    [1, 1, 1, 1],
    [0],
    [1],
    [1],
    [0],
    [0],
    [0]
  ];
  assertMultiplePositions(assert, [0], [0, 1, 2, 3], matrix, true);
  assertMultiplePositions(assert, [1, 3, 5], [0], matrix, false);
});

QUnit.test('Game.onVictory should detect Northeast to Southwest connects', function(assert) {
  var matrix = [
    [1],
    [0, 1],
    [1, 1, 1],
    [1, 0, 0, 1],
    [0, 1, 1],
    [0, 0],
    [0, 0, 1]
  ];
  assertVictory(assert, 0, 0, matrix, true);
  assertVictory(assert, 1, 1, matrix, true);
  assertVictory(assert, 2, 2, matrix, true);
  assertVictory(assert, 3, 3, matrix, true);
  assertVictory(assert, 4, 4, matrix, false);

  var matrix = [
    [1],
    [0, 1],
    [1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 1, 0, 1],
    [0, 0, 1, 0, 1, 0]
  ];
  assertVictory(assert, 6, 5, matrix, true);
  assertVictory(assert, 5, 4, matrix, true);
  assertVictory(assert, 4, 3, matrix, true);
  assertVictory(assert, 3, 2, matrix, true);
});

QUnit.test('Game.onVictory should detect Southeast to Northwest connects', function(assert) {
  var matrix = [
    [1],
    [0, 0],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0],
    [0, 1, 0],
    [0, 0],
    [0, 0, 1]
  ];
  assertVictory(assert, 6, 0, matrix, true);
  assertVictory(assert, 5, 1, matrix, true);
  assertVictory(assert, 4, 2, matrix, true);
  assertVictory(assert, 3, 3, matrix, true);
  assertVictory(assert, 2, 4, matrix, false);

  var matrix = [
    [1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 0, 0, 0],
    [0, 1, 0],
    [0, 0],
    [0, 0, 1]
  ];
  assertVictory(assert, 0, 5, matrix, true);
  assertVictory(assert, 1, 4, matrix, true);
  assertVictory(assert, 2, 3, matrix, true);
  assertVictory(assert, 3, 2, matrix, true);
  assertVictory(assert, 4, 1, matrix, false);
  assertVictory(assert, 5, 0, matrix, false);
});
