var trackLength = 30;
var numPlayers = 3;

$(document).ready(function() {
  var controller = new RaceController;
  controller.initialize();
});

function Player(number) {
  this.number = number;
}

function RaceController() {
  this.view = new RaceView;
  this.players = [];
}

RaceController.prototype = {
  initialize: function() {
    this.bindListeners(numPlayers);
    this.generatePlayers(numPlayers);
    this.view.setTrack(trackLength, numPlayers);
  },
  bindListeners: function() {
    $(document).keyup(function(event) {
      var player_number = event.keyCode - 48;
      if (player_number >= 1 && player_number <= this.players.length) {
        this.view.updatePosition(player_number)
      }
    }.bind(this));
  },
  generatePlayers: function(numPlayers) {
    for (var i = 1; i <= numPlayers; i++) {
      this.players.push(new Player(i));
    }
  }
}

function RaceView() {}

RaceView.prototype = {
  updatePosition: function(player_number) {
    var player_strip = $('[data-component="player' + player_number + '_strip"]')[0].children;
    for (var i = 0; i < player_strip.length-2; i++) {
      if (player_strip[i].className == "active") {
        player_strip[i].className = "";
        player_strip[i + 1].className = "active";
        break;
      }
    }
  },
  setTrack: function(trackLength, numPlayers) {
    for (var i = 1; i <= numPlayers; i++) {
      $('[data-component="track"]').append('<tr data-component="player' + i + '_strip"><td class="active"></td></tr>');
      for (var j = 1; j < trackLength; j++) {
        $('[data-component="player' + i + '_strip"]').append("<td></td>");
      }
    }
  }
}
