<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="01填写俱乐部信息" name="first">
        <el-form ref="clubForm2" :validate-on-rule-change="false" :inline-message="true" :model="clubForm2" :rules="clubForm2Rules" label-width="80px" label-position='top' :inline="true">
          <div class="row">
            <el-form-item class="col-6" label="邮箱(用户名)" prop="email">
              <el-input v-model="clubForm2.email"></el-input>
            </el-form-item>
            <el-form-item class="col-6" label="俱乐部名" prop="clubName">
              <el-input v-model="clubForm2.clubName"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item class="col-6" label="领队姓名" prop="leaderName">
              <el-input v-model="clubForm2.leaderName"></el-input>
            </el-form-item>
            <el-form-item class="col-6" label="联系电话" prop="phone">
              <el-input v-model="clubForm2.phone"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item class="col-6" label="身份证号码/护照" prop="idCardNo">
              <el-input v-model="clubForm2.idCardNo"></el-input>
            </el-form-item>
            <el-form-item class="col-6" label="联系地址" prop="address">
              <el-input v-model="clubForm2.address"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item class="col-6" label="赞助商(选填)" prop="sponsor">
              <el-input v-model="clubForm2.sponsor"></el-input>
            </el-form-item>
            <el-form-item class="col-6" label="教练员" prop="coach">
              <el-input  v-model="clubForm2.coach"></el-input>
            </el-form-item>
          </div>
          <div class="row" v-if="clubType==1">
            <el-form-item class="col-6" label="级别" prop="level">
              <el-select v-model="clubForm2.level" placeholder="请选择级别">
                <el-option v-for="item in levelList" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
            </el-form-item>

          </div>
          <div class="row">

            <el-form-item class="col-12" label="备注" prop="remark">
              <el-input v-model="clubForm2.remark" type="textarea"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item ref="qualifyFiles"  label="其他资质" prop="qualifyFiles">
              <el-upload
                :action="pictUpload"
                list-type="picture-card"
                :file-list="qualifyFiles"
                :on-success="fileListSuccess"
                :on-preview="handlePictureCardPreview"
                :before-upload="beforeQualifyFiles"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" >
                <img :temimg="clubForm2.qualifyFiles" width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
          </div>
          <p class="registTip">注册须知：{{registerTip}}</p>
          <div class="row next-btn">
            <el-form-item>
              <el-button type="primary" @click="next" size="medium" >下一步</el-button>
            </el-form-item>
          </div>
        </el-form>

      </el-tab-pane>
      <el-tab-pane label="02设置密码" name="second">
        <el-form :model='clubForm3' :rules="clubForm3Rules" ref="clubForm3">
          <div class="row">

            <el-form-item class="col-12" prop="password" label="密码(请输入6~18位数字,字母或常用字符,字母区分大小写)">
              <br /><el-input type="password"  class="col-6" v-model="clubForm3.password"></el-input>
            </el-form-item>
          </div>
          <div class="row">

            <el-form-item class="col-12" prop="surePwd" label="确认密码"><br />
              <el-input type="password"  class="col-6" v-model="clubForm3.surePwd"></el-input>
            </el-form-item>
          </div>
          <div class="row next-btn">
            <el-form-item>
              <el-button type="primary" size="medium" @click="onSubmit(['clubForm2','clubForm3'])">提交注册</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {getList,getparameter} from 'api/common.js'
import {pictUpload} from 'api/config.js'
import {siginIn} from 'api/login.js'
import validators from '@/assets/js/validate.js'
export default {
  name:'ClubForm',
  props:{
    clubType:'',
    data:{
      type:Object

    },
    clubFlag:{
      type:Boolean
    }
  },
  data() {
    let pwd=(rule, value, callback) => {
      let reg=/^[a-zA-Z0-9]\w{5,17}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(!reg.test(value)){
        callback(new Error('请输入正确格式密码'))
      }else {
        if (this.clubForm3.surePwd !== '') {
          this.$refs.clubForm3.validateField('surePwd');
        }
        callback();
      }

    };
    let surePwd=(rule, value, callback) => {
      // console.log(value,this.clubForm3.password)
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.clubForm3.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      clubForm2: {
          email:'',
          clubName:'',
          leaderName:'',
          phone:'',
          idCardNo:'',
          address:'',
          sponsor:'',
          coach:'',
          level:'',
          remark:'',
          qualifyFiles:[]
      },
      qualifyFiles:[],
      clubForm3:{
        password:'',
        surePwd:''
      },
      clubForm3Rules:{
        password:[{required:true,validator:pwd,trigger:'change'}],
        surePwd:[{required:true,validator:surePwd,trigger:'change'}]
      },
      levelList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      pictUpload:pictUpload,
      clubForm2Rules:{
        email:[
          {required:true,message:'请输入邮箱(用户名)',trigger: 'change'},
          {validator:validators.email,trigger: 'change'},
          {min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}],
        clubName:[{required:true,message:'请输入俱乐部名',trigger: 'change'},{min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'blur'}],
        leaderName:[{required:true,message:'请输入领队姓名',trigger: 'change'},{min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}],
        address:[{required:true,message:'请输入联系地址',trigger: 'change'},{min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}],
        coach:[{required:true,message:'请输入教练',trigger: 'change'},{min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}],
        level:[{required:true,message:'请输入级别',trigger: 'change'}],
        phone:[{validator:validators.phone,required:true,trigger:'change'}],
        idCardNo:[{validator:validators.carId,required:true,trigger:'change'},{min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'blur'}],
        sponsor:[{min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}],
        remark:[{min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur'}]
      },
      registerTip:''
    };
  },
  methods: {
    //获取级别数据
    getLevelList(){
      getList('ClubLevel').then(res=>{
        this.levelList=res.data
      })
      getparameter('REGISTER_NOTE').then(res=>{
        this.registerTip=res.data
      })
    },
    handleClick(tab, event) {
    },
    onSubmit(arr) {
      let count=0
      this.$emit('submit')
      arr.map(item=>{
        this.$refs[item].validate(valid=>{
          if(valid){
            count++
          }else{
            return false
          }
        })
      })

      // console.log({...this.clubForm2,...this.data,...this.clubForm3})
      this.$watch('clubFlag',(val)=>{
        if(count==2 && val){
          this.$emit('reset');
          let newregistval = {...this.clubForm2,...this.data,...this.clubForm3};
          // 区镇时  项目跟级别值为空
          if(newregistval.type === 2 ){
            newregistval.itemId = '';
            newregistval.level = '';
          }
          siginIn(newregistval).then(res=>{
            this.$router.push({name:'SignInSuc',query:{'type':'club'}})
          })
        }
      })


    },
    handleRemove(file, fileList) {
        let qualifyFiles = fileList.map(val=> val.response.data)
        this.clubForm2.qualifyFiles = qualifyFiles;
    },
    fileListSuccess(response, file, fileList){
      if(fileList){
        this.$refs.clubForm2.clearValidate(['qualifyFiles'])
        this.clubForm2.qualifyFiles=fileList.map(item=>{
        return item.response.data
        })
      }
    },
    beforeQualifyFiles(files){
      if(files.type.substring(0,files.type.indexOf("/")) != 'image'){
        this.$message.error("资质文件只能上传图片！");
        return false;
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    next(){
      this.$refs['clubForm2'].validate(valid => {
        if(valid){
          this.activeName='second'
        }
      })
    }

  },
  watch:{
    clubType(val){
      if(val==1){
        this.clubForm2Rules={...this.clubForm2Rules,level:[{required:true,message:'请输入级别',trigger: 'change'}]}
      }else{
        if('level' in this.clubForm2Rules){
          // delete this.clubForm2Rules.level
          this.$delete(this.clubForm2Rules,'level')
        }
      }
    },
    'clubForm2.idCardNo'(val){
      let reg = validators.ksidCardNoreg();
      if(!reg.test(val)){
        this.clubForm2Rules={...this.clubForm2Rules,qualifyFiles:[{required:true,message:'请上传资质',trigger:'change'}]}
      }else{
        if('qualifyFiles' in this.clubForm2Rules){
          this.$delete(this.clubForm2Rules,'qualifyFiles')
        }
        this.$refs.clubForm2.clearValidate(['qualifyFiles'])
      }
    }
  },
  mounted(){
    this.getLevelList()
  }
};
</script>
<style lang="less" scoped>
.wrapper /deep/ .el-tabs__item{
  background: transparent !important;
  color: black !important;
  width: 50%;
}
.wrapper /deep/ .el-tabs__content{
  width: 100% !important;
}
.wrapper /deep/ .el-tabs__active-bar{
  width: 50%;
}
.wrapper /deep/ .el-tabs{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.wrapper /deep/ .el-tabs__header{
  width: 100% !important;
}
.wrapper /deep/ .el-tabs__nav-wrap,.wrapper /deep/ .el-tabs__nav-scroll,.wrapper /deep/ .el-tabs__nav{
  width: 100%;
}
.row /deep/ .el-form-item__label{
  padding: 0;
}
.row{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  .col-6{
    width: 45%;
    margin-right: 0;
    margin-bottom: 0;
  }
  .col-12{
    width: 100%;
  }
}
.next-btn{
  justify-content: center;
  button{
    width: 250px;
  }
}
.el-select{
  width: 100%;
}
.registTip{
  height: 25px;
  line-height: 25px;
  color: rgba(255, 0, 0, 1);
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
</style>
