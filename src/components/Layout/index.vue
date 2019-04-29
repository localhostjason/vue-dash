<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view v-if="isShowVisited"/>
      <app-main/>
    </div>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain, TagsView} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import {noShowTagsName} from './tags'
  import {mapState} from 'vuex'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      TagsView
    },
    mixins: [ResizeMixin],
    data() {
      return {
        isShowVisited: true
      }
    },
    created() {
      this.getRouterName();
    },
    watch: {
      $route(route, old) {
        this.isShowVisited = !noShowTagsName.includes(route.name)
      },
    },
    computed: {
      ...mapState({
        sidebar: state => state.app.sidebar,
        device: state => state.app.device
      }),
      classObj() {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          mobile: this.device === 'mobile'
        }
      }
    },
    methods: {
      handleClickOutside() {
        this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
      },
      getRouterName() {
        const router_name = this.$router.history.current.name;
        this.isShowVisited = !noShowTagsName.includes(router_name)
      }
    }
  }
</script>

<style>
  body {
    background-color: #ffffff;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "@/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
