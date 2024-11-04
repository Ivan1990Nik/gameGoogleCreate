import { liba } from "../../../shared/liba.js";

export function googlePlayer() {
  const element = liba.create("div", )

  const googleImageElement = liba.create("img", ["img__style"]);
  googleImageElement.src = "icon/images.png"
  googleImageElement.alt = "google icon"

element.append(googleImageElement)

  return element;
}


