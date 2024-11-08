import { googlePlayer } from "./game-participants/google.player.component.js";
import { player_2 } from "./game-participants/player-2.js";
import { player_1 } from "./game-participants/player-1.js";
import { liba } from "../../shared/liba.js";
import { getPositions, subscribe,} from "../../state/data.js";
import { EVENTS } from "../../state/EVENTS.js";

export function cell(x, y) {
  const element = liba.create("td", ["style__grid"]);

  const unsubscribe = subscribe((event) => {
    if (
      event.type === EVENTS.GOOGLE_JUMPED ||
      event.type === EVENTS.PLAYER_MOVED
    ) {
      if(
        (event.payload.newPosition.x === x && event.payload.newPosition.y === y) || 
        (event.payload.prevPosition.x === x && event.payload.prevPosition.y === y)
      ) {
        cell.render(element, x, y);
      }
    }
  });

  cell.render(element, x, y);

  return {
    element,
    cleanup: () => {
      unsubscribe();
    },
  };
}

cell.render = (element, x, y) => {
  console.log("cell load...");
  element.innerHTML = "";
  const playerGoogle = googlePlayer();
  const positions = getPositions();
  const player1 = player_1();
  const player2 = player_2();

  if (x === positions.google.x && y === positions.google.y) {
    element.append(playerGoogle);
  }
  if (x === positions.player1.x && y === positions.player1.y) {
    element.append(player1);
  }
  if (x === positions.player2.x && y === positions.player2.y) {
    element.append(player2);
  }
};
