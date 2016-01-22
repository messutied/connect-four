function Game() {
  // constants
  var BOARD_PIECE_SIZE = 70;
  var PLAYERS = ['Yellow', 'Red'];

  // instance private variables
  var matrix = [];
  var dummyPiecem, board;
  var turn = 1;
  var gameTerminated = false;
  var movesCountQueue = {}

  this.initialize = function() {
    dummyPiece = document.createElement('div');
    dummyPiece.className = 'piece';
    $board = $('.board');

    for (var i=0; i<GameLogic.N_COLUMNS; i++) {
      matrix.push([]);
    }

    setupEvents();
  }

  // Events

  var setupEvents = function() {
    $board.click(onBoardClick);
  }

  var onBoardClick = function(evt) {
    if (gameTerminated) return false;
    var placedX = Math.ceil(evt.offsetX / BOARD_PIECE_SIZE)-1;
    if (matrix[placedX].length >= GameLogic.N_ROWS) return false;

    var placedY = matrix[placedX].length;
    var placedYInversed = GameLogic.N_ROWS-placedY-1; // to place in the DOM

    var piece = $(dummyPiece).clone();
    piece.addClass(turn ? 'player1' : 'player2')
         .addClass('piece_animate_intro_'+placedYInversed)
         .addClass('piece_'+placedX+'-'+placedY);

    piece.appendTo($board).css({
      left: placedX*BOARD_PIECE_SIZE,
      top: placedYInversed*BOARD_PIECE_SIZE
    });

    matrix[placedX].push(turn);

    if (!checkWinner(placedX, placedY)) {
      turn = turn ? 0 : 1;
      $('.turn_info').hide();
      $('.turn_info.player'+turn).show().addClass('turn_info_changed');
    }
  }

  var checkWinner = function(placedX, placedY) {
    var resp = GameLogic.isVictory(matrix, placedX, placedY);
    if (resp) {
      console.log(resp);
      for (var i = 0; i < resp.length; i++) {
        var place = resp[i];
        $('.piece_'+place[0]+'-'+place[1]).addClass('connected');
      }
      $('.player_name').text(PLAYERS[turn]);
      $('.game_over_info').show();
      $('.turn_info, .game_explanation').hide();
      $('body').addClass('player_'+turn+'_won');
      gameTerminated = true;
      return true;
    }
    return false;
  }
}
