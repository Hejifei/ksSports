<template>
  <div>
    <el-form ref="ruleForm" label-position="top">
      <el-row >
        <div class="title listtitle botmpad15">
          <img v-if="cmFrom !== 'judge'" @click="back" class="back" src="../../assets/img/back.png" alt="">
          <label >历史执裁记录</label>
          <span v-if="cmFrom !== 'judge' && cmFrom !== 'judgeM'" style="margin-left:auto" class="add-pubnish" @click="judgmentnew">新增记录</span>
        </div>
      </el-row>
      <ul class="flowlist">
        <li v-if="flowlist && flowlist.length!=0" v-for="(flow,index) in flowlist" :key="index">
          <p>{{flow.referingDate}} &nbsp;&nbsp;{{flow.referingContent}}</p>
        </li>
        <li v-if="flowlist.length==0">暂无数据</li>
      </ul>
      <el-row >
        <div class="title listtitle botmpad15 flex">
          <label >奖惩记录</label>
          <span v-if="cmFrom !== 'judge' && cmFrom !== 'judgeM'" class="add-pubnish" @click="publishnew">新增奖惩</span>
        </div>
      </el-row>
      <ul class="flowlist pubnishlist" >
        <li v-for="(pubnish,index) in pubnishlist" :key="index">
          <p>{{pubnish.punishTime}} &nbsp;&nbsp;{{pubnish.punishContent}}</p>
          <div class="listmenudiv"><a class="see" style="text-decoration:none" @click="attachmentDet(pubnish.attachUrl)" target="_blank">查看附件</a>
          <span v-if="cmFrom !== 'judge'" class="del" @click="del(pubnish.punishId)">删除</span></div>
        </li>
        <li v-if="pubnishlist.length==0" >暂无数据</li>
      </ul>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="judge_pubadd">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          :placeholder="newaddType === 1 ? '请输入执裁描述' :'请输入奖惩描述'"
          v-model="punishContent">
        </el-input>
        <div class="date-wrapper">
          <el-date-picker
            v-model="date"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions1"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div slot="footer" class="dialog-footer"  :class="{'flexrowRev':newaddType === 1}">
          <el-upload
            v-if="newaddType === 2"
            class="upload-demo pub_filepuload"
            :action="pictUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <div><el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPubnish">确 定</el-button></div>
        </div>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import {getReferingList,getRefereePunishList,addRefereePunish,addRefereeJudge,removeRefereePunish} from 'api/judge.js'
import {pictUpload} from 'api/config.js'

// import modal from '@/components/modal'
export default {
  data() {
    var self = this;
    return {
      pictUpload:pictUpload,
      id:'',
      flowlist:[],
      pubnishlist:[],
      dialogFormVisible: false,
      punishContent: '',
      date:'',
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      formLabelWidth: '120px',
      fileList:[],
      attachUrl:'',
      newaddType:'', //1 新增执裁记录 2 新增奖惩记录
      dialogTitle:'',//弹窗标题
      cmFrom:'',//来自裁判后台
      pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
    }
  },
  components: {
  },
  mounted(){
    if(this.$route.query.refereeId !== undefined){
      this.id = this.$route.query.refereeId;
      if(this.$store.state.user.refereeId !== null){
        this.cmFrom = 'judgeM'
      }
    }else if(this.$store.state.user.refereeId !== null){
      this.cmFrom = 'judge'
      this.id = this.$store.state.user.refereeId
    }
    this.getList()
    
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    publishnew(){
      // 新增奖惩
      this.newaddType = 2;
      this.dialogTitle = '新增奖惩'
      this.punishContent = '';
      this.date = '';
      this.fileList = [];
      this.attachUrl = '';
      this.dialogFormVisible = true;
    },
    judgmentnew(){
      /* 新增执裁记录 */
      this.newaddType = 1;
      this.dialogTitle = '新增记录'
      this.punishContent = '';
      this.date = '';
      this.fileList = [];
      this.attachUrl = '';
      this.dialogFormVisible = true;
    },
    attachmentDet(url){
      // 附件查看
      if(url === ''){
        this.$message({
            type: 'warning',
            message: '附件不存在！'
        });
      }else{
        window.open(url);
      }
    },
    async del(id){
      let result=await removeRefereePunish(id)
      if(result){
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList()

      }
    },
    async addPubnish(){
      if(this.punishContent === ''){
        this.$message({
            type: 'warning',
            message: this.newaddType === 1 ? '执裁描述不能为空!' : '奖惩描述不能为空！'
        });
        return false;
      }
      if(this.punishContent.length > 50){
        this.$message({
            type: 'warning',
            message: this.newaddType === 1 ? '执裁描述超过50字！!' : '奖惩描述超过50字！'
        });
        return false;
      }
      if(this.date === ''){
        this.$message({
            type: 'warning',
            message: this.newaddType === 1 ? '执裁时间不能为空!' : '奖惩时间不能为空！'
        });
        return false;
      }
      if(this.attachUrl === '' && this.newaddType === 2){
        this.$message({
            type: 'warning',
            message: '附件不能为空！'
        });
        return false;
      }
      let result
      if(this.newaddType === 1){
        result=await addRefereeJudge({
          refereeId:this.id,
          refereeContent:this.punishContent,
          refereeTime:this.date
        })
      }else{
        result=await addRefereePunish({
          refereeId:this.id,
          punishContent:this.punishContent,
          punishTime:this.date,
          attachUrl:this.attachUrl
        })
      }
      if(result){
        this.dialogFormVisible=false
        this.getList()
      }
    },
    handleSuccess(response, file, fileList){
      this.attachUrl=response.data
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      this.fileList = [];
      this.attachUrl = '';
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //记录获取
    async getList(){
      let [transfer,pubnish]=await Promise.all([getReferingList({refereeId:this.id}),getRefereePunishList({refereeId:this.id})])
      if(transfer.data){
        this.flowlist=transfer.data
        // console.log(transfer.data)
      }
      if(pubnish.data){
        this.pubnishlist=pubnish.data
      //  console.log(pubnish.data)
      }
    }
  }
};
</script>
<style lang="less" >

.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}
.upload-demo{
  display: flex;
  align-items: center;
}
.pub_filepuload{

}
.botmpad15{padding-bottom: 15px;}
.flowlist{list-style: none;padding: 20px 0;
  li{
    line-height: 25px;
    color: rgba(35, 35, 35, 1);
    font-size: 16px;
    text-align: left;
    font-family: PingFangSC-Regular;
    padding: 15px 0;
    border-bottom: 1px solid #E1E1E1;
  }
}
.pubnishlist{
  li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listmenudiv{width: 115px;}
    p{flex: 1;}
    .see{
      color: #006DB3;
      font-size: 14px;
      cursor: pointer;
    }
    .del{
      color: #B30000;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
.flex{
  display: flex;
  justify-content: space-between;
}
.add-pubnish{
  font-size: 20px;
  color: rgb(0, 109, 179);
  cursor: pointer;
}
.date-wrapper{
  margin-top: 10px;
}
.judge_pubadd .dialog-footer{
  display: flex;
  justify-content: space-between;
}
.judge_pubadd{
  .el-upload-list__item-name{max-width: 280px;white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
}
.flexrowRev{
  flex-direction: row-reverse;
}
</style>
