<template>
  <div>
    <el-row>
      <el-col :span="24">
        <panel-title title="安全日志" :is-line="isLine"></panel-title>
      </el-col>
    </el-row>


    <el-row>
      <el-col :span="24">
        <log-table-filter @filterLog="filterLog"
                          @showClearLogModal="showClearLogModal"></log-table-filter>

        <log-table :data="dataList"
                   :page-query="listQuery.pageQuery"
                   :total="total"
                   type="security"
                   :list-loading="listLoading"
                   @getLogsList="getLogsList"></log-table>

      </el-col>
    </el-row>

    <clear-log-modal type="security" ref="clearLog" @getLogsList="getLogsList"></clear-log-modal>
  </div>
</template>

<script>
  // import permission from '@/directive/permission/index.js'
  import {getLogs} from '@/api/logs'
  import PanelTitle from '@/components/PanelTitle/PanelTitle'
  import LogTable from '../components/logTable'
  import LogTableFilter from '../components/LogTableFilter'
  import ClearLogModal from '../components/ClearLogModal'

  import {transformFilter} from '@/utils'

  export default {
    name: "securityLog",
    components: {
      PanelTitle,
      LogTable,
      LogTableFilter,
      ClearLogModal
    },
    // directives: { permission },
    data() {
      return {
        isLine: false,
        listLoading: true,

        dataList: [],
        total: 0,
        listQuery: {
          argsQuery: {},
          pageQuery: {
            page: 1,
            max_results: 10
          },
        }
      }
    },
    created() {
      this.getLogsList()
    },
    methods: {
      // init 获取数据
      getLogsList() {
        const params = {...this.listQuery};
        params.argsQuery = transformFilter(params.argsQuery, 'time');
        params.argsQuery['type'] = 'security';
        const sorts = '-id';

        getLogs(params, {}, sorts).then(response => {
          this.dataList = response._items.map(v => {
            this.$set(v, 'visible', false);
            return v;
          });
          this.total = response._meta.total;
          this.listLoading = false;
        })
      },

      // 查询日志
      filterLog(argsQuery) {
        this.listQuery.pageQuery.page = 1;
        this.listQuery.argsQuery = argsQuery;
        this.getLogsList();
      },

      showClearLogModal() {
        this.$refs.clearLog.showModal();
      }
    }
  }
</script>
