import { liba } from "../../shared/liba.js";
import {playNoPauseGame } from "../../state/data.js";





export function playgamecomponent () {
const element = liba.create("button", ["img__pause"]) 

playgamecomponent.render(element)


return {element}
}


playgamecomponent.render = (element) => {
  element.append("▶")
  element.addEventListener("click", () => {
    playNoPauseGame()
    });
}