export const liba = {
   create(tagName, classes = []) {
  const element = document.createElement(tagName);
  classes.forEach((c) => element.classList.add(c));
  return element;
}
}
