<template>
  <div>
    <panel-title title="个人信息"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 10px; font-size: 13px">基本信息</h5>

          <el-form :model="baseForm" :rules="baseRules" ref="baseForm" label-width="120px">
            <el-form-item label="账号名:">
              <span>{{userInfo.username}}</span>
            </el-form-item>
            <el-form-item label="用户名:" prop="nickname">
              <el-input v-model="baseForm.nickname" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="权限:">
              <span>{{getEnumName(userInfo.role)}}</span>
            </el-form-item>
            <el-form-item label="租户名:" v-if="userInfo.role === 'webmaster'">
              <span>{{userInfo.tenant_name}}</span>
            </el-form-item>
            <el-form-item label="描述:" prop="description">
              <el-input type="textarea" v-model="baseForm.description" :autosize="{ minRows: 4}"></el-input>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>

    <div class="top-line" style="margin: 20px 0"></div>

    <el-button v-waves type="primary" style="margin-left: 120px" @click="saveUserInfo">保 存</el-button>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import {getUserInfo, updateUser} from '@/api/users/users'
  import _ from 'lodash'
  import waves from '@/directive/waves'

  import {getEnumName} from '@/utils'

  export default {
    name: "index",
    components: {
      PanelTitle
    },
    directives: {
      waves
    },
    data() {
      return {
        userInfo: {},
        baseForm: {
          nickname: null,
          description: null,
        },
        baseRules: {
          nickname: {required: true, message: '请输入用户昵称', trigger: ['blur', 'change']},
        }
      }
    },
    created() {
      this.getUserInfo(this.$store.state.user.user_id);
    },
    methods: {
      getEnumName,
      getUserInfo(user_id) {
        const asUser_id = this.$store.state.user.asUser_id;
        // alert(asUser_id);
        this.getUser(asUser_id || user_id).then(response => {
          this.userInfo = response;
          this.baseForm = _.pick(response, Object.keys(this.baseForm));
        })
      },

      async getUser(user_id) {
        return await getUserInfo(user_id)
      },
      saveUserInfo() {
        updateUser(this.userInfo.id, this.baseForm).then(response => {
          this.$message.success('修改个人信息成功')
        })
      }
    }
  }
</script>

<style scoped>

</style>
