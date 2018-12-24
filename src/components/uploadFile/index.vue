<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click="upload" type="primary">上传附件
    </el-button>
      <el-upload style="display:none;" class="editor-slide-upload" :action="pictUpload" :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card"  :on-success="handleSuccess" >
        <el-button size="small" type="primary" id="upload">点击上传</el-button>
      </el-upload>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import {pictUpload} from 'api/config.js'
export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      pictUpload:pictUpload,
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    upload(){
      document.getElementById('upload').click()

    },
    handleSuccess(response, file) {
      this.$emit('successCBK',{href:response.data,name:file.name})
      // const uid = file.uid
      // const objKeyArr = Object.keys(this.listObj)
      // for (let i = 0, len = objKeyArr.length; i < len; i++) {
      //   if (this.listObj[objKeyArr[i]].uid === uid) {
      //     this.listObj[objKeyArr[i]].url = response.files.file
      //     this.listObj[objKeyArr[i]].hasSuccess = true
      //     return
      //   }
      // }
    }
    
  }
}
</script>

<style  lang="less" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
