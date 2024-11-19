import { EVENTS } from "./EVENTS.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";

const _state = {
  status: GAME_STATUSES.SETTINGS,
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
    pointsToWin: null,
    pointsToLose: null,
  },
  positions: {
    google: { x: null, y: null },
    player1: { x: 0, y: 0, isInJail: false },
    player2: { x: 1, y: 0, isInJail: false },
  },
  points: {
    google: 0,
    player1: 0,
    player2: 0,
  },
  win: "",
};


export function getWinMessage() {
  return _state.win;
}
export function setWinMessage(result) {
  _state.win = result;
}

let _observers = [];

function _notify(type, payload = {}) {
  const event = {
    type,
    payload,
  };
  _observers.forEach((o) => o(event));
}

export function subscribe(callback) {
  _observers.push(callback);
  return () => {
    unsubscribe(callback);
  };
}

export function unsubscribe(callback) {
  _observers = _observers.filter((o) => o !== callback);
}

export function getresultPoints() {
  return _state.settings;
}
export function getStatus() {
  return _state.status;
}
export function getGridSize() {
  return _state.settings.gridSize;
}
export function getPositions() {
  return _state.positions;
}
export function getPoins() {
  return _state.points;
}

let localState = { ..._state.points };

function resetPoints() {
  for (const player in localState) {
    _state.points[player] = 0; // Сбрасываем очки каждого игрока
  }
}
function removePlayer(playerKey) {
  if (_state.points[playerKey] !== undefined) {
    delete _state.points[playerKey];
  }
  _state.positions.player2 = { x: undefined, y: undefined };
  return _state;
}

export function playAgain() {
  resetPoints();
  _state.status = GAME_STATUSES.SETTINGS;
  _notify(EVENTS.STATUS_CHANGED);
}

export function startGame(
  selectedGridSize,
  selectedPointsWin,
  selectedPointsLose,
  isTwoPlayer
) {
  if (isTwoPlayer === false) {
    removePlayer("player2");
  }
  _state.status = GAME_STATUSES.IN_PROGRESS;

  selectingNumberOfGrids(selectedGridSize);
  selectingNumberWin(selectedPointsWin);
  selectingNumberLose(selectedPointsLose);

  _notify(EVENTS.STATUS_CHANGED);
  _teleportGoogle();

  jumpIntervalId = setInterval(_escapeGoogle, 1000);
}

let jumpIntervalId;

function selectingNumberOfGrids(selectedGridSize) {
  switch (selectedGridSize) {
    case "4":
      _state.settings.gridSize.columnsCount = 4;
      _state.settings.gridSize.rowsCount = 4;
      break;
    case "6":
      _state.settings.gridSize.columnsCount = 6;
      _state.settings.gridSize.rowsCount = 6;
      break;
    case "10":
      _state.settings.gridSize.columnsCount = 10;
      _state.settings.gridSize.rowsCount = 10;
      break;
  }
}
function selectingNumberWin(selectedPointsWin) {
  switch (selectedPointsWin) {
    case "1":
      _state.settings.pointsToWin = 5;
      break;
    case "2":
      _state.settings.pointsToWin = 20;
      break;
    case "3":
      _state.settings.pointsToWin = 30;
      break;
  }
}
function selectingNumberLose(selectedPointsLose) {
  switch (selectedPointsLose) {
    case "1":
      _state.settings.pointsToLose = 10;
      break;
    case "2":
      _state.settings.pointsToLose = 30;
      break;
    case "3":
      _state.settings.pointsToLose = 40;
      break;
  }
}

/**
 *  player movement function
 */

export function movePlayer(playerNumber, direction) {
  const positionReducers = {
    UP: (coords) => {
      return {
        x: coords.x,
        y: coords.y - 1,
      };
    },
    DOWN: (coords) => {
      return {
        x: coords.x,
        y: coords.y + 1,
      };
    },
    LEFT: (coords) => {
      return {
        x: coords.x - 1,
        y: coords.y,
      };
    },
    RIGHT: (coords) => {
      return {
        x: coords.x + 1,
        y: coords.y,
      };
    },
  };

  const reducer = positionReducers[direction];
  const newCoords = reducer(_state.positions["player" + playerNumber]);

  if (!_isInsideGrid(newCoords)) {
    return;
  }
  let prevPosition = { ..._state.positions["player" + playerNumber] };
  _state.positions["player" + playerNumber] = newCoords;

  if (_isPlayerInOnePositionWithGoogle(playerNumber)) {
    _catchGoogle(playerNumber);
  }
  if (_playersMeeting(playerNumber)) {
    moveToJail(playerNumber)
  }
  _notify(EVENTS.PLAYER_MOVED, {
    newPosition: { ...newCoords },
    prevPosition: prevPosition,
    playerNumber: playerNumber,
  });
}

function moveToJail(playerNumber) {
  if (playerNumber === 1) {
    _state.positions.player1.isInJail = true;
  } else if (playerNumber === 2) {
    _state.positions.player2.isInJail = true;
  }
  
  
  console.log(`Игрок ${playerNumber} попал в тюрьму!`);
}



function _isPlayerInOnePositionWithGoogle(playerNumber) {
  const playerPosition = _state.positions["player" + playerNumber];
  const googlePosition = getPositions().google;

  return (
    playerPosition.x === googlePosition.x &&
    playerPosition.y === googlePosition.y
  );
}

function _catchGoogle(playerNumber) {
  _state.points["player" + playerNumber]++;
  clearInterval(jumpIntervalId);
  jumpIntervalId = setInterval(_escapeGoogle, 1000);
  _state.points.google--;

  if (_state.points["player" + playerNumber] === _state.settings.pointsToWin) {
    const result = playerNumber === 1 ? "Player 1 Wins!" : "Player 2 Wins!";
    setWinMessage(result);
    resetPositionPlayers();
    clearInterval(jumpIntervalId);
    _state.status = GAME_STATUSES.WIN;
    _notify(EVENTS.STATUS_CHANGED, {});
  }
  _teleportGoogle();
}

function _teleportGoogle() {
  const newX = _getRandomInt(getGridSize().columnsCount);
  const newY = _getRandomInt(getGridSize().rowsCount);

  if (
    (newX === getPositions().google.x && newY === getPositions().google.y) ||
    (newX === getPositions().player1.x && newY === getPositions().player1.y) ||
    (newX === getPositions().player2.x && newY === getPositions().player2.y)
  ) {
    _teleportGoogle();
    return;
  }

  const prevPosition = { ..._state.positions.google };
  _state.positions.google.x = newX;
  _state.positions.google.y = newY;
  _state.points.google++;

  if (_state.points.google === _state.settings.pointsToLose) {
    resetPositionPlayers();
    _state.status = GAME_STATUSES.LOSE;
    clearInterval(jumpIntervalId);
    _notify(EVENTS.STATUS_CHANGED);
  }
  _notify(EVENTS.GOOGLE_JUMPED, {
    newPosition: { ..._state.positions.google },
    prevPosition: prevPosition,
  });
}

function resetPositionPlayers() {
  _state.positions.player1 = { x: 0, y: 0 };
  _state.positions.player2 = { x: 1, y: 0 };
}

function _playersMeeting() {
  return (
    _state.positions.player2.x === _state.positions.player1.x &&
    _state.positions.player2.y === _state.positions.player1.y
  );
}

function _isInsideGrid(coords) {
  const isInsideGrid =
    coords.x >= 0 &&
    coords.x < _state.settings.gridSize.columnsCount &&
    coords.y >= 0 &&
    coords.y < _state.settings.gridSize.rowsCount;

  return isInsideGrid;
}

function _escapeGoogle() {
  _notify(EVENTS.GOOGLE_ESCAPED);
  _teleportGoogle();
}

function _getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
