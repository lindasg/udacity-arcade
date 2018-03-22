// Variables to be used in the game
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var ENEMY_SPEED = 2;
var ENEMY_X_START = -50;
var START_X_PLAYER = TILE_WIDTH * 2;
var START_Y_PLAYER = TILE_HEIGHT * 5 - 10;
var TIME_INTERVAL = 500;
var POINT = 3;

// Generate Random Y Axis (between 1st stone tile to 4th grass tile from top)
function randomYPosition() {
  return Math.floor(Math.random() * 4)+1;
}

// Generate Random X Axis (between 1st stone tile to 5th from left)
function randomXPosition() {
  return Math.floor(Math.random() * 5);
}

// Overwrite inner HTML text of target id element
function insertTextOfElement(idName, insertText) {
  return document.getElementById(idName).innerHTML = insertText;
}

// Set player's position to starting point
function setPlayerStartPosition(player) {
  player.x = START_X_PLAYER;
  player.y = START_Y_PLAYER;
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
    if(this.x > TILE_WIDTH * 5) {
      var index = allEnemies.indexOf(this);
      allEnemies.splice(index, 1);
    }

    // When enemy hits player (note: consider the size of graphics)
    if(player) {
      if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
        setPlayerStartPosition(player);
        if(POINT >= 1) {
          POINT--;
        }
        insertTextOfElement('points', POINT);

        if(POINT === 0) {
          popUpMessage();
        }
      }
    }

  },
  // Place enemy on canvas
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};

// Generate player on starting position
var Player = function() {
  this.sprite = 'images/char-princess-girl.png';
  setPlayerStartPosition(this);
};

// Define Player object
Player.prototype = {
  // Set player position
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  // Handle player key moves
  handleInput: function(key) {
    switch (key) {
      case 'up':
        if(this.y > -10) {
          this.y -= TILE_HEIGHT;
        }
        break;
      case 'down':
        if(this.y < START_Y_PLAYER) {
          this.y += TILE_HEIGHT;
        }
        break;
      case 'right':
        if(this.x < 101*4) {
          this.x += TILE_WIDTH;
        }
        break;
      case 'left':
        if(this.x > 0) {
          this.x -= TILE_WIDTH;
        }
        break;
    }
  }
};

// Star item
var Star = function() {
  this.sprite = 'images/Star.png';
  this.x = TILE_WIDTH * randomXPosition();
  this.y = TILE_HEIGHT * randomYPosition() -20;
};

Star.prototype = {
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  },

  // Randomly place a new star after user collects once
  // also update points
  update: function() {
    if((player.x - this.x < 30) && (this.x - player.x < 30) && (this.y - player.y < 30) && (player.y - this.y < 30)) {
      POINT++;
      insertTextOfElement('points', POINT);
      this.x = TILE_WIDTH * randomXPosition();
      this.y = TILE_HEIGHT * randomYPosition() -20;

      // Pop up message on reaching 10 points
      if(POINT >= 10) {
        popUpMessage();
        setPlayerStartPosition(player);
      }
    }
  }
};

// Create a player and enemies to start a new game
var player, allEnemies, enemyCreation, star;

// Generate a new enemy and push it to the enemy array
function enemyGenerationCycle() {
  enemyCreation = setInterval(function() {
    allEnemies.push(new Enemy());
  }, TIME_INTERVAL);
}

// Initialize a new game
function startGame() {
  clearInterval(enemyCreation);
  player = new Player();
  star = new Star();
  allEnemies = [];
  enemyGenerationCycle();
  insertTextOfElement('points', POINT);
}

// Pop up message on reaching 10 points or losing the game
// and reset the points to 3
function popUpMessage() {
  if(POINT === 0) {
    window.location.href = window.location.pathname + '#gameover';
    POINT = 3;
    insertTextOfElement('points', POINT);
  } else if(POINT >= 10) {
    window.location.href = window.location.pathname + '#accomplished';
    POINT = 3;
    insertTextOfElement('points', POINT);
  }
}

// Eventlistener setup for keyboard
var keyBindings = function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keydown', keyBindings);

// GAME TIME!!!
startGame();
