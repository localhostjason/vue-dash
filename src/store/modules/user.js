import {login, getUserInfo, logout} from '@/api/auth/login'
import {getToken, removeToken, setToken} from '@/utils/auth'


const state = {
  token: getToken(),
  username: '',
  user_id: '',
  roles: '',
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_ID: (state, user_id) => {
    state.user_id = user_id
  },
};

const actions = {
  login({commit}, userInfo) {
    const username = userInfo.username.trim();
    const password = userInfo.password.trim();

    return new Promise((resolve, reject) => {
      login(username, password).then(response => {
        setToken(response.token);
        commit('SET_TOKEN', response.token);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserInfo({commit, state}) {
    return new Promise(async (resolve, reject) => {
      // state.token
      const response = await getUserInfo();

      const username = response.username;
      if (username !== 'admin' && !response.role) {
        removeToken();
        reject('没有role');
      }
      commit('SET_USERNAME', response.username);
      commit('SET_USER_ID', response.id);
      // todo 根据项目 业务 设置role 或者roles
      commit('SET_ROLES', response.role ? response.role.name : '');

      resolve(response)
    })
  },

  logout({commit, state}) {
    return new Promise(resolve => {
      // state.token
      logout().then(() => {
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        commit('SET_USER_ID', '');
        commit('SET_ROLES', '');
        removeToken();
        resolve()
      })
    })
  },

  fedLogOut({commit}) {
    commit('SET_TOKEN', '');
    commit('SET_USERNAME', '');
    commit('SET_USER_ID', '');
    commit('SET_ROLES', '');
    removeToken();
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
