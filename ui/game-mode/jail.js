import { liba } from "../../shared/liba.js";
import { getPositions, subscribe } from "../../state/data.js";
import { EVENTS } from "../../state/EVENTS.js";
import { player_1 } from "./game-participants/player-1.js";
import { player_2 } from "./game-participants/player-2.js";


export function jail() {
  const element = liba.create("div", ["style__jail"]);

  const unsubscribe = subscribe((event) => {
    if (
      event.type === EVENTS.PLAYER_PRISON 
    ) {
      const xx = event.payload.x
      jail.render(element, xx);
      
    }
  });

  jail.render(element);

  return { element, cleanup: () => {
    unsubscribe()
  } };
}

jail.render = (element, xx) => {
  console.log(xx)
  const positions = getPositions();
  const isPlayer1InJail = positions.player1.isInJail;
  const isPlayer2InJail = positions.player2.isInJail;

  element.innerHTML = "";

  const images = liba.create("img", ["img_style"]);
  images.src = "icon/grate.png";

  if (isPlayer1InJail) {
    element.append(player_1());
  }
  if (isPlayer2InJail) {
    element.append(player_2());
  }
  
  element.append(images);
};