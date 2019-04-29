<template>
  <div>
    <!-- logs table-->
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading" :data="data" ref="table" border fit @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" fixed="left"></el-table-column>
          <el-table-column prop="id" label="ID" sortable width="80"></el-table-column>
          <el-table-column label="发生时间" sortable width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.time ? dateFormat('yyyy-MM-dd hh:mm:ss', scope.row.time) : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="server_ip" label="服务器IP" sortable width="130"></el-table-column>
          <el-table-column prop="module" label="模块" sortable width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.module">{{getEnumName(scope.row.module)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type">{{ getEnumName(scope.row.type) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="object" sortable label="对象"></el-table-column>
          <el-table-column prop="matter_desc" sortable label="事项" width="200"></el-table-column>
          <el-table-column prop="action" sortable label="动作" width="120"></el-table-column>
          <el-table-column label="操作" align="right" width="100" v-if="type==='security'">
            <template slot-scope="scope">
              <el-popover
                v-if="!scope.row.acked"
                placement="top"
                width="160"
                v-model="scope.row.visible">
                <p>确认已处理？</p>
                <div style="text-align: right; margin: 0">
                  <el-button type="info" plain size="mini" @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" plain size="mini" @click="updateAck(scope.row)">确定</el-button>
                </div>
                <el-button type="text" slot="reference">处理</el-button>
              </el-popover>
              <el-button type="text" v-else disabled>已处理</el-button>
            </template>
          </el-table-column>
        </el-table>
        <table-foot :data-length="data.length"
                    @setSelection="setSelection"
                    @clearSelection="$refs.table.clearSelection()"
                    @toggleAllSelection="$refs.table.toggleAllSelection()"
                    ref="tableFoot"
                    v-if="type==='security'"
        >
          <template slot="foot">
            <span>
              <el-button type="primary" plain @click="updateLogInfo(selectedLogs)"
                         :disabled="!selectedLogs.length">批量处理</el-button>
            </span>
          </template>
        </table-foot>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-pagination :current-page="pageQuery.page" :page-sizes="[10,20,30, 40]" :page-size="pageQuery.max_results"
                       :total="total" background layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {dateFormat, getEnumName, getIdFormArray} from '@/utils'
  import {updateLog} from '@/api/logs'
  import TableFoot from '@/components/Table/Foot'


  export default {
    name: "LogTable",
    props: {
      data: {
        type: Array,
        required: true
      },
      total: null,
      pageQuery: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        default: null
      },
      listLoading: {
        type: Boolean,
        default: true
      }
    },
    components: {
      TableFoot
    },
    watch: {
      listLoading(val) {
        this.loading = val;
      },
    },
    data() {
      return {
        loading: this.listLoading,

        log_id: this.$route.query.log || 0,
        selectedLogs: []
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.$refs.tableFoot.selectionChange(val);
      },
      setSelection(val) {
        this.selectedLogs = getIdFormArray(val, 'id');
      },
      async updateLogInfo(rows) {
        if (!rows.length) return false;
        this.loading = true;
        for (const row_id of rows) {
          await updateLog(row_id, {acked: true})
        }
        await this.$emit('getLogsList');
        this.$message.success('处理成功');
        this.loading = false;
      },

      dateFormat,
      getEnumName,
      handleSizeChange(params_limit) {
        this.pageQuery.max_results = params_limit;
        this.$emit('getLogsList')
      },
      handleCurrentChange(params_page) {
        this.pageQuery.page = params_page;
        this.$emit('getLogsList')
      },
      updateAck(row) {
        this.loading = true;
        updateLog(row.id, {acked: true}).then(response => {
          this.$emit('getLogsList');
          this.$message.success('处理成功');
          this.loading = false
        })
      }
    }
  }
</script>
