import { liba } from "../shared/liba.js";
import { startGame } from "../state/data.js";

export function SettingsMode() {

  const element = liba.create("div", ["style__component--setting"]);
  SettingsMode.render(element);

  return { element, cleanup: () => {} };
}

SettingsMode.render = (element) => {

  const createLabel = (text, forId) => {
    const label = liba.create("label");
    label.append(text);
    label.setAttribute("for", forId);
    return label;
  };

  const createSelect = (id, options) => {
    const selectElement = liba.create("select", ["style__select"]);
    selectElement.setAttribute("id", id);
    options.forEach(({ value, text }) => {
      const optionElement = liba.create("option");
      optionElement.value = value;
      optionElement.append(text);
      selectElement.append(optionElement);
    });
    return selectElement;
  };

  const createCheckbox = (id, labelText) => {
    const checkboxWrapper = liba.create("div", ["checkbox-wrapper"]);
    
    const checkbox = liba.create("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", id);
    
    const label = createLabel(labelText, id);
    
    checkboxWrapper.append(checkbox, label);
    return checkboxWrapper;
  };

  const gridSizeOptions = [
    { value: "4", text: "4x4" },
    { value: "6", text: "6x6" },
    { value: "10", text: "10x10" },
  ];

  const pointsWinOptions = [
    { value: "1", text: "10" },
    { value: "2", text: "20" },
    { value: "3", text: "30" },
  ];

  const pointsLoseOptions = [
    { value: "1", text: "20" },
    { value: "2", text: "30" },
    { value: "3", text: "40" },
  ];

  element.append(
    createLabel("Выберите размер сетки:", "gridSizeSelect"),
    createSelect("gridSizeSelect", gridSizeOptions),
    createLabel("Выберите очки для победы:", "pointsWinSelect"),
    createSelect("pointsWinSelect", pointsWinOptions),
    createLabel("Выберите очки для проигрыша:", "pointsLoseSelect"),
    createSelect("pointsLoseSelect", pointsLoseOptions),
    createCheckbox("isTwoPlayer", "Ирать в двоем ") // Добавляем чекбокс
  );

  const startButtonElement = liba.create("button", ["style__button-selector"]);
  startButtonElement.append("START 🚀");

  startButtonElement.addEventListener("click", () => {
    const selectedGridSize = document.getElementById("gridSizeSelect").value;
    const selectedPointsWin = document.getElementById("pointsWinSelect").value;
    const selectedPointsLose = document.getElementById("pointsLoseSelect").value;
    const isSoundEnabled = document.getElementById("isTwoPlayer").checked; // Получаем состояние чекбокса
    startGame(selectedGridSize, selectedPointsWin, selectedPointsLose, isSoundEnabled); // Передаем состояние чекбокса в startGame
  });

  element.append(startButtonElement);
};
