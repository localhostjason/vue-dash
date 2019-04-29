<template>
  <table class="table table-fixed table-add-btn">
    <tfoot>
    <tr>
      <td style="padding-left: 15px;width: 16px;padding-right: 10px" v-if="isCheckbox">
        <el-checkbox v-model="myCheckAll"></el-checkbox>
      </td>
      <td :colspan="colSpan" class="foot-td">
        <div style="margin-left: 10px">
          <slot name="foot"></slot>
        </div>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script>
  export default {
    name: "Foot",
    props: {
      dataLength: {
        type: Number,
        default: 0
      },
      isOpenCheckbox: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        myCheckAll: this.checkAll,

        multipleSelection: [],
        checkAll: false,
        colSpan: this.dataLength
      };
    },
    computed: {
      isCheckbox() {
        return Boolean(this.dataLength && this.isOpenCheckbox)
      }
    },
    watch: {
      checkAll(val) {
        this.myCheckAll = val;
      },
      myCheckAll(val) {
        this.toggleAll(val)
      }
    },
    methods: {
      selectionChange(val) {
        this.multipleSelection = val;
        this.checkAll = Boolean(val && val.length && val.length === this.dataLength);
        this.$emit('setSelection', val);
      },
      toggleAll(val) {
        if (this.multipleSelection.length && this.multipleSelection.length === this.dataLength) {
          this.checkAll = true;
          if (val) return;
          this.$emit('clearSelection');
          // this.$refs.multipleServerTable.clearSelection();
        }

        if (!val && this.multipleSelection.length) return;
        val ? this.$emit('toggleAllSelection') : this.$emit('clearSelection');
        // this.$refs.multipleServerTable.toggleAllSelection()
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .table-add-btn {
    margin: -21px 0 0;
    z-index: 99;
    width: 100%;
    position: relative;
    bottom: auto;
  }

  .table {
    background: #FFF;
    font-size: 12px;
    margin-top: -1px;
    border: 1px solid #E1E6EB;
  }

  .foot-td {
    /*padding: 8px 0;*/
    .el-button {
      margin: 8px 0;
    }
    .el-button--text {
      margin: 0;
    }
    .el-button {
      min-width: 62px;
      height: 30px;
    }
  }
</style>
