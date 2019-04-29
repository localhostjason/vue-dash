<template>
  <el-dialog title="日志清理设置" :visible.sync="dialogVisible" class="clear-modal"
             :close-on-press-escape="false"
             :close-on-click-modal="false">
    <el-row>
      <el-col :span="18">
        <el-form label-width="120px" :model="clear" ref="clearForm">
          <el-form-item label="选择时间:" prop="time">
            <el-date-picker
              v-model="clear.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clearLogs" :disabled="disabled">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {deleteLogs} from '@/api/logs'
  import {transformFilter, resetForm} from '@/utils'

  export default {
    name: "ClearLogModal",
    props: ['type'],
    data() {
      return {
        dialogVisible: false,
        disabled: true,

        clear: {
          time: []
        },
      }
    },
    watch: {
      clear: {
        handler(form) {
          this.disabled = !form.time.length
        },
        deep: true
      },
    },
    methods: {
      showModal() {
        this.dialogVisible = true;
        this.disabled = true;

        this.$nextTick(() => {
          this.$refs.clearForm.resetFields();
        })
      },
      clearLogs() {
        const filters = transformFilter(this.clear, 'time');
        deleteLogs({...filters, type: this.type}).then(() => {
          this.dialogVisible = false;
          this.$emit('getLogsList');
          this.$message.success('删除成功');
        })
      }
    }
  }
</script>

