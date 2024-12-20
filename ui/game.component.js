import { liba } from "../shared/liba.js";
import { getStatus, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENTS.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { GameMode } from "./game-mode/game-mode.component.js";
import { LoseMode } from "./lose-mode.component.js";
import { SettingsMode } from "./settings-mode.component.js";
import { WinMode } from "./win-mode.component.js";

export const Game = () => {
  const element = liba.create("div");
  const localState = { childrenCleanups: [] };

  const unsubscribe = subscribe((event) => {
    if (event.type === EVENTS.STATUS_CHANGED) {
      Game.render(element, localState);
    }
  });

  Game.render(element, localState);

  return {
    element,
    cleanup: () => {
      unsubscribe();
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
};

Game.render = (element, localState) => {
  const status = getStatus();
  localState.status = status;
  element.innerHTML = "";
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];
  switch (status) {
    case GAME_STATUSES.SETTINGS:
      const settingsModeInstance = SettingsMode();
      localState.childrenCleanups.push(settingsModeInstance.cleanup);
      element.append(settingsModeInstance.element);
      break;
    case GAME_STATUSES.IN_PROGRESS:
      const gameModeInstance = GameMode();
      localState.childrenCleanups.push(gameModeInstance.cleanup);
      element.append(gameModeInstance.element);
      break;
    case GAME_STATUSES.LOSE:
      const loseModeInstance = LoseMode();
      localState.childrenCleanups.push(loseModeInstance.cleanup);
      element.append(loseModeInstance.element);
      break;
    case GAME_STATUSES.WIN:
      const winModeInstance = WinMode();
      localState.childrenCleanups.push(winModeInstance.cleanup);
      element.append(winModeInstance.element);
      break;
    default:
      element.append("STATE IS INVALID");
  }
};
