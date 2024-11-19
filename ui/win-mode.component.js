import { liba } from "../shared/liba.js";
import { getWinMessage, playAgain, subscribe} from "../state/data.js";


export function WinMode() {
  const element = liba.create("div", ["win-wraper"]);

  const unsubscribe = subscribe((event) => {
      WinMode.render(element);
    }
  );

  WinMode.render(element);

  return { element, cleanup: () => {
    unsubscribe()
  } };
}

WinMode.render = (element) => {

  element.innerHTML = ""; 

const winMessage = getWinMessage();
const messageElement = liba.create("div", ["win-message"]);
messageElement.textContent = winMessage;
element.append(messageElement)

  const playAgainButtonElement = liba.create("button", ["style__button-selector"]);
  playAgainButtonElement.append("PLAY AGAIN 🚀");
  playAgainButtonElement.addEventListener("click", () => {
    playAgain();
  });

  element.append(playAgainButtonElement);
};
