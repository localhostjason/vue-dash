<template>
  <el-dialog title="上传图片" :visible.sync="dialog.visible" width="60%" :close-on-press-escape="false"
             :close-on-click-modal="false">

    <el-row style="margin-bottom: 20px; margin-top: -8px">
      <div class="div_title"><span>图片信息</span></div>
    </el-row>


    <el-row>
      <el-col :span="15" :offset="3">
        <el-upload
          ref="upload"
          :action="actionUrl"
          :headers="headers"
          :multiple="multiple"
          :file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-change="handleChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" title="详情" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.visible = false">取 消</el-button>
      <el-button type="primary" @click="uploadFile" :disabled="disabled">上 传</el-button>
    </div>
  </el-dialog>

</template>

<script>
  import {getToken} from '@/utils/auth'

  export default {
    name: "UploadFile",
    props: ['name', 'type'],
    data() {
      return {
        dialog: {
          visible: false,
        },
        multiple: true,

        fileList: [],
        file_id: '',

        language: this.$store.getters.language,

        disabled: true,
        headers: {
          Authorization: `Bearer ${getToken()}`
        },

        dialogImageUrl: '',
        dialogVisible: false,

      }
    },
    computed: {
      actionUrl() {
        const api = process.env.VUE_APP_BASE_API;
        if (this.type === 'room') {
          return `${api}/import/room/img?id=${this.file_id}&file_type=room`
        } else if (this.type === 'food') {
          return `${api}/import/food/img?id=${this.file_id}&file_type=food`
        } else if (this.type === 'news') {
          return `${api}/import/news/img?id=${this.file_id}&file_type=news`
        } else if (this.type === 'story') {
          return `${api}/import/story/img?id=${this.file_id}&file_type=story`
        } {
          return `${api}/import/img?id=${this.file_id}&language=${this.language}`
        }
      }
    },
    methods: {
      showUploadFileDialog(row = [], file_id) {
        this.dialog.visible = true;

        this.fileList = row.map(value => {
          this.$set(value, 'url', process.env.VUE_APP_FILE_API + value.img_url);
          return value
        });
        console.log(this.fileList);
        this.file_id = file_id;

        this.multiple = !file_id
      },


      uploadFile() {
        this.$refs.upload.submit();
      },

      handleRemove(file, fileList) {
        this.fileList = fileList;
        this.disabled = !fileList.length
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },


      handleChange(file, fileList) {
        this.fileList = this.multiple ? fileList : fileList.slice(-1);
        this.disabled = !fileList.length
      },
      handleSuccess(response, file, fileList) {
        this.fileList = fileList;
        this.disabled = !fileList.length;
        this.dialog.visible = false;

        this.$message.success('上传成功');
        this.$emit('reload');
      },
      handleError(err, file, fileList) {
        this.$message.error(JSON.stringify(err));
      }
    }
  }
</script>

<style scoped>

</style>
