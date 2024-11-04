import { liba } from "../../shared/liba.js";
import { grid } from "./grid.component.js";

export function GameMode() {
  const element = liba.create("div");

const localState = {
    childrenCleanups: []
}

  GameMode.render(element, localState);

  return { element, cleanup: () => {
    localState.childrenCleanups.forEach( cc => cc())
  } };
}

GameMode.render = (element, localState) => {
  const gridComponentInstance = grid();
  localState.childrenCleanups.push( gridComponentInstance.cleanup)

  element.append(gridComponentInstance.element);
};
