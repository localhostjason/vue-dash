<template>
  <div>
    <div class="navbar-tb">
      <div class="logo">
        <i class="fa fa-skyatlas"></i>
        <span>{{settings.title}}</span>
      </div>


      <el-menu
        :default-active="activeMenuOnePath || ''"
        mode="horizontal"
        background-color="#1b1d20"
        text-color="#ccc"
        active-text-color="#fff"
      >

        <el-menu-item
          v-for="item in permission_routers"
          :key="item.path"
          :index="item.path"
          class="menuOne"
          :class="activeMenuOnePath === item.path ? 'is-real-active' : ''"
          v-if="!item.hidden && item.children.length"
        >
          <div
            class="without-dropdown"
            v-if="item.meta && item.meta.click"
            @click="showPath(item.name)"
          >
            <span class="el-dropdown-link">
              <svg-icon :icon-class="item.meta.icon"></svg-icon>
              <span>{{ item.meta.title }}</span>
            </span>
          </div>
          <el-dropdown diabled placement="bottom" :show-timeout="show_timeout">
            <span class="el-dropdown-link">
              <svg-icon :icon-class="item.meta.icon"></svg-icon>
              <span>{{ item.meta.title }}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="child_route in item.children"
                :key="child_route.name"
                v-if="!child_route.hidden"
                :divided="child_route.meta.divided"
                :class="
                  (child_route.children
                  ? child_route.children.map(dd => dd.name).includes(route_name)
                  : child_route.name === route_name)
                    ? 'is-active'
                    : ''
                "
              >
                <span @click="showPath(child_route.name)">
                  {{ child_route.meta.title }}
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>

      <div class="right-menu">
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="hover"
          placement="bottom"
          :show-timeout="show_timeout"
        >
          <div class="avatar-wrapper">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width:90px!important">
            <router-link to="/user/info">
              <el-dropdown-item><span>个人信息</span></el-dropdown-item>
            </router-link>
            <span @click="changePassword">
              <el-dropdown-item><span>修改密码</span></el-dropdown-item>
            </span>
            <span @click="logout">
              <el-dropdown-item divided><span>退出登录</span></el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>

        <template v-if="device !== 'mobile'" class="right-menu-item">
          <screenfull
            id="screenfull"
            class="right-menu-item hover-effect"
          ></screenfull>
        </template>
      </div>
    </div>
    <change-password-dialog ref="changePassword"></change-password-dialog>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import Hamburger from "@/components/Hamburger";
  import Breadcrumb from "@/components/Breadcrumb";
  import ChangePasswordDialog from "./Dialog/ChangePasswordDialog";
  import Search from "@/components/HeaderSearch";
  import Screenfull from "@/components/Screenfull";
  import settings from '@/settings'

  export default {
    components: {
      Hamburger,
      ChangePasswordDialog,
      Breadcrumb,
      Search,
      Screenfull
    },
    computed: {
      ...mapGetters([
        "sidebar",
        "username",
        "device",
        "role",
        "permission_routers",
        "activeMenuOnePath",
      ]),

      route_name() {
        return this.$route.name;
      }
    },
    data() {
      return {
        show_timeout: 0,
        settings
      };
    },
    watch: {
      $route(route, old) {
        const childrenName = this.getChildrenName();
        for (const [path, names] of Object.entries(childrenName)) {
          if (names.includes(route.name)) {
            this.activeMenuOne(path);
            return;
          }
        }
      }
    },
    created() {
      if (this.activeMenuOnePath || this.activeMenuOnePath === "") {
        this.activeMenuOne(this.activeMenuOnePath);
      } else {
        this.changeRoute("");
      }
    },
    methods: {
      getChildrenName() {
        let result = {};
        for (const info of this.permission_routers) {
          if (info.path != null) {
            result[info.path] = result[info.path] || [];
            if (info.children && info.children.length) {
              for (const j of info.children) {
                result[info.path].push(j.name);

                if (j.children && j.children.length) {
                  for (const jj of j.children) {
                    result[info.path].push(jj.name);
                  }
                }
              }
            }
          }
        }
        return result;
      },

      async changeRoute(path) {
        const routes = await this.activeMenuOne(path);
        this.$router.push({
          name: routes[0].children[0].name
        });
      },
      showPath(name) {
        this.$router.push({
          name: name
        });
      },
      async activeMenuOne(path) {
        const routes = this.permission_routers.filter(
          value => value.path === path
        );

        await this.$store.dispatch("permission/changeActiveMenuOne", path);
        return routes;
      },
      toggleSideBar() {
        this.$store.dispatch("app/toggleSideBar");
      },
      async logout() {
        try {
          await this.$store.dispatch("user/logout");
          await this.$store.dispatch("permission/removeActiveMenuOne");

          this.$router.push(`/login`);
          this.$message.success("退出登录成功");
        } catch (e) {
          this.$router.push(`/login`);
        }
      },
      changePassword() {
        this.$refs.changePassword.showChangePasswordDialog();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .menuOne {
    cursor: pointer;

    &.active {
      background: #dddddd;
    }
  }

  .navbar-tb {
    position: fixed;
    width: 100%;
    z-index: 100;
    display: flex;
    //  #fff
    // background: #3d4f67;
    background-color: #1b1d20;
    //#d8dce5
    // border: 1px solid #3d4f67;

    height: 56px;
    line-height: 56px;
    overflow: hidden;
    border-radius: 0 !important;

    .logo {
      float: left;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      margin-left: 24px;
      padding-right: 60px;
      color: #fff;
      cursor: pointer;

      .fa {
        font-size: 35px;
        display: block;
        margin-right: 5px;
      }

      span {
        font-size: 20px;
      }

      .waf-logo {
        width: 92px;
        height: 60px;
      }
    }

    /deep/ .el-menu {
      box-sizing: border-box;

      .el-menu-item {
        height: 55px;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 55px !important;

        .svg-icon {
          margin-right: 6px;
          width: 18px;
          height: 18px;
        }

        .el-icon--right {
          width: auto;
          margin-right: 0px;
          margin-left: 6px;
        }

        .without-dropdown {
          margin-right: -24px;
        }
      }

      .el-dropdown-link {
        color: #ccc;
        display: flex;
        align-items: center;

        i {
          font-size: 12px;
        }
      }

      .el-dropdown-link:hover {
        color: #fff;
      }

      .el-menu-item.is-active {
        border-bottom-color: #1b1d20 !important;
      }

      .el-menu-item.is-real-active {
        border-width: 4px !important;
        background-color: #000 !important;
        border-bottom-color: #409eff !important;

        .el-dropdown-link {
          color: #fff;
        }
      }
    }

    .el-menu.el-menu--horizontal {
      border-bottom: 1px solid #1b1d20;
    }

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      position: fixed;
      right: 12px;
      top: 0;
      line-height: 56px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 12.5px;
        font-size: 12px;
        // #5a5e66
        color: #cccccc;

        &:hover {
          color: #fff;
        }

        &.router-link-active {
          color: #fff;
        }

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 15px;

        .avatar-wrapper {
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -14px;
            top: 23px;
            font-size: 12px;
          }
        }
      }

      .warning-con {
        i {
          font-size: 20px;
        }

        // color: rgb(155, 156, 158);
        .badge {
          // width: 30px;
          // padding: 0px 6px;
          // height: 20px;
          // border-radius: 10px;
          // background: rgb(245, 108, 108);
          // text-align: center;
          // color: #fff;
          width: 8px;
          height: 8px;
          background-color: rgb(245, 108, 108);
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 4px;
          margin-left: -2px;
        }
      }
    }
  }
</style>
