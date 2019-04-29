import Cookies from 'js-cookie'

const tokenKey = 'Authorization Token';

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}


/**
 * user id 存储用户ID
 * */
const userId = 'User ID';

export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(user_id) {
  return Cookies.set(userId, user_id)
}


/***
 * as User 切换用户身份
 */

const AsUserKey = 'iguard as user';

export function getAsUser() {
  return Cookies.get(AsUserKey)
}

export function setAsUser(username) {
  return Cookies.set(AsUserKey, username)
}

/**
 * get as user id 存储用户ID
 * */


export function removeAsUser() {
  Cookies.remove(AsUserKey)
}

export function removeToken() {
  Cookies.remove(tokenKey);
  Cookies.remove(userId);
  Cookies.remove(AsUserKey);
}
