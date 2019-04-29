import {asyncRoutes, constantRoutes} from '@/router'

/**
 * 通过meta.roles  判断是否与当前用户权限匹配
 * 如果 用户的role 在菜单的roles 返回 True，否者返回False
 * 但是 如果不带 role，返回True
 * @param role
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(role)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * 从all 的路由数据 ，刷选出满足用户 hasPermission 的路由
 * @param routes
 * @param role
 */
function filterAsyncRouter(routes, role) {
  const res = [];

  routes.forEach(route => {
    const tmp = {...route};
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, role)
      }
      res.push(tmp)
    }
  });

  return res
}

/***
 * constantRouterMap : 公共路由 不需要加权限 没什么意思，比如login ，404，500
 * asyncRouterMap ：   动态需添加路由，自定义加权限
 */
const state = {
  routers: [],
  addRouters: [],
};

const mutations = {
  SET_ROUTERS: (state, routes) => {
    state.addRouters = routes;
    state.routers = constantRoutes.concat(routes);
  }
};


const actions = {
  generateRoutes({commit}, data) {
    return new Promise(resolve => {
      const {role, username} = data;
      let accessedRoutes = username === 'admin' ?
        asyncRoutes :
        filterAsyncRouter(asyncRoutes, role);

      commit('SET_ROUTERS', accessedRoutes);
      resolve(accessedRoutes)
    })
  }
};


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
