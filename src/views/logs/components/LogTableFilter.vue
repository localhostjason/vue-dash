<template>
  <el-row>
    <el-col :span="24" style="margin-bottom: 10px">
      <el-date-picker
        v-model="argsQuery.time"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions">
      </el-date-picker>
    </el-col>
    <el-col :span="24">
      <el-input v-model="argsQuery.server_ip" placeholder="服务器IP" style="width: 166px;" clearable></el-input>
      <el-input v-model="argsQuery.object" placeholder="对象" style="width: 150px;" clearable></el-input>
      <el-select v-model="argsQuery.matter_desc" clearable filterable allow-create default-first-option
                 placeholder="请输入事项">
        <el-option v-for="item in matters" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="argsQuery.action" clearable filterable allow-create default-first-option placeholder="请输入动作">
        <el-option v-for="item in actions" :key="item" :label="item" :value="item"></el-option>
      </el-select>

      <el-button v-waves type="primary" icon="el-icon-search" @click="handleFilter">查 询</el-button>
      <el-button v-waves type="danger" icon="el-icon-delete" @click="showClearLogModal" class="pull-right">清理日志
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  import waves from '@/directive/waves/index'
  import {pickerOptions, resetForm} from '@/utils/index'

  export default {
    name: "LogTableFilter",
    directives: {waves},
    data() {
      const actions = [
        '阻止', '只记录', '拒绝访问'
      ];
      const matters = [
        '启动', '停止', '重启', '正常', '暂停', '上传文件', '删除文件', '连接成功', '连接异常', '模块加载', '模块卸载',
        '合法写入', '非法写入', '木马', '文件伪装', '非法外链', '文件丢失', '水印丢失', '水印不匹配',
        '水印找不到', '攻击手段', '敏感对象', '协议加强'
      ];

      return {
        pickerOptions,
        actions,
        matters,

        argsQuery: {
          time: null,
          server_ip: null,
          object: null,
          matter_desc: null,
          action: null,
        }
      }
    },
    methods: {
      handleFilter() {
        const result = {};
        for (const [key, val] of Object.entries(this.argsQuery)) {
          if (val) {
            if (!['time', 'action', 'matter_desc'].includes(key)) {
              result[key] = `like(\"%25${val}%25\")`
            } else {
              result[key] = val
            }
          }
        }

        this.$emit('filterLog', result)
      },
      showClearLogModal() {
        this.$emit('showClearLogModal')
      }
    }
  }
</script>
