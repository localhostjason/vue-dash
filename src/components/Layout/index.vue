<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>


    <template v-if="settings.layout === 'LR'">
      <sidebar class="sidebar-container"/>
      <div class="main-container">
        <navbar/>
        <app-main/>
      </div>
    </template>

    <template v-if="settings.layout === 'TB'">
        <navbar-tb/>
        <app-main/>
    </template>
  </div>
</template>

<script>
  import {Navbar, Sidebar, AppMain, NavbarTb} from './components'
  import ResizeMixin from './mixin/ResizeHandler'
  import {mapState} from 'vuex'
  import settings from '@/settings'

  export default {
    name: 'Layout',
    components: {
      Navbar,
      Sidebar,
      AppMain,
      NavbarTb,
    },
    mixins: [ResizeMixin],
    data() {
      return {
        settings,
      }
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
