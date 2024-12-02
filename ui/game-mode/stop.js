/* import { liba } from "../../shared/liba.js";
import { pauseGame } from "../../state/data.js";





export function stopgamecomponent () {
const element = liba.create("button", ["img__pause"]) 

stopgamecomponent.render(element)


return {element}
}


stopgamecomponent.render = (element) => {
  
  element.append("💥")
  element.addEventListener("click", () => {
      pauseGame()
    });
}
 */

import { liba } from "../../shared/liba.js";
import { muteMusic } from "../../state/data.js";

export function stopgamecomponent() {
  const element = liba.create("button", ["img__pause"]);

  stopgamecomponent.render(element);

  return { element };
}

stopgamecomponent.render = (element) => {
  element.append("");
  
  element.addEventListener("click", () => {
    muteMusic();
    
    // Изменяем класс элемента при срабатывании pauseGame()
    if (element.classList.contains("img__pause")) {
      element.classList.remove("img__pause");
      element.classList.add("img__play"); // Замените на нужный класс
    } else {
      element.classList.remove("img__play"); // Замените на нужный класс
      element.classList.add("img__pause");
    }
  });
}

