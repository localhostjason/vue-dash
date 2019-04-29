import {loginByUsername, getUserInfo} from '@/api/auth/login'
import {
  getToken, setToken,
  getUserId, setUserId,
  removeToken
} from '@/utils/auth'

/***
 * token 用户登陆的token，保存在cookie 中，每次请求 都会带上token
 * user_id 用户ID，保存在cookie 中，获取 个人信息
 * ***/
const state = {
  token: getToken(),
  user_id: getUserId(),
  username: null,
  role: null,
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.role = roles
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
};

const actions = {
  // user login
  login({commit}, userInfo) {
    const username = userInfo.username.trim();
    const password = userInfo.password.trim();

    const basic_auth_token = window.btoa(`${username}:${password}`);
    commit('SET_TOKEN', basic_auth_token);

    return new Promise((resolve, reject) => {
      loginByUsername(username, password).then(response => {

        const user_index = response._items.findIndex(value => value.username = username);
        const user_info = response._items[user_index];
        setUserId(user_info.id);
        commit('SET_USER_ID', user_info.id);

        commit('SET_TOKEN', basic_auth_token);
        setToken(basic_auth_token);

        resolve()
      }).catch(error => {
        // 出错 basic auth delete token
        removeToken();
        reject('用户名或者密码不正确')
      })
    })
  },

  getUserInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getUserInfo(state.user_id).then(response => {
        if (!response) reject('error');
        if (!response.role) reject('getInfo: 权限不存在');

        commit('SET_ROLES', response.role);
        commit('SET_USERNAME', response.username);

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // todo token 验证 提交后台 标记 过期， 现 仅仅 remove token
  logout({commit, state}) {
    return new Promise(resolve => {
      removeToken();
      commit('SET_TOKEN', '');
      commit('SET_USER_ID', '');

      commit('SET_USERNAME', '');
      commit('SET_ROLES', '');

      resolve()
    })
  },

  // get user info fail then logout
  fedLogOut({commit}) {
    removeToken();
    commit('SET_TOKEN', '');
    commit('SET_USER_ID', '');

    commit('SET_USERNAME', '');
    commit('SET_ROLES', '');
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
