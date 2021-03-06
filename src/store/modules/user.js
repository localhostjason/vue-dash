import {user, getUserInfo} from '@/api/auth/user'
import {getToken, removeToken, setToken} from '@/utils/auth'

const state = {
  token: getToken(),
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
  SET_ROLE: (state, roles) => {
    state.role = roles
  },
};

function removeStore(commit) {
  commit('SET_TOKEN', '');
  commit('SET_USERNAME', '');
  commit('SET_ROLE', null);
  removeToken();
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const username = userInfo.username.trim();
    const password = userInfo.password.trim();

    return new Promise((resolve, reject) => {
      user(username, password).then(response => {
        setToken(response.token);
        commit('SET_TOKEN', response.token);

        resolve()
      }).catch(error => {
        console.log('r', error);
        removeToken();
        reject('用户名或者密码不正确')
      })
    })
  },

  getUserInfo({commit, state}) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getUserInfo();
        if (!response) reject('error');
        if (!response.role) reject('权限不存在');

        commit('SET_USERNAME', response.username);
        commit('SET_ROLE', response.role);

        resolve(response)
      } catch (e) {
        reject(e)
      }

    })
  },


  logout({commit}) {
    removeStore(commit);
  },

  // get user info fail then logout
  fedLogOut({commit}) {
    removeStore(commit);
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
