import { liba } from "../shared/liba.js";
import { playAgain} from "../state/data.js";

export function WinMode() {
  const element = liba.create("div");

  WinMode.render(element);

  return { element };
}

WinMode.render = (element) => {


  const playAgainButtonElement = liba.create("button", ["style__button-selector"]);
  playAgainButtonElement.append("PLAY AGAIN 🚀");
  playAgainButtonElement.addEventListener("click", () => {
    playAgain();
  });

  element.append(playAgainButtonElement);
};
