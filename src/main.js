import Vue from 'vue'

import 'normalize.css/normalize.css'
import 'font-awesome/scss/font-awesome.scss'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.scss'

import App from './App'
import router from './router'
import store from './store'

import './icons'
import './permission'

import * as filters from './filters'

Vue.use(Element, {
  size: 'small'
});

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;

// 使用懒加载之后，可能会造成的问题有，导航点击没用，加载模块出现错误，这种问题出现的偶然性很高，github上关于这个问题的讨论：Loading chunk {n} failed 。
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
