var boardDimensions = [3, 3];
var boardSize = (boardDimensions[0] * boardDimensions[1]);

$(document).ready(function() {
  var controller = new TicTacToeController;
  controller.initialize();
});

function Player(piece) {
  this.piece = piece;
}

function Game() {
    this.players = [new Player("X"), new Player("O")];
    this.currentPlayer = this.players[0];
}

Game.prototype = {
  switchPlayers: function() {
    if (this.currentPlayer == this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  }
}

function TicTacToeController() {
  this.view = new TicTacToeView;
  this.game = new Game;
}

TicTacToeController.prototype = {
  initialize: function() {
    this.view.setBoard();
    this.bindListeners();
  },
  bindListeners: function() {
    $('[data-component="cell"').click(function(event) {
      if (event.target.innerHTML == "" ) {
        this.view.updateCell(event.target, this.game.currentPlayer.piece);
      }
      this.game.switchPlayers();
    }.bind(this));
  },
}

function TicTacToeView() {}

TicTacToeView.prototype = {
  setBoard: function() {
    for (var i = 0; i < boardDimensions[0]; i++) {
      for (var j = 0; j < boardDimensions[1]; j++) {
        $('[data-component="board"]').append('<div data-component="cell" class="cell"></div>');
      }
      $('[data-component="board"]').append('<br>');
    }
  },
  updateCell: function(cell, piece) {
    cell.innerHTML = piece;
  }
}