<template>
  <div>
    <el-form :model='ruleForm' ref="ruleForm" :rules="rules" label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >{{ruleForm.id === undefined ? '新增赛事类型' : '编辑赛事类型'}}</label>
        </div>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="所属分类" prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择分类" style="width:100%;">
                <el-option label="联赛" value=1>联赛</el-option>
                <el-option label="群体活动" value=2>群体活动</el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="项目类型" prop="itemName">
              <el-input v-model="ruleForm.itemName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item  label="封面图(320*140)" prop="coverUrl">
              <el-upload
                class="avatar-uploader personimg"
                :action="pictUpload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="ruleForm.coverUrl" :src="ruleForm.coverUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item  label="报名表">
              <ul class="gamelist">
                <li>
                  <div class="divlab">领队</div>
                  <el-checkbox class="divuse" v-model="ruleForm.leaderStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.leaderRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">主教练</div>
                  <el-checkbox class="divuse" v-model="ruleForm.coachStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.coachRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">赞助商</div>
                  <el-checkbox class="divuse" v-model="ruleForm.sponsorStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.sponsorRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">电话</div>
                  <el-checkbox class="divuse" v-model="ruleForm.phoneStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.phoneRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">上衣主颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.clothesMainStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.clothesMainRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">上衣副颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.clothesSubStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.clothesSubRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">短裤主颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.shortsMainStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.shortsMainRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">短裤副颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.shortsSubStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.shortsSubRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">袜子主颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.socksMainStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.socksMainRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">袜子副颜</div>
                  <el-checkbox class="divuse" v-model="ruleForm.socksSubStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.socksSubRequire">必填</el-checkbox>
                </li>
                <li>
                  <div class="divlab">球员号码</div>
                  <el-checkbox class="divuse" v-model="ruleForm.playerNumStatus">启用</el-checkbox>
                  <el-checkbox class="divrequire" v-model="ruleForm.playerNumRequire">必填</el-checkbox>
                </li>
              </ul>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center"  class="commit-wrapper">
          <el-button class="savebtn" type="primary" size="medium" @click="submitForm('ruleForm')">保存</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {pictUpload} from 'api/config.js'
import {addItem,getItem,EditItem} from 'api/dataMaintance.js'


export default {
  data() {
    var self = this;
    return {
      pictUpload:pictUpload,

      tinymceHtml:'',
      ruleForm: {
        id:'',
        type: "",
        itemName:'',
        coverUrl:'',

        leaderStatus:false,
        leaderRequire:false,
        coachStatus:false,
        coachRequire:false,
        sponsorStatus:false,
        sponsorRequire:false,
        phoneStatus:false,
        phoneRequire:false,
        clothesMainStatus:false,
        clothesMainRequire:false,
        clothesSubStatus:false,
        clothesSubRequire:false,
        shortsSubStatus:false,
        shortsSubRequire:false,
        shortsMainStatus:false,
        shortsMainRequire:false,
        socksMainStatus:false,
        socksMainRequire:false,
        socksSubStatus:false,
        socksSubRequire:false,
        playerNumStatus:false,
        playerNumRequire:false
      },

      rules:{
        type: [
          { required: true, message: '请选择所属分类', trigger: 'change' }
        ],
        itemName: [
          { required: true, message: '请输入项目类型', trigger: 'blur' },
          {min: 0, max: 10, message: '长度在 0 到 10 个字', trigger: 'blur'}
        ],
        coverUrl: [
          { required: true, message: '请上传封面图', trigger: 'change' }
        ],

      }
    };
  },
  components: {
  },
  mounted(){
    this.ruleForm.id = this.$route.query.id;
    if(this.ruleForm.id !== undefined){
      this.detailGet();
    }
  },
  created(){
    let self = this;
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    //提交信息
    submitForm() {
      let self = this;
      self.$refs['ruleForm'].validate(valid => {
        if(valid && this.ruleForm.id === undefined){
          // 添加
          addItem(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'gametype'})
          })
        }else if(valid && this.ruleForm.id !== undefined){
          // 编辑
          EditItem(self.ruleForm).then(res=>{
            this.$message({message: res.desc,type: 'success'});
            this.$router.push({name:'gametype'})
          })
        }
      })
    },
    detailGet(){
      // 获取比赛项目修改信息
      getItem({id:this.ruleForm.id}).then(res=>{
        let newres = res.data;
        for (let i in newres) {
          if (typeof (newres[i]) === 'number' && (i !== 'id' && i !== 'type')) {
            newres[i] = newres[i] === 1 ? true : false
          } else if ( i === 'type'){
            newres[i] = String(newres[i])
          }
        }
        this.ruleForm = newres;
      })
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.coverUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt1M = file.size < 1 * 1024 * 1024;

      if (!isJPG) {
        this.$message.error('封面图只能是 JPG或PNG 格式!');
      }
      if (!isLt1M) {
        this.$message.error('封面图大小不能超过 1MB!');
      }
      return isJPG && isLt1M;
    }
  }
};
</script>
<style lang="less">
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
.personimg{
  width: 320px;
  height: 140px;
  // display: flex;
  // justify-content:center;
  // align-items: center;
  .el-upload{height: 140px;}
  .avatar {
    width: 320px;
    height: 140px;
    display: block;
  }
  .avatar-uploader-icon{
    width: 320px;
    height: 140px;
    line-height: 140px;
  }
}

</style>
