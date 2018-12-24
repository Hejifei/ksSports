<template>
  <div class="gameadd-wrapper">
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >生成秩序册</label>
        </div>
        
        <el-row>
          <el-form-item   label="秩序册内容" prop="matchSchedule">
            <div class="editor-wrapper">
              <Editor :id="id" v-model="ruleForm.programContent" :init="editorInit"></Editor>
              <div class="upload-wrapper">
                <upload-file @successCBK="imageSuccessCBK"></upload-file>
              </div>
            </div>
          </el-form-item>
        </el-row>
        <div class="font">代表队名单</div>
        <el-row>
          <el-col>
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item v-for="(item,index) in clubInfo"  :key="index" :title="item.clubName" :name="index">
                <div v-for="(item2,index2) in item.groupInfo" :key="index2">
                  <div>
                    <span class="common">{{item2.groupNameSelf}}</span>
                    <span class="common">组别：{{item2.groupName}}</span>
                  </div>
                  <div>
                    <span class="common">领队：{{item2.leader}}</span>
                    <span class="common">{{item2.phone}}</span>
                    <span class="common">教练：{{item2.coach}}</span>
                  </div>
                  <div class="img-wrapper">
                    <div v-for="(item3,index3) in item2.player" :key="index3">
                      <img :src="item3.playerImg" alt="">
                      <span>姓名：{{item3.playerName}}</span>
                      <span>号码：{{item3.number}}</span>
                    </div>
                  </div>
                </div>
              </el-collapse-item>
              
            </el-collapse>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top:20px;" justify="center"  class="commit-wrapper">
          <el-button class="savebtn" type="primary" size="medium" @click="save">保存</el-button>
        </el-row>
      </el-row>
    </el-form>
    
  </div>
</template>
<script>
import axios from 'axios'
import {pictUpload} from 'api/config.js'
import validators from '@/assets/js/validate.js';
import {getProgramList,addOrModifyProgram} from 'api/game.js'
import {getList,getItemDrop} from 'api/common.js'
// 文本编辑器
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import uploadFile from '@/components/uploadFile/index.vue'
export default {
  data() {
    var self = this;
    return {
      activeNames: ['1'],
      roleoptions:[],
      viewtype:'',
      id:'tinymce',
      pictUpload:pictUpload,
      ruleForm: {
        programContent:"",
        
      },
      clubInfo:[],
      accept:['image/jpeg','image/png'],
      rules:{},
      
      // 文本编辑器配置
      editorInit: {
        language_url: '/static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/lightgray',
        height: 300,
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image  code | removeformat',
        branding: false,
        
        // 图片上传三个参数，图片数据，成功时的回调函数，失败时的回调函数
        images_upload_handler: function (blobInfo, success, failure) {
          if (blobInfo.blob().size/1024/1024 > 10) {
            failure('上传图片大小不能超过 10MB!')
          }
          if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
            
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic () {
            let formData = new FormData()
            // 服务端接收文件的参数名，文件数据，文件名
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            axios({
              method: 'POST',
              // 这里是你的上传地址
              url: self.pictUpload,
              data: formData,
            })
            .then((res) => {
              // 这里返回的是你图片的地址
              success(res.data.data)
            })
            .catch(() => {
              failure('上传失败')
            })
          }
        }
        
      },
    };
  },
  components: {
    Editor,
    uploadFile
  },
  computed:{
    
  },
  
  mounted(){
    this.getRecord()
  },
  created(){
  },
  methods: {
    handleChange(val) {
        // console.log(val);
    },
    back(){
      this.$router.go(-1)
    },
    save(){
      addOrModifyProgram({matchId:this.$route.query.id,programContent:this.ruleForm.programContent}).then(res=>{
        if(res.code==200){
          this.$router.push({name:'groupgame-manage'})
        }
      })
    },
    imageSuccessCBK(val) {
      const _this = this
        window.tinymce.get(_this.id).insertContent(`<a href="${val.href}" >${val.name}</a> `)
    },
    getRecord(){
      getProgramList(this.$route.query.id).then(res=>{
        if(res.code==200){
          this.clubInfo=res.data.clubInfo
          this.ruleForm.programContent=res.data.programContent
        }
      })
    }
  }
};
</script>
<style lang="less">
.el-form-item__label{
  color: gray;
  font-size: 18px;
}
.common{
  color: #006DB3;
  font-size: 16px;
}
.el-collapse-item__header{
  font-size: 20px;
  color: #006DB3;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}
.avatar {
  width: 90px;
  height: 90px;
  display: block;
}
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}

// 报名表样式
.gamelist{list-style: none;
  li{display: flex;
    .divlab{width:100px;text-align: right;font-size: 16px;color: #232323;margin-right: 80px;}
    .divuse,.divrequire{margin-right: 57px;
      .el-checkbox__label{font-size: 16px;color: #232323;}
    }
  }
}
.enroll-number{
  display: flex;

}
.group{
  border: 1px solid gainsboro;
  height: 45px;
  display: flex;
  align-items: center;
  div{
    width: 70px;
    height: 22px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid gainsboro;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    text-align: center;
    margin: 0 10px;
    .del{
      cursor: pointer;
    }
  }
}
.pointer{
  cursor: pointer;
}
.editor-wrapper{
  position: relative;
}
.upload-wrapper{
  position: absolute;
  right: 2px;
  top: 0;
}
.flex-1{
  flex: 1;
}
.img-wrapper{
  display: flex;
  margin-top: 16px;
  flex-wrap: wrap;
  div{

    margin-right: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 96px;
      height: 135px;
      
    }
  }
}
.font{
  color: gray;
  font-size: 18px;
}
</style>
