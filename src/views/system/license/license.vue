<template>
  <div>
    <panel-title title="关于本系统"></panel-title>

    <fieldset>
      <h5 style="margin-bottom: 15px">基本信息</h5>

      <el-row>
        <el-col :span="4" class="control">
          <span>授权给：</span>
        </el-col>
        <el-col :span="20" class="normal">
          <span>{{license.lic_name}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="control">
          <span>许可证：</span>
        </el-col>
        <el-col :span="20" class="normal">
          <span>{{license.lic_code}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="control">
          <span>产品类型：</span>
        </el-col>
        <el-col :span="20" class="normal">
          <span>{{license.lic_ver ? license_type[license.lic_ver] : ''}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="control">
          <span>服务器数量：</span>
        </el-col>
        <el-col :span="20" class="normal">
          <span>{{license.lic_num}}</span>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" class="control">
          <span>有效时间：</span>
        </el-col>
        <el-col :span="20" class="normal">
          <span> {{license.expire_date ? `截止日  ${license.expire_date}` : '' }}</span>
        </el-col>
      </el-row>

      <!--<el-row>-->
      <!--<el-col :span="4" class="control">-->
      <!--<span>多线程发布：</span>-->
      <!--</el-col>-->
      <!--<el-col :span="20" class="normal">-->
      <!--<span>支持</span>-->
      <!--</el-col>-->
      <!--</el-row>-->

      <!--<el-row>-->
      <!--<el-col :span="4" class="control">-->
      <!--<span>双机发布：</span>-->
      <!--</el-col>-->
      <!--<el-col :span="20" class="normal">-->
      <!--<span>支持</span>-->
      <!--</el-col>-->
      <!--</el-row>-->


      <el-row>
        <el-col :span="4" class="control"></el-col>
        <el-col :span="20" class="normal">
          <el-button type="primary" @click="showUpdateLicenseDialog"
                     v-permission="['admin', 'tenant']">更新许可证</el-button>
        </el-col>
      </el-row>
    </fieldset>


    <license-dialog ref="licenseDialog" @getLicenseInfo="getLicenseInfo"></license-dialog>
  </div>
</template>

<script>
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import LicenseDialog from './licenseDialog'

  import {getLicense} from '@/api/system/license'
  import permission from '@/directive/permission/index.js' // 权限判断指令

  export default {
    name: "license",
    components: {
      PanelTitle,
      LicenseDialog
    },
    directives: { permission },
    data() {
      const license_type = {
        demo: '试用版',
        base: '基础版',
        standard: '标准版',
        vm: '虚拟机版',
      };


      return {
        license_type,
        license: {
          lic_code: null,
          lic_name: null,
          lic_ver: null,
          lic_num: null,
          expire_date: null,
        },
      }
    },
    created() {
      this.getLicenseInfo();
    },
    methods: {
      showUpdateLicenseDialog() {
        this.$refs.licenseDialog.showLicenseDialog()
      },
      getLicenseInfo() {
        getLicense().then(response => {
          const items = response._items;
          this.license = items && items.length ? items[0] : {};
        })
      }
    }
  }
</script>
