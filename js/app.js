var TILE_WIDTH = 101,
    TILE_HEIGHT = 83,
    ENEMY_SPEED = 2,
    ENEMY_X_START = -50,
    START_X_PLAYER = TILE_WIDTH * 2,
    START_Y_PLAYER = TILE_HEIGHT * 5 - 10;


ep = document.getElementById('enemySpeed');
ep.addEventListener('change', function(e){
  
  selectedEnemySpeed = ep.options[ep.selectedIndex].value;
  allEnemies = [];
  ENEMY_SPEED = selectedEnemySpeed - 0;
  interval_time = auto_calc_time_push(ENEMY_SPEED);
  pushNewEnemy(interval_time);

});

var auto_calc_time_push = function(enemy_speed){
  switch (enemy_speed){
    case 1:      
      return 1100;
    case 2:
      return 700;
    case 3:
      return 500;
    case 4:
      return 500;
    default:
      return 1000;
  }
};

var generate_random1_3 = function(){
  return Math.floor(Math.random() * (4 - 1 + 1))+1;
};

var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.x = ENEMY_X_START;
  this.y = 83 * generate_random1_3() - 20;
};

Enemy.prototype = {
  update: function(dt) {
    this.x += (dt * 100 * (ENEMY_SPEED+1));

    if((player.x == this.x)){
      player.x = START_X_PLAYER;
      player.y = START_Y_PLAYER;
    }

    if(this.x > TILE_WIDTH * 5){
      var index = allEnemies.indexOf(this);
      allEnemies.splice(index, 1);
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
var interval_time;

allEnemies.push(new Enemy());
var pushNewEnemy = function(interval_time){
  setInterval(function(){
    allEnemies.push(new Enemy());
  }, interval_time);
};
pushNewEnemy(auto_calc_time_push(ENEMY_SPEED));



document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});




