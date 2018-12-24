<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="01 填写裁判员信息" name="first">
        <el-form ref="judgeForm2" :model="judgeForm2" :rules="judgeForm2Rules"  :inline-message="true" label-width="80px" label-position='top' :inline="true">
          <div class="row">
            <el-form-item prop="email" class="col-6" label="邮箱">
              <el-input v-model="judgeForm2.email"></el-input>
            </el-form-item>
            <el-form-item class="col-6" prop="refereeName" label="姓名">
              <el-input v-model="judgeForm2.refereeName"></el-input>
            </el-form-item>
          </div>
          <div class="row percent100">
            <el-form-item class="col-6" prop="sex" label="性别">
              <el-select  v-model="judgeForm2.sex" placeholder="请选择性别">
                <el-option v-for="(sex,index) in SexList" :key="index" :label="sex.label" :value="sex.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-6" prop="idCardNo" label="身份证号码">
              <el-input v-model="judgeForm2.idCardNo"></el-input>
            </el-form-item>
          </div>
          <div class="row percent100">
            <el-form-item class="col-6" prop="age" label="年龄">
              <el-input v-model="judgeForm2.age"></el-input>
            </el-form-item>
            <el-form-item class="col-6" prop="eduBackground" label="学历">
              <el-select v-model="judgeForm2.eduBackground" placeholder="请选择学历">
                <el-option v-for="(educa,index) in EducationList" :key="index" :label="educa.label" :value="educa.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="row percent100">
            <el-form-item class="col-6" prop="duty" label="职务">
              <el-input v-model="judgeForm2.duty"></el-input>
            </el-form-item>
            <el-form-item class="col-6" prop="department" label="所在单位">
              <el-input v-model="judgeForm2.department"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item prop="wechat" class="col-6" label="微信(选填)">
              <el-input v-model="judgeForm2.wechat"></el-input>
            </el-form-item>
            <el-form-item class="col-6" prop="phone" label="联系电话">
              <el-input v-model="judgeForm2.phone"></el-input>
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item prop="address" class="col-12" label="地址(选填)">
              <el-input v-model="judgeForm2.address"></el-input>
            </el-form-item>
          </div>

          
          <div class="row flex-3" v-for="(item,index) in judgeForm2.certList" :key="index" >
            <el-form-item class="col-4" label="类别" :prop="`certList[${index}].itemId`" :rules="{
              required: true, message: '请选择类别', trigger: 'change'}">
              <el-select v-model="item.itemId" placeholder="请选择类别">
                <el-option v-for="(item,index) in refereeItemIds" :key="index" :label="item.typeName" :value="item.typeId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-4" label="级别" :prop="`certList[${index}].level`" :rules="{
              required: true, message: '请选择级别', trigger: 'change'}">
              <el-select v-model="item.level" placeholder="请选择级别">
                <el-option v-for="(projlev,index) in projlevelList" :key="index" :label="projlev.label" :value="projlev.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-4 listtimesel" label="获证时间" :prop="`certList[${index}].certTime`" :rules="{
              required: true, message: '请选择日期', trigger: 'change'}">
              <el-date-picker
                v-model="item.certTime"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="el-col-8 listimgsel" label="上传资质" :prop="`certList[${index}].certimglist`">
              <el-upload
                :action="pictUpload"
                list-type="picture-card"
                :limit='2'
                :data='{"index":index}'
                @click.native='listindexchange(index)'
                :file-list='judgeForm2.certList[index].certimglist'
                :on-success='imageChange'
                :on-preview="handlePictureCardPreview"
                :on-exceed="handleExceed"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog  :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <span class="minusSpan pointer" @click="removeList(index)"><i class="minusi">删除</i></span>
          </div>
          <div class="row flex-3" style="justify-content: flex-end;"><span class="pointer" @click="addList"><i class="addusi minusi">添加</i></span></div>
          <div class="row next-btn">
            <el-form-item>
              <!-- <el-button type="primary" size="medium" @click="onSubmit(['judgeForm2'])">提交</el-button> -->
              <el-button type="primary" size="medium" @click="next">下一步</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="02 设置密码" name="second">
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
              <el-button type="primary" size="medium" @click="onSubmit(['judgeForm2','clubForm3'])">提交注册</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import validators from '@/assets/js/validate.js'
import {jungeRegist} from 'api/login.js'
import {pictUpload} from 'api/config.js'
import {getList,getRefereeTypeDrop} from 'api/common';import {} from 'api/common.js'
export default {
  name:'JudgeForm',
  props:{
    data:{
      type:Object

    },
    judgeFlag:{
      type:Boolean
    },
    itemIds:{},

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
      refereeItemIds:[],
      pictUpload:pictUpload,
      judgeForm2: {
        sex:'',
        refereeName:'',
        age:'',
        idCardNo:'',
        eduBackground:'',
        department:'',
        duty:'',
        phone:'',
        wechat:'',
        address:'',
        email:'',
        certList: [{
            itemId: '',
            level:'',
            certTime:'',
            certimglist:[],
            cert1:'',
            cert2:'',
        }],
      },
      judgeForm2Rules:{
        sex:[{required:true,message:'请选择性别',trigger: 'change'}],
        refereeName:[{required:true,message:'请输入姓名',trigger: 'change'},{min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'change'}],
        eduBackground:[{required:true,message:'请选择学历',trigger: 'change'}],
        department:[{required:true,message:'请填写单位',trigger: 'change'},{min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'change'}],
        duty:[
          // {required:true,message:'请填写职务',trigger: 'change'},
          {min: 0, max: 10, message: '长度在 0 到 10 个字符', trigger: 'change'}
        ],
        idCardNo:[{validator:validators.card,required:true,trigger:'change'}],
        age:[{validator:validators.age,required:true,trigger: 'change'}],
        phone:[{validator:validators.phone,required:true,trigger:'change'}],
        wechat:[{min: 0, max: 20, message: '长度在 0 到 20 个字符', trigger: 'change'}],
        address:[{min: 0, max: 50, message: '长度在 0 到 50 个字符', trigger: 'change'}],
        email:[{required:true,message:'请输入邮箱',trigger: 'change'},{validator:validators.email,trigger: 'change'},{min: 0, max: 30, message: '长度在 0 到 30 个字符', trigger: 'change'}],
      },
      clubForm3:{
        password:'',
        surePwd:''
      },
      clubForm3Rules:{
        password:[{required:true,validator:pwd,trigger:'change'}],
        surePwd:[{required:true,validator:surePwd,trigger:'change'}]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      EducationList:[],
      SexList:[],
      projlevelList:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      certlistindex:0
    };
  },
  mounted(){
    this.getEducationList()
    this.getItemId()
  },
  methods: {
    getItemId(type){
      getRefereeTypeDrop(type).then(res=>{
        this.refereeItemIds=res.data
      })
    },
    onSubmit(arr) {
      // this.$router.push({name:'SignInSuc',query:{'type':'judge'}})
      let count=0
      this.$emit('submitjudge')
      arr.map(item=>{
        // console.log()
        this.$refs[item].validate(valid=>{
          if(valid){
            count++
          }else{
            return false
          }
        })

      })

      let typeidlist = [];
      for(let i in this.judgeForm2.certList){
        if(this.judgeForm2.certList[i].certimglist.length > 0){
          if(this.judgeForm2.certList[i].certimglist.length === 2){
            this.judgeForm2.certList[i].cert1 = this.judgeForm2.certList[i].certimglist[0].response.data
            this.judgeForm2.certList[i].cert2 = this.judgeForm2.certList[i].certimglist[1].response.data
          }else{
            this.judgeForm2.certList[i].cert1 = this.judgeForm2.certList[i].certimglist[0].response.data
            this.judgeForm2.certList[i].cert2 = ''
          }
        }
        if(typeidlist.indexOf(this.judgeForm2.certList[i].itemId) === -1){
          typeidlist.push(this.judgeForm2.certList[i].itemId);
        }else{
          this.$message({
            message: '类别重复！',
            type: 'warning'
          })
          return false;
        }
      }

      this.$watch('judgeFlag',(val)=>{
        if(count===2 && val){
          this.$emit('reset')
          jungeRegist({...this.judgeForm2,...this.data,...this.clubForm3}).then(res=>{
            this.$router.push({name:'SignInSuc',query:{'type':'judge'}})
          })
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    addList(){
      this.judgeForm2.certList.push({
          itemId: '',
          level:'',
          certTime:'',
          certimglist:[],
          cert1:'',
          cert2:'',
      });
    },
    removeList(item) {
      if(this.judgeForm2.certList.length==1){
        this.$message({
          type: 'warning',
          message: '请至少维护一个类别！'
        });
        return
      }
      this.judgeForm2.certList.splice(item, 1)
    },
    getEducationList() {
      getList("Education").then(res=>{
        this.EducationList=res.data;
      })
      getList("Sex").then(res=>{
        this.SexList=res.data;
      })
      getList("ProjectLevel").then(res=>{
        this.projlevelList=res.data;
      })
    },
    imageChange(response, file, fileList){
      console.log(fileList)
      // console.log(this.judgeForm.certList)
      setTimeout(() => {
        this.judgeForm2.certList[this.certlistindex].certimglist = fileList;
      }, 10);
      
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file, fileList) {
      // console.log(fileList)
      // this.judgeForm.certList[this.certlistindex].certimglist = fileList;
      setTimeout(() => {
        this.judgeForm2.certList[this.certlistindex].certimglist = fileList;
      }, 10);
      // console.log(this.judgeForm.certList[0].certimglist)
      // let qualifyFiles = fileList.map(val=> val.url)
      // this.judgeForm.qualifyFiles = qualifyFiles;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    listindexchange(index) {
      // console.log(index)
      this.certlistindex = index;
    },
    next(){
      this.$refs['judgeForm2'].validate(valid => {
        if(valid){
          this.activeName='second'
        }
      })
    },
  }
};
</script>
<style lang="less" scoped>
// .el-select
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
.percent100 /deep/ .el-select{
  width: 100%;
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
.flex-3{
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  .col-4{
    flex:1;
  }
  .el-select{
    width: 100%;
  }
  .el-date-editor{
    width: 100%;
  }
}
.next-btn{
  justify-content: center;
  button{
    width: 250px;
  }
}
.minusi{width: 40px;height: 28px;display: inline-block;font-style: normal;box-sizing: border-box;cursor: pointer;
line-height: 28px;text-align: center;color: #F10000;font-size: 16px;
}
.addusi{color:#006DB3;border-color: #006DB3;margin-top: 15px;}
.minusSpan{position: relative;
  .minusi{position: relative;top:46px;}

}
  .pointer{
    cursor: pointer;
  }


</style>
