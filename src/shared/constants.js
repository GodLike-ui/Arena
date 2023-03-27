module.exports = Object.freeze({
  PLAYER_RADIUS: 20,
  PLAYER_MAX_HP: 100,
  PLAYER_SPEED: 400,
  PLAYER_FIRE_COOLDOWN:0.25,

  BULLET_RADIUS: 13.2,
  BULLET_SPEED: 800,
  BULLET_DAMAGE: 10,

  SCORE_BULLET_HIT: 20,
  SCORE_PER_SECOND: 1,
  

  MAP_SIZE: 3000,
  MAP_BORDER: 2500,
  MSG_TYPES: {
    PLAYER_COUNT: 0,
    JOIN_GAME: 'join_game',
    GAME_UPDATE: 'update',
    INPUT: 'input',
    GAME_OVER: 'dead',
    FIRE_BULLET: 'fire_bullet',
  },
});
