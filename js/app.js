var TILE_WIDTH = 101,
    TILE_HEIGHT = 83,
    ENEMY_SPEED = 3,
    ENEMY_NUM = 3,
    ENEMY_X_START = -50,
    START_X_PLAYER = TILE_WIDTH * 2,
    START_Y_PLAYER = TILE_HEIGHT * 5 - 10;

var generate_random1_3 = function(){
  return Math.floor(Math.random() * (3 - 1 + 1))+1;
};

var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = ENEMY_X_START;
  this.y = 83 * generate_random1_3() - 20;
};

Enemy.prototype = {
  update: function(dt) {
    this.x += (dt * 100 * ENEMY_SPEED);
    if((player.x == this.x)){
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
    }

    if(this.x > TILE_WIDTH * 5){
      this.x = ENEMY_X_START;
      this.y = 83 * generate_random1_3() - 20;
    }

    if(allEnemies.length >= ENEMY_NUM){
      clearInterval(newEnemies);
    }

    if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)){
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
    }
    
  },

  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

};


var Player = function(){

  this.sprite = 'images/char-boy.png';
  this.x = START_X_PLAYER;
  this.y = START_Y_PLAYER;
};

Player.prototype = {

  update: function(){
    if(this.y <= -10){
      // Display reset option to UI
    }
  },

  render: function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  handleInput: function(key){
    switch (key){
      case 'up':
        if(this.y > -10){
          this.y -= TILE_HEIGHT;
        }
        break;
      case 'down':
        if(this.y < START_Y_PLAYER){
          this.y += TILE_HEIGHT;
        }
        break;
      case 'right':
        if(this.x < 404){
          this.x += TILE_WIDTH;
        }
        break;
      case 'left':
        if(this.x > 0){
          this.x -= TILE_WIDTH;
        }
        break;
    }
  }
};



var player = new Player();
var allEnemies = [];

var newEnemies = setInterval(function(){
  allEnemies.push(new Enemy());
}, 1200);

newEnemies;



document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});




