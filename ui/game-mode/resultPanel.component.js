import { liba } from "../../shared/liba.js";
import { getPoins, subscribe } from "../../state/data.js";


export function resultPanel() {
  const element = liba.create("div", ["style__result"]);

  const unsubscribe = subscribe(() => {
    resultPanel.render(element);
  });

  resultPanel.render(element);

  return {
    element,
    cleanup: () => {
      unsubscribe();
    },
  };
}

resultPanel.render = (element) => {
  element.innerHTML = ""; 
  const points = getPoins();
Object.keys(points).forEach((playerKey) => {
  const score = points[playerKey];
  const resultPointElement = liba.create("div", ["style__ponelResult"]);
  resultPointElement.append(`${playerKey}: ${score}`); 
  element.append(resultPointElement);
});
};

