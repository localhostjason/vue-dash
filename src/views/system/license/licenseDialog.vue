<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.dialogVisible" width="40%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="pull-left">
        <div class="div_title">
          <span>许可证信息</span>
        </div>
      </div>
    </el-row>

    <el-row>
      <el-col :span="18">
        <el-form :model="licenseForm" :rules="rules" ref="form" label-width="100px" status-icon>
          <el-form-item label="用户名:" prop="lic_name">
            <el-input v-model="licenseForm.lic_name"></el-input>
          </el-form-item>
          <el-form-item label="许可证密钥:" prop="lic_code">
            <el-input v-model="licenseForm.lic_code"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateLicenseInfo" :disabled="disabled">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {updateLicense} from '@/api/system/license'
  import {Notification} from 'element-ui'

  import {compareDate} from '@/filters'

  export default {
    lic_name: "licenseDialog",
    data() {
      return {
        dialog: {
          title: '更新许可证',
          dialogVisible: false,
        },
        disabled: true,
        licenseForm: {
          lic_name: null,
          lic_code: null,
        },
        rules: {
          lic_name: [
            {required: true, message: '请输入用户名', trigger: ['blur', 'change']},
          ],
          lic_code: [
            {required: true, message: '请输入许可证密钥', trigger: ['blur', 'change']},
          ]
        }
      }
    },
    watch: {
      licenseForm: {
        handler(form) {
          this.disabled = !(form.lic_name && form.lic_code)
        },
        deep: true
      }
    },
    methods: {
      showLicenseDialog() {
        this.dialog.dialogVisible = true;

        this.$nextTick(() => {
          this.$refs.form.resetFields();
        })
      },
      hideLicenseDialog() {
        this.dialog.dialogVisible = false
      },
      updateLicenseInfo() {
        this.$refs['form'].validate((valid) => {
          if (!valid) return false;

          updateLicense(this.licenseForm).then(response => {
            this.$emit('getLicenseInfo');
            this.hideLicenseDialog();

            this.$store.dispatch('license/getLicenseInfo').then(res => {
              if (!this.$store.state.license.isExpired) {
                Notification.closeAll();
              }
            })
          })

        });
      }
    }
  }
</script>
