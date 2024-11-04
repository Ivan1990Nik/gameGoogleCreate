import { liba } from "../../../shared/liba.js";

export function player_1() {
  const element = liba.create("div");
  const googleImageElement = liba.create("img", ["img__style2"]);
  googleImageElement.src = "icon/player1.png";
  googleImageElement.alt = "google icon";

  element.append(googleImageElement);
  return element
}
