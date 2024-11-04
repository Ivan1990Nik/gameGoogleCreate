
  import { liba } from "../shared/liba.js";
import { startGame } from "../state/data.js";

export function SettingsMode() {
  console.log("setting load...")
  
  const element = liba.create("div", ["style__component--setting"]);

  SettingsMode.render(element);

  return { element, cleanup: () => {} };
}

SettingsMode.render = (element) => {
  console.log("setting load")
  const gridSizeLabel = liba.create("label");
  gridSizeLabel.append("Выберите размер сетки:");
  gridSizeLabel.setAttribute("for", "gridSizeSelect"); 

  const gridSizeSelectElement = liba.create("select", ["style__select"]);
  gridSizeSelectElement.setAttribute("id", "gridSizeSelect"); 
  
  const gridSizeOptionElement = liba.create("option");
  gridSizeOptionElement.value = "4";
  gridSizeOptionElement.append("4x4");

  const gridSizeOption1Element = liba.create("option");
  gridSizeOption1Element.value = "6";
  gridSizeOption1Element.append("6x6");

  const gridSizeOption2Element = liba.create("option");
  gridSizeOption2Element.value = "10";
  gridSizeOption2Element.append("10x10");

  gridSizeSelectElement.append(gridSizeOptionElement, gridSizeOption1Element, gridSizeOption2Element);


  const pointsWinLabel = liba.create("label");
  pointsWinLabel.append("Выберите очки для победы:");
  pointsWinLabel.setAttribute("for", "pointsWinSelect"); 

  const pointsWinSelectElement = liba.create("select", ["style__select"]);
  pointsWinSelectElement.setAttribute("id", "pointsWinSelect");

  const pointsWinOptionElement = liba.create("option");
  pointsWinOptionElement.value = "1";
  pointsWinOptionElement.append("10");

  const pointsWinOption1Element = liba.create("option");
  pointsWinOption1Element.value = "2";
  pointsWinOption1Element.append("20");

  const pointsWinOption2Element = liba.create("option");
  pointsWinOption2Element.value = "3";
  pointsWinOption2Element.append("30");

  pointsWinSelectElement.append(pointsWinOptionElement, pointsWinOption1Element, pointsWinOption2Element);

  const pointsloseLabel = liba.create("label");
  pointsloseLabel.append("Выберите очки для победы google:");
  pointsloseLabel.setAttribute("for", "pointsWinSelect"); 

  const pointsloseSelectElement = liba.create("select", ["style__select"]);
  pointsloseSelectElement.setAttribute("id", "pointsWinSelect");

  const pointsloseOptionElement = liba.create("option");
  pointsloseOptionElement.value = "1";
  pointsloseOptionElement.append("20");

  const pointsloseOption1Element = liba.create("option");
  pointsloseOption1Element.value = "2";
  pointsloseOption1Element.append("30");

  const pointsloseOption2Element = liba.create("option");
  pointsloseOption2Element.value = "3";
  pointsloseOption2Element.append("40");

  pointsloseSelectElement.append(pointsloseOptionElement, pointsloseOption1Element, pointsloseOption2Element);


  element.append(gridSizeLabel, gridSizeSelectElement, pointsWinLabel, pointsWinSelectElement, pointsloseLabel, pointsloseSelectElement);

  const startButtonElement = liba.create("button", ["style__button-selector"]);
  startButtonElement.append("START 🚀");

  startButtonElement.addEventListener("click", () => {
    const selectedGridSize = gridSizeSelectElement.value;
    const selectedPointsWin = pointsWinSelectElement.value;
    const selectedPointsLose = pointsloseSelectElement.value;
    startGame(selectedGridSize, selectedPointsWin, selectedPointsLose);
  });

  element.append(startButtonElement);
}