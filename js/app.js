// Variables to be used in the game
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83,
    ENEMY_SPEED = 3,
    ENEMY_X_START = -50,
    START_X_PLAYER = TILE_WIDTH * 2,
    START_Y_PLAYER = TILE_HEIGHT * 5 - 10,
    TIME_INTERVAL = 500,
    DONE = false,
    SCORE = 3;

// Generate Random Y Axis (between 1st stone tile to 4th grass tile from top)
function randomYPosition(){
  return Math.floor(Math.random() * (4 - 1 + 1))+1;
}

// Generate Random X Axis (between 1st stone tile to 10th from left)
function randomXPosition(){
  return Math.floor(Math.random() * (9 - 0 + 1));
}

// Generate an enemy on random starting position
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = ENEMY_X_START;
  this.y = TILE_HEIGHT * randomYPosition() - 20;
};

// Define Enemy object
Enemy.prototype = {
  update: function(dt) {
    this.x += (dt * 100 * (ENEMY_SPEED+1));

    // Delete enemy once it crosses the canvas
    if(this.x > TILE_WIDTH * 10){
      var index = allEnemies.indexOf(this);
      allEnemies.splice(index, 1);
    }

    // When enemy hits player (note: consider the size of graphics)
    if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)){
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
      SCORE--;
      document.getElementById('score').innerHTML = SCORE;
    }

  },
  // Place enemy on canvas
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Generate player on starting position
var Player = function(){
  this.sprite = 'images/char-boy.png';
  this.x = START_X_PLAYER;
  this.y = START_Y_PLAYER;
};

// Define Player object
Player.prototype = {
  // Reset player position
  update: function(){
    // if((this.y === -10) && (DONE === false)){
    //   DONE = true;
    //   startGame();
    // }
  },

  // Set player position
  render: function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  // Handle player key moves
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
        if(this.x < 101*9){
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

// Items
var Heart = function(){
  this.sprite = 'images/Heart.png';
  this.x = TILE_WIDTH * randomXPosition();
  this.y = TILE_HEIGHT-20;
};

Heart.prototype = {
  render: function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  update: function(){
    if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)){
      SCORE+=2;
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
      document.getElementById('score').innerHTML = SCORE;
      this.x = TILE_WIDTH * randomXPosition();
    }
  }
};

var Star = function(){
  this.sprite = 'images/Star.png';
  this.x = TILE_WIDTH * randomXPosition();
  this.y = TILE_HEIGHT * 2 -20;
};

Star.prototype = {
  render: function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  update: function(){
    if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)){
      SCORE++;
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
      document.getElementById('score').innerHTML = SCORE;
      this.x = TILE_WIDTH * randomXPosition();
    }
  }
};

// Create a player and enemies to start a new game
var player, allEnemies, enemyCreation, heart, star;

function enemyGenerationCycle(){
  enemyCreation = setInterval(function(){
    allEnemies.push(new Enemy());
  }, TIME_INTERVAL);
}

// Initialize a new game
function startGame(){
  clearInterval(enemyCreation);
  DONE = false;
  player = new Player();
  heart = new Heart();
  star = new Star();
  allEnemies = [];
  enemyGenerationCycle();
  document.getElementById('score').innerHTML = SCORE;
}

// GAME TIME!!!
startGame();

// Eventlistener setup for keyboard
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
