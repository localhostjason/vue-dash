import Cookies from 'js-cookie'

const tokenKey = 'Authorization Token';

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}


export function removeToken() {
  Cookies.remove(tokenKey);
}


const tokenMenuKey = 'Menu Path';

export function getMenuToken() {
  return localStorage.getItem(tokenMenuKey)
}

export function setMenuToken(key) {
  return localStorage.setItem(tokenMenuKey, key)
}


export function removeMenuToken() {
  localStorage.removeItem(tokenMenuKey);
}
