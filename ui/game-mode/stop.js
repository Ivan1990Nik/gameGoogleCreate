import { liba } from "../../shared/liba.js";
import { pauseGame } from "../../state/data.js";





export function stopgamecomponent () {
const element = liba.create("button", ["img__pause"]) 

stopgamecomponent.render(element)


return {element}
}


stopgamecomponent.render = (element) => {
  element.append("||")
  element.addEventListener("click", () => {
      pauseGame()
    });
}