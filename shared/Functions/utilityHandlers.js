export function checkObjEmpty(obj) {
  for (var i in obj) return false;
  return true;
}
export function setLocalStorage(obj) {
  for (var i in obj) {
    localStorage.setItem(i, obj[i]);
  }
}
