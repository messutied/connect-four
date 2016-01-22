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

  // Public methods

  this.initialize = function() {
    dummyPiece = document.createElement('div');
    dummyPiece.className = 'piece turn_piece';
    $board = $('.board');

    for (var i=0; i<GameLogic.N_COLUMNS; i++) {
      matrix.push([]);
    }

    setupEvents();
  }

  // private methods

  var setupEvents = function() {
    $('.board_column').click(onBoardClick);

    $('.board_column').mouseover(function(evt) {
      $('.turn_piece').css({left: $(this).index()*BOARD_PIECE_SIZE});
    });
  }

  // Handles placing pieces into the board (DOM)
  // and stores them into a 2D array (matrix)
  var onBoardClick = function(evt) {
    if (gameTerminated) return false;
    var placedX = $(this).index();
    if (matrix[placedX].length >= GameLogic.N_ROWS) return false;

    var placedY = matrix[placedX].length;
    var placedYInversed = GameLogic.N_ROWS-placedY-1; // to place in the DOM

    // animate and place turn piece into the board
    $('.turn_piece').removeClass('turn_piece')
      .addClass('piece_animate_intro_'+placedYInversed)
      .addClass('piece_'+placedX+'-'+placedY)
      .css({
        left: placedX*BOARD_PIECE_SIZE,
        top: placedYInversed*BOARD_PIECE_SIZE
      });

    matrix[placedX].push(turn);

    if (!checkWinner(placedX, placedY)) {
      turn = turn ? 0 : 1;
      $(dummyPiece).clone().prependTo($board)
        .css({left: placedX*BOARD_PIECE_SIZE})
        .addClass('player'+turn);
    }
  }

  // Checks is somebody won, by cheking in all the possible directions of a
  // possible connect, if there is a connect highlights the pieces
  var checkWinner = function(placedX, placedY) {
    var resp = GameLogic.isVictory(matrix, placedX, placedY);
    if (resp) {
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
