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
