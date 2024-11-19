import { liba } from "../../shared/liba.js";


export function jail() {
  const element = liba.create("div", ["style__jail"]);

  jail.render(element);

  return { element, cleanup: () => {} };
}

jail.render = (element) => {


  const images = liba.create("img", ["img_style"]);
  images.src = "icon/grate.png";

  element.append(images);
};
