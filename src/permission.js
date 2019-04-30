import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

// NProgress Configuration
NProgress.configure({showSpinner: false});

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  if (!hasToken) {
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${to.path}`);
    NProgress.done();
    return
  }

  if (to.path === '/login') {
    next({path: '/'});
    NProgress.done();
    return
  }

  if (store.getters.username) {
    next();
    return
  }

  try {
    const user_info = await store.dispatch('user/getUserInfo');
    const role = user_info.role; //such as: 'admin'
    const username = user_info.username;
    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('permission/generateRoutes', {role, username});

    // dynamically add accessible routes
    router.$addRoutes(accessRoutes);

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({...to, replace: true})
  } catch (error) {
    // remove token and go to login page to re-login
    await store.dispatch('user/fedLogOut');
    Message.error(error || 'Has Error');
    next(`/login?redirect=${to.path}`);
    NProgress.done()
  }
});

router.afterEach(() => {
  NProgress.done()
});
