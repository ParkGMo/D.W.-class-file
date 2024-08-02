export function changeTitle(str) {
  const titleElement = document.getElementsByTagName("title");
  titleElement.innerHTML = str;
}
