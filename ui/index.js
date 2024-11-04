import { movePlayer } from "../state/data.js";
import { MOVE_DIRECTIONS } from "../state/MOVE_DIRECTIONS.js";
import { Game } from "./game.component.js";

const rootElement = document.getElementById("root");

function render() {



  const gameInstance = Game();

  rootElement.append(gameInstance.element);
}



window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowUp":
      movePlayer(1, MOVE_DIRECTIONS.UP);
      break;
    case "ArrowDown":
      movePlayer(1, MOVE_DIRECTIONS.DOWN);
      break;
    case "ArrowLeft":
      movePlayer(1, MOVE_DIRECTIONS.LEFT);
      break;
    case "ArrowRight":
      movePlayer(1, MOVE_DIRECTIONS.RIGHT);
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      movePlayer(2, MOVE_DIRECTIONS.UP);
      break;
    case "KeyS":
      movePlayer(2, MOVE_DIRECTIONS.DOWN);
      break;
    case "KeyA":
      movePlayer(2, MOVE_DIRECTIONS.LEFT);
      break;
    case "KeyD":
      movePlayer(2, MOVE_DIRECTIONS.RIGHT);
      break;
  }
});
render();




