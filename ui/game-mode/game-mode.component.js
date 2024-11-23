import { liba } from "../../shared/liba.js";
import { grid } from "./grid.component.js";
import { jail } from "./jail.js";

import { resultPanel } from "./resultPanel.component.js";


export function GameMode() {
  const element = liba.create("div", ["game__mode-wraper"]);

const localState = {
    childrenCleanups: []
}

  GameMode.render(element, localState);

  return { element, cleanup: () => {
    localState.childrenCleanups.forEach( cc => cc())
  } };
}

GameMode.render = (element, localState) => {

  const jailInsatance = jail()
  const resultPanelInsatance = resultPanel();
  const gridComponentInstance = grid();

  localState.childrenCleanups.push( gridComponentInstance.cleanup)
  localState.childrenCleanups.push( resultPanelInsatance.cleanup)
  element.append(jailInsatance.element)
  element.append(resultPanelInsatance.element);
  element.append(gridComponentInstance.element);
};

