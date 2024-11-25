import { liba } from "../../shared/liba.js";
import { pauseGame } from "../../state/data.js";

export function stopgamecomponent () {
const element = liba.create("button", ["img__pause"]) 




element.append("pause ⏸")
element.addEventListener("click", () => {
    pauseGame()
  });

return element
}