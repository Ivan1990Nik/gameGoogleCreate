import { googlePlayer } from "./game-participants/google.player.component.js";
import { player_2 } from "./game-participants/player-2.js";
import { player_1 } from "./game-participants/player-1.js";
import { liba } from "../../shared/liba.js";
import { getJail, getPositions, subscribe } from "../../state/data.js";
import { EVENTS } from "../../state/EVENTS.js";

export function cell(x, y) {
  const element = liba.create("td", ["style__grid"]);

  const unsubscribe = subscribe((event) => {
    if (
      event.type === EVENTS.GOOGLE_JUMPED ||
      event.type === EVENTS.PLAYER_MOVED
    ) {
      if (
        (event.payload.newPosition.x === x &&
          event.payload.newPosition.y === y) ||
        (event.payload.prevPosition.x === x &&
          event.payload.prevPosition.y === y)
      ) {
        cell.render(element, x, y);
      }
    } else if (event.type === EVENTS.PLAYER_PRISON){
      cell.render(element, x, y);
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

  element.innerHTML = "";
  const playerJail = getJail();
  const positions = getPositions();
  const playerGoogle = googlePlayer();
  const player1 = player_1();
  const player2 = player_2();
  const jail = playerJail.playerisInJail1;
  const jail1 = playerJail.playerisInJail2;

  if (x === positions.google.x && y === positions.google.y) {
    element.append(playerGoogle);
  }

  if (x === positions.player1.x && y === positions.player1.y && !jail1) {
    element.append(player1);
  }

  if (x === positions.player2.x && y === positions.player2.y && !jail) {
    element.append(player2);
  }
  
};
