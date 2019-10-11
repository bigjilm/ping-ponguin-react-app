export function getFromStorage(key) {
  //error handling!!!
  return localStorage.getItem(key)
}

export function setToStorage(key, value) {
  localStorage.setItem(key, value)
}
