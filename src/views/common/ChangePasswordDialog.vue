<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.visible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>密码修改</span></div>
    </el-row>

    <el-row>
      <el-col :span="21">
        <el-form :model="form" :rules="formRules" ref="form" label-width="120px" status-icon>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="form.checkPassword" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" :disabled="disabled" @click="updatePassword">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {updateUserInfo} from '@/api/auth/user'

  export default {
    name: "ChangePasswordDialog",
    data() {
      const validatePass = (rule, value, callback) => {
        if (!value) callback(new Error('请输入密码'));
        if (this.form.checkPassword !== '') this.$refs.form.validateField('checkPassword');
        callback();
      };
      const validatePass2 = (rule, value, callback) => {
        if (!value) callback(new Error('请再次输入密码'));
        if (value !== this.form.password) callback(new Error('两次输入密码不一致!'));
        callback();
      };

      return {
        disabled: true,
        dialog: {
          title: '修改密码',
          visible: false,
        },

        user_id: null,
        form: {
          password: null,
          checkPassword: null
        },
        formRules: {
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: validatePass2, trigger: 'blur'}
          ],
        }
      }
    },
    watch: {
      form: {
        handler(form) {
          this.disabled = !(form.password && form.checkPassword)
        },
        deep: true,
      }
    },
    methods: {
      showChangePasswordDialog(row) {
        this.dialog.visible = true;
        this.$nextTick(() => {
          // this.$refs.form.clearSelection();
          this.$refs.form.resetFields();

          this.user_id = row.id;
        })
      },
      hideChangePasswordDialog() {
        this.dialog.visible = false;
      },
      updatePassword() {
        this.$refs['form'].validate((valid) => {
          if (!valid) return false;
          const params = {
            password: this.form.password
          };
          updateUserInfo(this.user_id, params).then(() => {
            this.hideChangePasswordDialog();
            this.$message.success('修改密码成功');
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
