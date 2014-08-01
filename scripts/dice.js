$(document).ready(function() {
  var controller = new DiceController;
  controller.bindListeners();
});

function Die() {this.value = 0;}

Die.prototype = {
  roll: function() {
    this.value = Math.floor((Math.random()*6)+1);
  }
}

function DiceController(view) {
  this.dice = [new Die];
  this.view = new DiceView;
}

DiceController.prototype = {
  bindListeners: function() {
    $('[data-component="add"]').on('click', this.addDie.bind(this));
    $('[data-component="roll"]').on('click', this.rollDice.bind(this));
  },
  addDie: function() {
    this.dice.push(new Die);
    this.view.addDie();
  },
  rollDice: function() {
    for (var i = 0; i < this.dice.length; i++) {
      this.dice[i].roll();
    }
    this.view.updateDice(this.dice);
  }
}

function DiceView() {}

DiceView.prototype = {
  addDie: function() {
    $('[data-component="dice"]').append('<div data-component="die" class="die">0</div>');
  },
  updateDice: function(dice) {
    for (var i = 0; i < $('[data-component="die"]').length; i++) {
      $('[data-component="die"]')[i].innerHTML = dice[i].value
    }
  }
}