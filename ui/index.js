import { liba } from "../shared/liba.js";
import { movePlayer } from "../state/data.js";
import { MOVE_DIRECTIONS } from "../state/MOVE_DIRECTIONS.js";
import { Game } from "./game.component.js";

const rootElement = document.getElementById("root");
const item = liba.create("div", ["s"])
  item.append("!")
  rootElement.append(item);
function render() {
  
  const gameInstance = Game();
  /* rootElement.append(item); */


  rootElement.append(gameInstance.element);
}





window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "ArrowUp":
      movePlayer(2, MOVE_DIRECTIONS.UP);
      break;
    case "ArrowDown":
      movePlayer(2, MOVE_DIRECTIONS.DOWN);
      break;
    case "ArrowLeft":
      movePlayer(2, MOVE_DIRECTIONS.LEFT);
      break;
    case "ArrowRight":
      movePlayer(2, MOVE_DIRECTIONS.RIGHT);
      break;
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.code) {
    case "KeyW":
      movePlayer(1, MOVE_DIRECTIONS.UP);
      break;
    case "KeyS":
      movePlayer(1, MOVE_DIRECTIONS.DOWN);
      break;
    case "KeyA":
      movePlayer(1, MOVE_DIRECTIONS.LEFT);
      break;
    case "KeyD":
      movePlayer(1, MOVE_DIRECTIONS.RIGHT);
      break;
  }
});
render();




