<template>
  <div>
    <el-form :model='judgeForm' ref="judgeForm" :rules="judgeFormRules" label-position="top"  :inline-message="true">
      <el-row >
        <el-col :span="8" class="left">
          <div class="title">
            <img v-if="cmFrom !== 'judge'" class="back" @click="back" src="../../assets/img/back.png" alt="">
            <span>{{cmFrom !== 'judge' ? '裁判员信息' : '个人信息'}}</span>
          </div>
          <div class="avatar-wrapper top">
            <el-form-item prop="refereeUrl">
              <el-upload
                class="avatar-uploader personimg"
                :disabled="viewtype !== undefined"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleLogoSuccess"
                :before-upload="beforeLogoUpload">
                <img v-if="judgeForm.refereeUrl" :src="judgeForm.refereeUrl" class="avatar">
                <img v-if="!judgeForm.refereeUrl" src="../../assets/img/web_jlblogo.png" class="logo-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-15px;">个人照片<label v-if="viewtype === undefined">（295*413）</label></span>
          </div>
          <div class="idcard-wrapper top" v-if="cmFrom !== 'judgeM'">
            <el-form-item prop="idCardUrl">
              <el-upload
                :disabled="viewtype !== undefined"
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="handleCardSuccess"
                :before-upload="beforeCardUpload">
                <img v-if="judgeForm.idCardUrl" :src="judgeForm.idCardUrl" class="avatar">
                <img v-if="!judgeForm.idCardUrl" src="../../assets/img/web_sfz.png" class="card-img" alt="">
              </el-upload>
            </el-form-item>
            <span style="margin-top:-15px;">身份证照片<label v-if="viewtype === undefined">(800*505)</label></span>
          </div>
        </el-col>
        <el-col :span="16" class="right">
          <el-tabs v-model="activeName" class="judgetabc" :class="{'tabhide':judgeForm.id !== undefined}">
            <el-tab-pane label="01 填写裁判员信息" name="first">
              <el-row :gutter="58">
                <el-col :span="12">
                  <el-form-item class="col-6" label="邮箱" prop="email">
                    <el-input v-model="judgeForm.email" :disabled="viewtype !== undefined || judgeForm.id !== undefined"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="refereeName" label="姓名">
                    <el-input v-model="judgeForm.refereeName" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="58">
                <el-col :span="12">
                  <el-form-item class="col-6" prop="sex" label="性别">
                    <el-select  v-model="judgeForm.sex" placeholder="请选择性别" :disabled="viewtype !== undefined">
                      <el-option v-for="(sex,index) in SexList" :key="index" :label="sex.label" :value="sex.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="idCardNo" label="身份证号码"  v-if="cmFrom !== 'judgeM'">
                    <el-input v-model="judgeForm.idCardNo" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="wechat" label="微信(选填)"  v-if="cmFrom === 'judgeM'">
                    <el-input v-model="judgeForm.wechat" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="58">
                <el-col :span="12">
                  <el-form-item class="col-6" prop="age" label="年龄">
                    <el-input v-model="judgeForm.age" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="eduBackground" label="学历">
                    <el-select v-model="judgeForm.eduBackground" placeholder="请选择学历" :disabled="viewtype !== undefined">
                      <el-option v-for="(educa,index) in EducationList" :key="index" :label="educa.label" :value="educa.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="58">
                <el-col :span="12">
                  <el-form-item class="col-6" prop="duty" label="职务">
                    <el-input v-model="judgeForm.duty" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="department" label="所在单位">
                    <el-input v-model="judgeForm.department" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="58">
                <el-col :span="12">
                  <el-form-item class="col-6" prop="wechat" label="微信(选填)"  v-if="cmFrom !== 'judgeM'">
                    <el-input v-model="judgeForm.wechat" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="col-6" prop="phone" label="联系电话"  v-if="cmFrom !== 'judgeM'">
                    <el-input v-model="judgeForm.phone" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="58">
                <el-col :span="24">
                  <el-form-item class="col-6" prop="address" label="地址(选填)">
                    <el-input v-model="judgeForm.address" :disabled="viewtype !== undefined"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="row flex-3 judgeaddthreesel" :gutter="58" v-for="(item,index) in judgeForm.certList" :key="index">
                  <el-form-item class="el-col-4"  label="类别" :prop="`certList[${index}].itemId`" :rules="{
                    required: true, message: '请选择类别', trigger: 'change'}">
                    <el-select v-model="item.itemId" placeholder="请选择类别" :disabled="viewtype !== undefined">
                      <el-option v-for="(item,index) in itemIds" :key="index" :label="item.typeName" :value="item.typeId"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="el-col-4" label="级别" :prop="`certList[${index}].level`" :rules="{
                    required: true, message: '请选择级别', trigger: 'change'}">
                    <el-select :disabled="viewtype !== undefined" v-model="item.level" placeholder="请选择级别">
                      <el-option v-for="(projlev,index) in projlevelList" :key="index" :label="projlev.label" :value="projlev.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="el-col-6 listtimesel" label="获证时间" :prop="`certList[${index}].certTime`" :rules="{
                    required: true, message: '请选择日期', trigger: 'change'}">
                    <el-date-picker
                      :disabled="viewtype !== undefined"
                      v-model="item.certTime"
                      type="date"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-form-item>
                  <!-- {{item.certimglist.length}} -->
                  <el-form-item class="el-col-8 listimgsel" label="上传资质" :prop="`certList[${index}].certimglist`">
                    <el-upload
                      :action="uploadUrl"
                      list-type="picture-card"
                      :limit='2'
                      :data='{"index":index}'
                      :disabled="viewtype !== undefined"
                      @click.native='listindexchange(index)'
                      :file-list='judgeForm.certList[index].certimglist'
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
                <span class="minusSpan" @click="removeList(index)"><i class="minusi" v-show="(viewtype!='view') && (viewtype!='examine')">删除</i></span>
              </div>
              <div class="row flex-3" style="justify-content: flex-end;"><span  @click="addList"><i class="minusi addusi" v-show="(viewtype!='view') && (viewtype!='examine')">添加</i></span></div>
              <el-row justify="center" type="flex" class="commit-wrapper" v-if="viewtype === undefined">
                <el-col :span="8">
                  <el-form-item class="formbtnline">
                    <el-button type="primary" v-if="judgeForm.id===undefined || judgeForm.id===''" @click="next">下一步</el-button>
                    <el-button type="primary" v-if="judgeForm.id!==undefined && viewtype !== 'examine'" @click="submitForm('judgeForm')">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row justify="center" type="flex" class="commit-wrapper" :gutter="20"  v-if="viewtype === 'examine'">
                <el-col :span="8">
                  <el-form-item class="formbtnline">
                    <el-button type="primary" class="bluebtn" @click="clubApprove(2)">通过</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="formbtnline">
                    <el-button type="danger" class="redbtn" @click="refuse()">拒绝</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="02 设置密码" name="second"  v-if="judgeForm.id === undefined">
              <el-form :model='clubForm3' :rules="clubForm3Rules" ref="clubForm3"   :inline-message="true">
                <el-row :gutter="58">
                  <el-col :span="24">
                    <el-form-item class="col-12" prop="password" label="密码(请输入6~18位数字,字母或常用字符,字母区分大小写)">
                      <el-input type="password"  class="col-12" v-model="clubForm3.password"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="58">
                  <el-col :span="24">
                    <el-form-item class="col-12" prop="surePwd" label="确认密码">
                      <el-input type="password"  class="col-12" v-model="clubForm3.surePwd"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row justify="center" type="flex" class="commit-wrapper" v-if="viewtype === undefined">
                  <el-col :span="8">
                    <el-form-item class="formbtnline">
                      <el-button type="primary" size="medium" @click="onSubmit">保存</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import validators from '@/assets/js/validate.js'
import {pictUpload} from 'api/config.js'
import {getList,getRefereeTypeDrop} from 'api/common.js'
import {addReferee,getRefereeById,modifyReferee,approveReferee,modifyRefereeBySelf,getOtherRefereeById} from 'api/judge.js'

export default {
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
      id:'',
      activeName:'first',
      uploadUrl:pictUpload,
      judgeForm: {
        id:'',
        sex:'',
        refereeName:'',
        age:'',
        refereeUrl: "",
        idCardUrl: "",
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
        password:'',
        surePwd:''
      },
      certimglist:[],
      judgeFormRules:{
        refereeUrl:[{required:true,message:'请上传个人照片',trigger: 'change'}],
        idCardUrl:[{required:true,message:'请上传身份证照片',trigger: 'change'}],
        sex:[{required:true,message:'请选择性别',trigger: 'change'}],
        refereeName:[
          {required:true,message:'请输入姓名',trigger: 'change'},
          {max:20,message:'姓名最大长度为20',trigger: 'change'}
          ],
        eduBackground:[{required:true,message:'请选择学历',trigger: 'change'}],
        department:[
          {required:true,message:'请填写所在单位',trigger: 'change'},
          {max:50,message:'所在单位最大长度为50',trigger: 'change'}
          ],
        duty:[
          // {required:true,message:'请填写职务',trigger: 'change'},
          {max:10,message:'职务最大长度为10',trigger: 'change'}
          ],
        idCardNo:[{validator:validators.card,required:true,trigger:'change'}],
        age:[{validator:validators.age,required:true,trigger: 'change'}],
        phone:[{validator:validators.phone,required:true,trigger:'change'}],
        wechat:[{max:20,message:'微信最大长度为20',trigger: 'change'}],
        address:[{max:50,message:'地址最大长度为50',trigger: 'change'}],
        email:[{required:true,message:'请输入姓名',trigger: 'change'},
          {validator:validators.emailCanBeNull,trigger: 'blur' }]
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
      dialogImageUrl:'',

      foreignlist:[],
      clublist:[],
      viewtype:'',
      itemIds:[],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      certlistindex:0,
      cmFrom:''
    };
  },
  components: {},
  mounted(){
    this.mountefun()
  },
  created(){
    // setTimeout(() => {
    //   if(this.viewtype !== undefined){
    //     document.getElementsByClassName('el-tabs__header')[0].style.display='none'
    //   }
    // }, 200);
    // console.log(document.getElementsByClassName('el-tabs__header')[0].style)
  },
  methods:{
    mountefun(){
      this.getItemId()
      this.getEducationList()
      
      if(this.$route.query.refereeId !== undefined){
        this.judgeForm.id = this.$route.query.refereeId;
        this.id = this.$route.query.refereeId;
        if(this.$store.state.user.refereeId !== null){
          this.cmFrom = 'judgeM'
        }
      }else if(this.$store.state.user.refereeId !== null){
        this.cmFrom = 'judge'
        this.judgeForm.id = this.$store.state.user.refereeId
        this.id = this.$store.state.user.refereeId
      }
      // console.log(this.judgeForm.id)
      if(this.judgeForm.id === ''){
        this.judgeForm.id = undefined
      }
      this.viewtype = this.$route.query.type;
      if(this.judgeForm.id !== undefined && this.judgeForm.id !== ''){
        this.queryInit();
      }
    },
    queryInit(){
      if(this.cmFrom === 'judgeM'){
        // 获取其他裁判列表详情
        getOtherRefereeById(this.judgeForm.id).then(res=>{
          let judgeForm=res.data
          for(let i in judgeForm.certList){
            judgeForm.certList[i].certimglist = [];
            if(judgeForm.certList[i].cert1 !== ''){
              judgeForm.certList[i].certimglist.push({
                name:'cert1',
                url:judgeForm.certList[i].cert1,
                response:{data:judgeForm.certList[i].cert1}
              })
            }
            if(judgeForm.certList[i].cert2 !== ''){
              judgeForm.certList[i].certimglist.push({
                name:'cert2',
                url:judgeForm.certList[i].cert2,
                response:{data:judgeForm.certList[i].cert2}
              })
            }
          }
          this.judgeForm = judgeForm
        })
      }else{
        getRefereeById(this.judgeForm.id).then(res=>{
          let judgeForm=res.data
          for(let i in judgeForm.certList){
            judgeForm.certList[i].certimglist = [];
            if(judgeForm.certList[i].cert1 !== ''){
              judgeForm.certList[i].certimglist.push({
                name:'cert1',
                url:judgeForm.certList[i].cert1,
                response:{data:judgeForm.certList[i].cert1}
              })
            }
            if(judgeForm.certList[i].cert2 !== ''){
              judgeForm.certList[i].certimglist.push({
                name:'cert2',
                url:judgeForm.certList[i].cert2,
                response:{data:judgeForm.certList[i].cert2}
              })
            }
          }
          this.judgeForm = judgeForm
          this.judgeForm.id = this.id
        })
      }
    },
    removeList(item) {
      if(this.judgeForm.certList.length==1){
        this.$message({
          type: 'warning',
          message: '请至少维护一个类别！'
        });
        return
      }
      this.judgeForm.certList.splice(item, 1)
    },
    getEducationList(){
        getList("Education").then(res=>{
          this.EducationList=res.data
        })
        getList("Sex").then(res=>{
          this.SexList=res.data
        })
        getList("ProjectLevel").then(res=>{
          this.projlevelList=res.data
        })

    },
    // 获取比赛类别下拉
    getItemId(type){
      getRefereeTypeDrop(type).then(res=>{
        this.itemIds=res.data
      })
    },
    // club logo上传
    handleLogoSuccess(res, file) {
      this.judgeForm.refereeUrl = res.data;
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // club 身份证上传
    handleCardSuccess(res, file) {
      this.judgeForm.idCardUrl = res.data;
    },
    beforeCardUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    
    //其他资质
    handleQualifySuccess(res, file) {
      this.judgeForm.qualifyFiles.push(res.data);
    },
    clubApprove(approveStatus,reason){
      // 2-通过 3拒绝
      approveReferee({refereeId:this.judgeForm.id,approveStatus:approveStatus,reason}).then(res=>{
        this.$message({message: res.desc,type: 'success'});
        this.$router.push({name:'judge-manage'})
      })
    },
    refuse(){
      const h = this.$createElement;
      this.$prompt('请输入拒绝原因', '提示', {
        confirmButtonText: '确定',
        inputType:'textarea',
        cancelButtonText: '取消',
        inputValidator:(val=>{return (val === '' ? false : true)}),
        inputErrorMessage: '拒绝原因不能为空'
      }).then(({ value }) => {
        if(value !== null){
          this.clubApprove(3,value)
          // this.$message({
          //   type: 'success',
          //   message: '你的原因是: ' + value
          // });
        }else{
          this.$message({
            type: 'warning',
            message: '拒绝原因不能为空'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    submitForm(form){
      let typeidlist = [];
      // console.log(this.judgeForm.certList)
      for(let i in this.judgeForm.certList){
        if(this.judgeForm.certList[i].certimglist.length > 0){
          if(this.judgeForm.certList[i].certimglist.length === 2){
            this.judgeForm.certList[i].cert1 = this.judgeForm.certList[i].certimglist[0].response.data
            this.judgeForm.certList[i].cert2 = this.judgeForm.certList[i].certimglist[1].response.data
          }else{
            this.judgeForm.certList[i].cert1 = this.judgeForm.certList[i].certimglist[0].response.data
            this.judgeForm.certList[i].cert2 = ''
          }
        }
        if(typeidlist.indexOf(this.judgeForm.certList[i].itemId) === -1){
          typeidlist.push(this.judgeForm.certList[i].itemId);
        }else{
          this.$message({
            message: '类别重复！',
            type: 'warning'
          })
          return false;
        }
      }
      if(this.judgeForm.id!==undefined){
        //编辑
        this.$refs['judgeForm'].validate(valid => {
          if(valid){
            if(this.cmFrom !== 'judge'){
              // 管理员后台保存裁判直接报错
              modifyReferee(this.judgeForm).then(res=>{
                this.$message({message: res.desc,type: 'success'});
                this.$router.push({name:'judge-manage'})
              })
            }else{
              // 裁判后台保存个人信息给出提示
              this.$confirm('个人信息修改需要审核，保存后将退出系统并等待审核，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                modifyRefereeBySelf(this.judgeForm).then(res=>{
                  this.$message({message: res.desc,type: 'success'});
                  localStorage.clear()
                  // 裁判后台 保存成功跳转登陆页
                  this.$router.push({name:'login'})
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消修改'
                });          
              });
            }
            
          }
        })
      }else{
        //新增
        this.$refs['judgeForm'].validate(valid => {
          if(valid){
            addReferee(this.judgeForm).then(res=>{
              this.$message({message: res.desc,type: 'success'});
              this.$router.push({name:'judge-manage'})
            })
          }
        })
      }

    },
    addList(){
      this.judgeForm.certList.push({
          itemId: '',
          level:'',
          certTime:'',
          certimglist:[],
          cert1:'',
          cert2:'',
      });
    },
    back(){
      this.$router.go(-1)
    },
    imageChange(response, file, fileList){
      console.log(fileList)
      // console.log(this.judgeForm.certList)
      setTimeout(() => {
        this.judgeForm.certList[this.certlistindex].certimglist = fileList;
      }, 10);
      
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleRemove(file, fileList) {
      // console.log(fileList)
      // this.judgeForm.certList[this.certlistindex].certimglist = fileList;
      setTimeout(() => {
        this.judgeForm.certList[this.certlistindex].certimglist = fileList;
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
      this.$refs['judgeForm'].validate(valid => {
        if(valid){
          this.activeName='second'
        }
      })
    },
    onSubmit(){
      this.$refs['clubForm3'].validate(valid => {
        if(valid){
          this.judgeForm.password = this.clubForm3.password
          this.judgeForm.surePwd = this.clubForm3.surePwd
          this.activeName='first'
          this.submitForm('judgeForm')
        }
      })
    }
  },
  watch:{
    'judgeForm.idCardNo'(val){
      let reg=/^(320583)|(320523)/
      // if(!reg.test(val)){
      //   this.rules={...this.rules,qualifyFiles:[{required:true,message:'请上传资质',trigger:'change'}]}
      // }else{
      //   console.log(this.rules)
      //   if('qualifyFiles' in this.rules){
      //     this.$delete(this.rules,'qualifyFiles')
      //   }
      //   this.$refs.judgeForm.clearValidate(['qualifyFiles'])
      // }
    },
    '$route' (){
      if(this.$route.path){
        this.mountefun()
      }
    }
  },
};
</script>
<style lang="less" scoped>
 .judgeaddthreesel /deep/ .el-form-item__label{
   display: block;
 }
.right /deep/ .el-form-item__label {
  padding: 0;
}
.left {
  padding-left: 20px;
  padding-top: 15px;
  border-radius: 18px;
  background: #f8fafb;
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b2125;
  }
  .avatar-wrapper,
  .idcard-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 104px;
      height: 145px;
      display: block;
      border-radius: 2px;
    }
    span {
      color: #6b8598;
      font-size: 18px;
    }
    .logo-img {
      width: 100px;
      height: 100px;
    }
    .card-img {
      width: 280px;
      height: 178px;
    }
  }
  .identity-wrapper,
  .sport-wrapper {
    display: flex;
    justify-content: center;
  }
  .top {
    margin-top: 23px;
    margin-bottom: 30px;
  }

}
.minusi{width: 40px;height: 28px;display: inline-block;font-style: normal;box-sizing: border-box;cursor: pointer;
line-height: 28px;text-align: center;color: #F10000;font-size: 16px;
}
.addusi{color:#006DB3;}
.minusSpan{position: relative;
  .minusi{position: relative;top:46px;}

}
.row{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.flex-3{
  display: flex;
  justify-content: space-between;
}
.right {
  padding: 20px;

  .el-select {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .commit-wrapper{
    button{
      width: 100%;
    }
  }
}
.personimg{
  width: 104px;
  height: 145px;
  // display: flex;
  // justify-content:center;
  // align-items: center;
  .el-upload{height: 145px;}
  .avatar {
    width: 104px;
    height: 145px;
    display: block;
  }
}
// .listtimesel .el-date-editor{width: 100%;}
// .listimgsel .el-upload-list img{width:90px;height: 90px;}
// .listimgsel .el-upload-list--picture-card .el-upload-list__item{width:90px;height: 90px;}
// .listimgsel{
//   .el-form-item__content{width:100%;
//     >div{display: flex;width:100%;}
//   }
//   .el-dialog__body{
//      img{max-width: 100%;max-height: 100%;}
//   }
// }
.tabhide /deep/ .el-tabs__header{display:none;}
</style>
