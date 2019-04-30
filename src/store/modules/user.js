import {login, getUserInfo, logout} from '@/api/auth/login'
import {getToken, removeToken, setToken} from '@/utils/auth'


/***
 * token 用户登陆的token，保存在cookie 中，每次请求 都会带上token
 * ***/
const state = {
  token: getToken(),
  username: null,
  user_id: null,
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

    return new Promise((resolve, reject) => {
      login(username, password).then(response => {
        if (!response.success) {
          Message.error(response.errmsg);
          reject('error')
        }

        setToken(response.token);
        commit('SET_TOKEN', response.token);

        resolve()
      }).catch(error => {
        console.log(error);
        removeToken();
        reject('用户名或者密码不正确')
      })
    })
  },

  getUserInfo({commit, state}) {
    return new Promise(async (resolve, reject) => {
      const response = await getUserInfo(state.token);
      if (!response.success) {
        removeToken();
        reject(response.errmsg);
      }

      const username = response.user.username;
      if (username !== 'admin' && !response.role) {
        removeToken();
        reject('没有role');
      }
      commit('SET_USERNAME', response.user.username);
      commit('SET_USER_ID', response.user.id);
      commit('SET_ROLE', response.role ? response.role.name : null);


      resolve(response)
    })
  },

  // todo token 验证 提交后台 标记 过期， 现 仅仅 remove token
  logout({commit, state}) {
    return new Promise(resolve => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        commit('SET_USER_ID', '');
        commit('SET_ROLE', null);
        removeToken();
        resolve()
      })
    })
  },

  // get user info fail then logout
  fedLogOut({commit}) {
    commit('SET_TOKEN', '');
    commit('SET_USERNAME', '');
    commit('SET_USER_ID', '');
    commit('SET_ROLE', null);
    removeToken();
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
