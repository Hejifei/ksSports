<template>
  <div class="wrapper">
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../assets/img/back.png" alt="">
          <label >新建通知</label>
        </div>
        <el-tabs v-model="activeName"  @tab-click='tabchange' class="notifybab">
          <el-tab-pane label="系统通知" name="noticeType1" :typeval='notifytype_system'>
            <el-row :gutter="58">
              <el-col :span="12">
                <el-form-item  label="通知标题" prop="noticeTitle">
                  <el-input v-model="ruleForm.noticeTitle"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-form-item  label="通知范围" prop="clubIds">
                <div class="nofitySelC">
                  <div class="nfsTitle">
                    <el-checkbox :indeterminate="NSTypeall_isIndeterminate" v-model="NSTypeall_checkAll" @change="NSTypeall_CheckAllChange">全部类型</el-checkbox>
                  </div>
                  <div class="nfsContent">
                    <el-checkbox-group v-model="NSTypeall_checked" @change="NSTypeall_typeallChange">
                      <el-checkbox v-for="(item,index) in notifsys_typeall" :label="item.id" :key="index">{{item.itemName}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>

                <div class="nofitySelC">
                  <div class="nfsTitle">
                    <el-checkbox :indeterminate="NSCluball_isIndeterminate" v-model="NSCluball_checkAll" @change="NSCluball_CheckAllChange">俱乐部全部</el-checkbox>
                  </div>
                  <div class="nfsContent">
                    <el-checkbox-group v-model="NSCluball_checked" @change="NSCluball_typeallChange">
                      <el-checkbox class='notifyCheckbox' v-for="(item,index) in notifsys_cluball" :label="item.id" :key="index">{{item.clubName}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <hr class="greyline" />

                <div class="nofitySelC">
                  <div class="nfsTitle">
                    <el-checkbox :indeterminate="NSQzall_isIndeterminate" v-model="NSQzall_checkAll" @change="NSQzall_CheckAllChange">区镇全部</el-checkbox>
                  </div>
                  <div class="nfsContent">
                    <el-checkbox-group v-model="NSQzall_checked" @change="NSQzall_typeallChange">
                      <el-checkbox v-for="(item,index) in notifsys_qzall" :label="item.id" :key="index">{{limieLength(item.clubName)}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-form-item>
            </el-row>
          </el-tab-pane>

          <el-tab-pane label="赛事通知" name="noticeType2"  :typeval='notifytype_game'>
            <el-row :gutter="58">
              <el-col :span="12">
                <el-form-item  label="通知标题" prop="noticeTitle">
                  <el-input v-model="ruleForm.noticeTitle"></el-input>
                  <template>
                    <el-radio @change="noticeMthtype_change" v-model="ruleForm.noticeMatchType" label="1">秩序册</el-radio>
                    <el-radio @change="noticeMthtype_change" v-model="ruleForm.noticeMatchType" label="2">成绩单</el-radio>
                    <el-radio @change="noticeMthtype_change" v-model="ruleForm.noticeMatchType" label="3">其他</el-radio>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="58"  v-if="ruleForm.noticeType === 2">
              <el-col :span="12">
                <el-form-item  label="选择赛事" prop="noticeMatchId">
                  <el-select v-model="ruleForm.noticeMatchId" @change="noticeMatchId_change" placeholder="请选择赛事" style="width:100%;">
                    <el-option
                      v-for="item in matchOptions"
                      :key="item.matchId"
                      :label="item.matchName"
                      :value="item.matchId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item  label="选择俱乐部" prop="clubIds">
                <div class="nofitySelC">
                  <div class="nfsTitle">
                    <el-checkbox :indeterminate="clubs_isIndeterminate" v-model="clubs_checkAll" @change="clubs_CheckAllChange">全选</el-checkbox>
                  </div>
                  <div class="nfsContent">
                    <el-checkbox-group v-model="ruleForm.clubIds" @change="clubs_typeallChange">
                      <el-checkbox v-for="(club,index) in clubs" :label="club.id" :key="index">{{club.clubName}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </el-form-item>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        <!-- 文本编辑器 -->
        <el-row>
          <el-form-item  label="通知内容" prop="noticeContent">
            <Editor :id="id" v-model="ruleForm.noticeContent" :init="editorInit"></Editor>
            <div class="upload-wrapper">
              <upload-file @successCBK="imageSuccessCBK"></upload-file>
            </div>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="center"  class="commit-wrapper">
            <el-button type="primary" size="medium" @click="submitForm('ruleForm')">发布</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import {pictUpload,pubapiUrl} from 'api/config.js'
import {getList,getItemDrop,getClubByProject,getClubDrop} from 'api/common.js'
import {addNotice,getMatchDrop,getClubByMatch} from 'api/notify.js'

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
    // let validnoticeMatchId=(rule, value, callback) => {
    //   // console.log(value,this.clubForm3.password)
    //   if (value === '' && this.ruleForm.noticeType === '2') {
    //     callback(new Error('请选择通知赛事'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      id:'tinymce',
      activeName:'noticeType1',
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: ['上海', '北京', '广州', '深圳'],
      isIndeterminate: true,
      pictUpload:pictUpload,
      pubapiUrl:pubapiUrl,
      accept:['image/jpeg','image/png'],
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
      tinymceHtml:'',
      ruleForm: {
        id:'',
        noticeTitle: "",
        noticeContent:'',
        noticeMatchId:'',
        noticeMatchType:'1', //1 秩序册 2成绩单 3其他
        clubIds:[],
        noticeType:'1', //1系统通知 2赛事通知
      },

      levelOptions:[],
      matchOptions:[],
      rules:{
        noticeTitle: [
          { required: true, message: '请输入通知标题', trigger: 'blur' },
          {min: 0, max: 20, message: '长度在 0 到 20 个字', trigger: 'blur'}
        ],
        noticeContent: [
          { required: true, message: '请输入通知内容', trigger: 'change' }
        ],
        clubIds: [
          { required: true, message: '请选择通知范围', trigger: 'change' }
        ],
        noticeMatchId: [
          // {required:true,validator:validnoticeMatchId,trigger:'change'}
          { required: true, message: '请选择通知赛事', trigger: 'change' }
        ],
        clubIds: [
          { required: true, message: '请选择通知对象', trigger: 'change' }
        ],
      },

      notifyType:[], //赛事通知类型
      notifytype_system:'', //系统通知类型值
      notifytype_game:'', //赛事通知类型值
      notifsys_typeall:[], //系统通知 全部类型
      NSTypeall_checked: [],
      NSTypeall_checkAll:false,
      NSTypeall_isIndeterminate: false,
      notifsys_cluball:[], //系统通知 俱乐部全部
      NSCluball_checked: [],
      NSCluball_checkAll:false,
      NSCluball_isIndeterminate: false,
      notifsys_qzall:[], //系统通知 区镇全部
      NSQzall_checked: [],
      NSQzall_checkAll:false,
      NSQzall_isIndeterminate: false,
      clubs:[],
      clubs_checkAll:false,
      clubs_isIndeterminate: false,
    };
  },
  components: {
    Editor,
    uploadFile
  },
  
  mounted(){
    this.queryEnum();
    tinymce.init({});
    this.noticeMthtype_change('2')
  },
  created(){
  },
  watch:{
    'ruleForm.clubIds'(val){
      if(val.length!=0){
        this.$refs['ruleForm'].clearValidate(['clubIds'])
      }
    }
  },
  methods: {
    limieLength(val){
      if(val.length>10){
        return val.substr(0,10)+'...'
      }
      return val
    },
    next(){
      this.secondStep=true
      this.firstStep=false
    },
    back(){
      this.$router.go(-1)
    },
    //提交信息
    submitForm() {
      let self = this;
      self.$refs['ruleForm'].validate(valid => {
        // console.log(valid)
        if(valid){
          // 添加
          // 系统通知的noticeMatchType值为空
          if(self.ruleForm.noticeType === '1' || self.ruleForm.noticeType === 1){
            self.ruleForm.noticeMatchType = '';
          }
          addNotice(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'notify'})
          })
        }
      })
    },
    //下拉常量初始化
    queryEnum(){
      // 赛事通知类型获取
      getList('NoticeTyep').then(res=>{
        this.notifyType = res.data;
        for(let i in res.data){
          if(res.data[i].label === '系统通知'){
            this.notifytype_system = res.data[i].value;
          }else if(res.data[i].label === '赛事通知'){
            this.notifytype_game = res.data[i].value;
          }
        }
      });
      // 获取赛事项目
      getItemDrop(1).then(res=>{
        this.notifsys_typeall = res.data;
      })
      // 获取所有区镇俱乐部
      getClubDrop(2).then(res=>{
        this.notifsys_qzall = res.data;
      })
      // getList('ClubLevel').then(res=>{
      //   this.levelOptions = res.data
      // });

    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    noticeMthtype_change(val){
      // 赛事通知类型变化
      //1 成绩单 2秩序册 3其他
      let dataform = {};
      if(val === '1'){
        dataform.scoreFlag = 1;
      }else if(val === '2'){
        dataform.programFlag = 1;
      }
      getMatchDrop(dataform).then(res=>{
        this.matchOptions = res.data;
        this.ruleForm.noticeMatchId = '';
        this.ruleForm.clubIds = [];
      })
    },
    noticeMatchId_change(val){
      // 根据赛事变化加载俱乐部
      // console.log(val)
      getClubByMatch({matchId:val}).then(res=>{
        this.clubs = res.data;
        // this.matchOptions = res.data
      })
    },
    tabchange(val){
      // 通知类型 1系统通知 2赛事通知
      this.ruleForm.noticeType = val.$attrs.typeval;
    },
    // 全选 全部类型
    NSTypeall_CheckAllChange(val) {
      let allsel = this.notifsys_typeall.map(val=>val.id);
      this.NSTypeall_checked = val ? allsel : [];
      this.NSTypeall_isIndeterminate = false;
      this.nstypeall_checkchange();
    },
    // 单个点击 全部类型
    NSTypeall_typeallChange(value){
      let checkedCount = value.length;
      this.NSTypeall_checkAll = checkedCount === this.notifsys_typeall.length;
      this.NSTypeall_isIndeterminate = checkedCount > 0 && checkedCount < this.notifsys_typeall.length;
      this.nstypeall_checkchange();
    },
    
    // 根据系统通知的全部类型加载俱乐部
    nstypeall_checkchange(){
      if(this.NSTypeall_checked.length === 0){
        this.notifsys_cluball = [];
      }else{
        getClubByProject(this.NSTypeall_checked).then(res=>{
          this.notifsys_cluball = res.data;
          this.NSCluball_typeallChange();
        })
      }
      // 清除已选中不存在的项
      let clubidall = this.notifsys_cluball.map(val=>val.id);
      let newsel = this.NSCluball_checked.filter(val=> clubidall.indexOf(val) !== -1);
      this.NSCluball_checked = newsel;
    },
    // 全选 俱乐部全部
    NSCluball_CheckAllChange(val) {
      let allsel = this.notifsys_cluball.map(val=>val.id);
      this.NSCluball_checked = val ? allsel : [];
      this.NSCluball_isIndeterminate = false;
      this.clubIdschange();
    },
    // 单个点击 俱乐部全部
    NSCluball_typeallChange(value){
      let checkedCount = this.NSCluball_checked.length;
      this.NSCluball_checkAll = checkedCount === this.notifsys_cluball.length;
      this.NSCluball_isIndeterminate = checkedCount > 0 && checkedCount < this.notifsys_cluball.length;
      this.clubIdschange();
    },
    // 全选 区镇全部
    NSQzall_CheckAllChange(val) {
      let allsel = this.notifsys_qzall.map(val=>val.id);
      this.NSQzall_checked = val ? allsel : [];
      this.NSQzall_isIndeterminate = false;
      this.clubIdschange();
    },
    // 单个点击 区镇
    NSQzall_typeallChange(value){
      let checkedCount = value.length;
      this.NSQzall_checkAll = checkedCount === this.notifsys_qzall.length;
      this.NSQzall_isIndeterminate = checkedCount > 0 && checkedCount < this.notifsys_qzall.length;
      this.clubIdschange();
    },
    // 全选 赛事通知-俱乐部
    clubs_CheckAllChange(val) {
      let allsel = this.clubs.map(val=>val.id);
      this.ruleForm.clubIds = val ? allsel : [];
      this.clubs_isIndeterminate = false;
    },
    // 单个点击 赛事通知-俱乐部
    clubs_typeallChange(value){
      let checkedCount = value.length;
      this.clubs_checkAll = checkedCount === this.clubs.length;
      this.clubs_isIndeterminate = checkedCount > 0 && checkedCount < this.clubs.length;
    },
    clubIdschange(){
      this.ruleForm.clubIds = [...this.NSQzall_checked,...this.NSCluball_checked];
    },
    imageSuccessCBK(val) {
      const _this = this
      window.tinymce.get(_this.id).insertContent(` <a href="${val.href}" target="_blank">${val.name}</a> `)
    
    },
  }
};
</script>
<style lang="less">
// .wrapper /deep/ .el-checkbox__label{
//   width: 100px;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
// .wrapper /deep/ .notifyCheckbox{
//   display: flex;
//   align-items: center;
// }
// .mce-panel{width: 99% !important;}
.notifybab .el-tabs__header{display:inline-block;}
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}
.greyline{border:0;border-top:1px solid #979797;}
.upload-wrapper{
  position: absolute;
  right: 2px;
  top: 0;
}

.notifyCheckbox{margin-left: 0 !important;margin-right: 30px;}
</style>
