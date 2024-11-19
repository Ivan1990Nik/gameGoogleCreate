import { liba } from "../../shared/liba.js";
import { getGridSize } from "../../state/data.js";
import { cell } from "./cell.component.js";

export const grid = () => {
  console.log("grid load");
  const element = liba.create("table", ["style__grid--table"]);

  const localState = {
    childrenCleanups: [],
  };

  grid.render(element, localState);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
};

grid.render = (element, localState) => {
  console.log("grid load.....");
  element.innerHTML = "";
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];

  const gridSize = getGridSize();


  for (let y = 0; y < gridSize.rowsCount; y++) {
    const row = liba.create("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const cellInstans = cell(x, y);
      localState.childrenCleanups.push(cellInstans.cleanup);
      row.append(cellInstans.element);
    }
    element.append(row );
  }
};
