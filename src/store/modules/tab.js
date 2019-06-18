const state = {
  tab_active_module: '',
};

const mutations = {
  SET_TAB_ACTIVE_MODULE: (state, active_module) => {
    state.tab_active_module = active_module
  },
};

const actions = {
  addTabActiveModule({commit}, active_module) {
    commit('SET_TAB_ACTIVE_MODULE', active_module)
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
