<template>
  <div class="gameadd-wrapper">
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >{{ruleForm.id === undefined ? '赛事添加' : (viewtype === undefined ? '赛事编辑' : '竞赛规程')}}</label>
        </div>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="12">
            <el-form-item  label="赛事名称" prop="matchName">
              <el-input v-model="ruleForm.matchName" :disabled="viewtype !== undefined"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="项目类型" prop="matchProject" >
                <el-select v-model="ruleForm.matchProject" placeholder="请选择项目" :disabled="viewtype !== undefined">
                  <el-option v-for="(item,index) in itemIds" :key="index" :label="item.itemName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="12">
            <el-form-item  label="是否允许外援" prop="foreignAidFlag">
              <el-select v-model="ruleForm.foreignAidFlag" :disabled="viewtype !== undefined"  placeholder="请选择">
                <el-option
                  v-for="(foreign,index) in foreignlist"
                  :key="index"
                  :label="foreign.label"
                  :value="foreign.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="参赛级别" prop="matchLevel">
              <el-select v-model="ruleForm.matchLevel" placeholder="请选择" :disabled="viewtype !== undefined">
                <el-option
                  v-for="item in levelOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="12">
            <el-form-item  label="俱乐部数限制" prop="clubLimit">
              <el-input v-model="ruleForm.clubLimit" :disabled="viewtype !== undefined" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="(每组)可报名人数" prop="groupMaxNumber" >
              <div class="enroll-number">
                <el-input v-model="ruleForm.groupMinNumber" :disabled="viewtype !== undefined" type="number"></el-input>
                <span style='padding:0 5px;'>~</span>
                <el-input v-model="ruleForm.groupMaxNumber" :disabled="viewtype !== undefined" type="number"></el-input>
                <span style='padding:0 5px;'>人</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="12">
            <el-form-item  label="运动员报名是否可兼项" prop="partTime">
              <el-select v-model="ruleForm.partTime" :disabled="viewtype !== undefined"  placeholder="请选择">
                <el-option
                  v-for="(foreign,index) in partTimes"
                  :key="index"
                  :label="foreign.label"
                  :value="foreign.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="24">
            <el-form-item  label="组别" prop="group">
              <div class="group">
                <div v-for="(item,index) in ruleForm.group" :key="index">
                  <span>{{item}}</span><span @click="del(index)" class="del" v-if="viewtype != 'view'">x</span>
                </div>
                <div @click="open3" class="pointer" v-if="viewtype != 'view'">+组别</div>
                <el-input style="display:none;" v-model="groupFlag"></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="12">
            <el-form-item  label="报名时间" prop="enrollTime">
              <div class="enroll-number">
                <el-form-item class="flex-1" prop="enrollStartTime">
                  <el-date-picker
                style="width:100%;"
                  :disabled="viewtype !== undefined"
                  v-model="ruleForm.enrollStartTime"
                  type="date"
                  placeholder="报名开始日期"
                  value-format="yyyy-MM-dd"
                  >
              </el-date-picker>
                </el-form-item >
              <span>~</span>
              <el-form-item class="flex-1" prop="enrollEndTime">
                <el-date-picker
                  style="width:100%;"
                  :disabled="viewtype !== undefined"
                  v-model="ruleForm.enrollEndTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="报名结束日期"
                  :picker-options="pickerOptions0"
                  >
              </el-date-picker>
              </el-form-item>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="比赛时间" prop="matchTime">
              <div class="enroll-number">
                <el-form-item class="flex-1">

                <el-date-picker
                  v-model="ruleForm.matchStartTime"
                  :disabled="viewtype !== undefined"
                  type="date"
                  style="width:100%;"
                  placeholder="比赛开始日期"
                  value-format="yyyy-MM-dd"
                  >
              </el-date-picker>
                </el-form-item>
              <span>~</span>
              <el-form-item class="flex-1">

              <el-date-picker
                  v-model="ruleForm.matchEndTime"
                  :disabled="viewtype !== undefined"
                  type="date"
                  style="width:100%;"
                  value-format="yyyy-MM-dd"
                  placeholder="比赛结束日期"
                  >
              </el-date-picker>
              </el-form-item>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="24">
            <el-form-item  label="裁判类别" prop="refereeTypeId">
              <el-select v-model="ruleForm.refereeTypeId" placeholder="请选择裁判类别" @change='refereetypechange' :disabled="viewtype !== undefined">
                <el-option
                  v-for="(refereet,index) in refereetplist"
                  :key="index"
                  :label="refereet.typeName"
                  :value="refereet.typeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58" v-if="viewtype ===  undefined">
          <el-col :span="24">
            <el-form-item  label="裁判" prop="refereeId">
              <el-select
                filterable 
                :disabled="viewtype !== undefined"
                v-model="ruleForm.refereeId"
                multiple
                style="width:100%;"
                placeholder="请选择裁判">
                <el-option
                  v-for="(role,index) in roleoptions"
                  :key="index"
                  :label="role.refereeName"
                  :value="role.refereeId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col>
            <div v-html="ruleForm.matchSchedule" v-if="viewtype !== undefined">
            </div>
          </el-col>
        </el-row> -->
        <el-row >
          <div v-html="ruleForm.matchSchedule" v-if="viewtype !== undefined" class="matchschedule">
          </div>
          <el-form-item  label="比赛规则" prop="matchSchedule" v-if="viewtype ===  undefined">
            <div class="editor-wrapper" v-if="viewtype !=='view'">
              <Editor   :id="id" v-model="ruleForm.matchSchedule" :init="editorInit"></Editor>
              <div class="upload-wrapper">
                <upload-file @successCBK="imageSuccessCBK"></upload-file>
              </div>
            </div>
          </el-form-item>
        </el-row>
        <el-row type="flex"  justify="center"  class="commit-wrapper">
          <el-button v-if="viewtype !='view'" class="savebtn" type="primary" size="medium" @click="submitForm('ruleForm')">保存</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'
import {pictUpload,pubapiUrl} from 'api/config.js'
import validators from '@/assets/js/validate.js';
import {userAdd,userEdit,getRoles,getRolesSel} from 'api/systemUser.js'
import store from '@/store'
import {getRefereeDrop,addOrModifyMatch,getMatchDetail} from 'api/game.js'
import {getList,getItemDrop,getRefereeTypeDrop} from 'api/common.js'
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
    let validgroupnum=(rule, value, callback) => {
      if (this.ruleForm.groupMinNumber !== '' && this.ruleForm.groupMinNumber <= 0) {
        callback(new Error('可报名人数必须为正整数'));
      }else if (this.ruleForm.groupMaxNumber !== '' && this.ruleForm.groupMaxNumber <= 0) {
        callback(new Error('可报名人数必须为正整数'));
      }else if(this.ruleForm.groupMinNumber !== '' && this.ruleForm.groupMaxNumber !== '' && parseInt(this.ruleForm.groupMinNumber) > parseInt(this.ruleForm.groupMaxNumber)){
        callback(new Error('每组最小人数不能多余最大人数'));
      }else if(this.ruleForm.groupMinNumber.length > 5 || this.ruleForm.groupMaxNumber.length > 5){
        callback(new Error('最大长度为5'));
      } else {
        callback();
      }
    };
    let validenrolltime =(rule, value, callback) => {
      if (this.ruleForm.enrollStartTime === '') {
        callback(new Error('请选择报名开始日期'));
      }else if (this.ruleForm.enrollEndTime === '') {
        callback(new Error('请选择报名结束日期'));
      }else if(this.time2unix(this.ruleForm.enrollStartTime)>this.time2unix(this.ruleForm.enrollEndTime)){
        callback(new Error('报名开始日期不能晚于结束日期'));
      } else {
        callback();
      }
    };
    let validmatchtime =(rule, value, callback) => {
      if (this.ruleForm.matchStartTime === '') {
        callback(new Error('请选择比赛开始日期'));
      }else if (this.ruleForm.matchEndTime === '') {
        callback(new Error('请选择比赛结束日期'));
      }else if(this.time2unix(this.ruleForm.matchStartTime)>this.time2unix(this.ruleForm.matchEndTime)){
        callback(new Error('比赛开始日期不能晚于结束日期'));
      }else if(this.time2unix(this.ruleForm.matchStartTime)<this.time2unix(this.ruleForm.enrollEndTime)){
        callback(new Error('比赛开始时间大于报名结束时间'));
      }else {
        callback();
      }
    };
    return {
      roleoptions:[],
      refereetplist:[],
      viewtype:'',
      id:'tinymce',
      isDis:true,
      partTime:'',
      pictUpload:pictUpload,
      partTimes:[{label:'是', value:1}, {label:'否', value:0}],
      ruleForm: {
        id:'',
        
        matchName:'',
        matchType:'1',
        clubLimit:'',
        matchSchedule:"",
        refereeId:[],
        refereeTypeId:'',
        matchProject:'',
        matchLevel:"",
        groupMinNumber:'',
        groupMaxNumber:'',
        foreignAidFlag:'',
        enrollStartTime:'',
        enrollTime:"",
        matchTime:"",
        enrollEndTime:'',
        matchStartTime:'',
        matchEndTime:'',
        group:[]
      },
      groups:[],
      foreignlist:[],
      accept:['image/jpeg','image/png'],
      levelOptions:[],
      itemIds:[],
      rules:{
        matchName: [
          { required: true, message: '请输入赛事名称', trigger: 'blur' },
          { max: 20, message: '最大长度为20', trigger: 'blur' }
        ],
        refereeTypeId: [
          { required: true, message: '请选择裁判类别', trigger: 'change' }
        ],
        refereeId: [
          { required: true, message: '请选择裁判', trigger: 'change' }
        ],
        groupMaxNumber: [
          {validator: validgroupnum,trigger:'blur'}
        ],
        enrollTime: [
          {validator: validenrolltime,required:true,trigger:'blur'}
        ],
        matchTime: [
          {validator: validmatchtime,required:true,trigger:'blur'}
        ],
        matchProject: [
          { required: true, message: '请选择项目', trigger: 'change' }
        ],
        group: [
          { required: true, message: '请输入组别', trigger: 'change' }
        ],
        foreignAidFlag: [
          { required: true, message: '请选择是否允许外援', trigger: 'change' }
        ],
        partTime: [
          { required: true, message: '请选择运动员报名是否可兼项', trigger: 'change' }
        ],
        matchLevel: [
          { required: true, message: '请选择级别', trigger: 'change' }
        ],
        clubLimit:[{validator:validators.clubNumbers,required:true,trigger:'blur'}],
        matchSchedule: [
          { required: true, message: '请输入比赛规则', trigger: 'blur' },
        ],
      },
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
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  components: {
    Editor,
    uploadFile
  },
  computed:{
    enrollFlag(){
      if(!this.ruleForm.enrollStartTime||!this.ruleForm.enrollEndTime){
        return false
      }else{
        return true
      }
    },
    groupFlag(){
      if(this.ruleForm.group.length==0){
        return ''
      }else{
        return 'aadd'
      }
    },
    matchFlag(){
      if(!this.ruleForm.matchStartTime||!this.ruleForm.matchEndTime){
        return false
      }else{
        return true
      }
    },
  },
  watch:{
    'ruleForm.refereeTypeId'(){
      this.rolelist()
    },
    'enrollFlag'(val){
      if(val){
        this.$refs.ruleForm.clearValidate(['enrollTime'])
        this.ruleForm.enrollTime='eew'
      }
    },
    'matchFlag'(val){
      if(val){
        this.$refs.ruleForm.clearValidate(['matchTime'])
        this.ruleForm.matchTime='eew'

      }
    }
  },
  mounted(){
    this.ruleForm.id = this.$route.query.id;
    this.getItemId(1)
    this.rolelist()
    tinymce.init({});
    this.viewtype = this.$route.query.type;
    if(this.ruleForm.id !== undefined){
      this.queryInit();
    }
    getList('YesNo').then(res=>{
      this.foreignlist = res.data
      console.log(this.foreignlist)
    })
    getList('ClubLevel').then(res=>{
      if(res.code == 200){
        this.levelOptions = res.data
      }
    })
    getRefereeTypeDrop().then(res=>{
      this.refereetplist = res.data;
    })
  },
  created(){
    let self = this;
  },
  methods: {
    refereetypechange(){
      // 裁判类别更改
      // 项目类型变化，清空裁判选项
      this.ruleForm.refereeId = [];
    },
    time2unix(_str){
      var date = new Date(_str);
      var time1 = date.getTime();
      return time1;
    },
    queryInit(){

      getMatchDetail(this.$route.query.id).then(res=>{
        this.ruleForm=res.data
        this.ruleForm.id=this.$route.query.id

      })
    },
    back(){
      this.$router.go(-1)
    },
    del(val){
      this.ruleForm.group.splice(val,1)
    },
    del2(val){
      this.ruleForm.refereeId.splice(val,1)
    },
    open3() {
      this.$prompt('请输入组别', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator:(val)=>{
          if(!val) return false
        },
        inputErrorMessage: '请输入组别'
      }).then(({ value }) => {
        if(value.length > 50){
          this.$message({
            type: 'warning',
            message: '组别长度不超过50'
          }); 
        }else{
          this.ruleForm.group.unshift(value)
        }
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });       
      });
    },
    
    // 获取比赛项目下拉
    getItemId(type){
      getItemDrop(type).then(res=>{
        this.itemIds=res.data
      })
    },
    //提交信息
    submitForm() {
      let self = this;
      self.$refs['ruleForm'].validate(valid => {
        if(valid && this.ruleForm.id === undefined){
          // 添加
          addOrModifyMatch(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'game-manage'})
          })
        }else if(valid && this.ruleForm.id !== undefined){
          // 编辑
          addOrModifyMatch(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'game-manage'})
          })
        }
      })
    },
    imageSuccessCBK(val) {
      const _this = this
      window.tinymce.get(_this.id).insertContent(` <a href="${val.href}" target="_blank" >${val.name}</a> `)
    
    },
    rolelist(){
      getRefereeDrop({itemId:this.ruleForm.refereeTypeId}).then(res=>{
        // console.log(res)
        this.roleoptions = res.data;
      })
    },
    detailGet(){
      // 获取比赛项目修改信息
      getItem({id:this.ruleForm.id}).then(res=>{
        let newres = res.data;
        for (let i in newres) {
          if (typeof (newres[i]) === 'number' && (i !== 'id' && i !== 'type')) {
            newres[i] = newres[i] === 0 ? true : false
          } else if ( i === 'type'){
            newres[i] = String(newres[i])
          }
        }
        this.ruleForm = newres;
      })
    }
  }
};
</script>
<style lang="less">
// .mce-top-part{
//   display: none !important;
// }
.gameadd-wrapper  .el-select{
  width: 100%;
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
.gameadd-wrapper .group{
  border: 1px solid gainsboro;
  min-height: 45px;
  height: auto;
  display: flex;
  flex-wrap:wrap;
  align-items: center;
  div{
    width:auto;
    // width: 70px;
    height: 22px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid gainsboro;
    font-size: 12px;
    color: rgba(102, 102, 102, 1);
    line-height: 22px;
    text-align: center;
    margin: 5px 5px;
    .del{
      margin:5px 0;
      padding:0 5px;
      line-height: 18px;
      position: relative;
      top:-2px;
      display: inline-block;
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
.matchschedule{padding:20px 0;
  img{max-width: 100%;}
}
</style>
