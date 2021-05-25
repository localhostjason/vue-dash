const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  username: state => state.user.username,
  role: state => state.user.role,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  activeMenuOnePath: state => state.permission.activeMenuOnePath,
};
export default getters
