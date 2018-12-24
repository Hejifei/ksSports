<template>
  <div class="sportrecord-wrapper">
    <el-form ref="ruleForm" label-position="top">
      <el-row >
        <div class="title listtitle botmpad15">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >转会记录</label>
        </div>
      </el-row>
      <ul class="flowlist">
        <li v-for="(flow,index) in flowlist" :key="index">
          <p>{{flow.flowTime}} &nbsp;&nbsp;{{flow.flowContent}}</p>
        </li>
        <div v-if="flowlist.length==0" class="recordlistnone">暂无数据</div>
      </ul>
      <el-row >
        <div class="title listtitle botmpad15 flex">
          <label >处罚记录</label>
          <span class="add-pubnish" @click="publishnew" v-if="$route.name === 'sport-record'">新增处罚</span>
        </div>
      </el-row>
      <ul class="flowlist pubnishlist" >
        <li v-for="(pubnish,index) in pubnishlist" :key="index">
          <p>{{pubnish.punishTime}} &nbsp;&nbsp;{{pubnish.punishContent}}</p>
          <div class="listmenudiv"><a class="see" style="text-decoration:none" @click="attachmentDet(pubnish.attachUrl)" target="_blank">查看附件</a>
          <span class="del" @click="del(pubnish.id)" v-if="$route.name === 'sport-record'">删除</span></div>
        </li>
        <div v-if="pubnishlist.length==0" class="recordlistnone">暂无数据</div>
      </ul>
      <el-dialog title="新增处罚" :visible.sync="dialogFormVisible"  class="judge_pubadd">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入处罚描述"
          v-model="punishContent">
        </el-input>
        <div class="date-wrapper">
          <el-date-picker
            v-model="date"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-upload
            class="upload-demo"
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
import {getTransferList,getPlayerPunishList,addPunish,removePunish} from 'api/player.js'
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    }
  },
  components: {
  },
  mounted(){
    console.log(this.$route.name)
    this.getList()
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    publishnew(){
      // 新增处罚
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
      let result=await removePunish(id)
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
            message: '处罚描述不能为空！'
        });
        return false;
      }
      if(this.punishContent.length > 50){
        this.$message({
            type: 'warning',
            message: '处罚描述超过50字！'
        });
        return false;
      }
      if(this.date === ''){
        this.$message({
            type: 'warning',
            message: '处罚时间不能为空！'
        });
        return false;
      }
      if(this.attachUrl === ''){
        this.$message({
            type: 'warning',
            message: '附件不能为空！'
        });
        return false;
      }
      let result=await addPunish({
          playerId:this.$route.query.id,
          punishContent:this.punishContent,
          punishTime:this.date,
          attachUrl:this.attachUrl
        })
      if(result){
        this.$message.success(result.desc);
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
    //转会处罚记录获取
    async getList(){
      let [transfer,pubnish]=await Promise.all([getTransferList(this.$route.query.id),getPlayerPunishList(this.$route.query.id)])
      if(transfer.data){
        this.flowlist=transfer.data
        console.log(transfer.data)
      }
      if(pubnish.data){
        this.pubnishlist=pubnish.data
       console.log(pubnish.data)
      }
    }
  }
};
</script>
<style lang="less" >
.sportrecord-wrapper /deep/  .el-icon-close-tip{
  display: none !important;
}
.sportrecord-wrapper /deep/ .el-upload-list{
  width: 215px;
  display: inline-block;
}
.sportrecord-wrapper /deep/ .upload-demo{
  display: flex;
  align-items: center;
}
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
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
      font-size: 16px;
      cursor: pointer;
    }
    .del{
      color: #B30000;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
.flex{
  display: flex;
  justify-content: space-between;
  .add-pubnish{
    font-size: 18px;
    color: rgb(0, 109, 179);
    cursor: pointer;
  }
}
.date-wrapper{
  margin-top: 10px;
}
.judge_pubadd .dialog-footer{
  display: flex;
  justify-content: space-between;
}
.judge_pubadd{
  .upload-demo{text-align: left;}
  .el-upload-list__item-name{max-width: 280px;white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  }
}
.flowlist .recordlistnone,.pubnishlist .recordlistnone{text-align: center;border-bottom: 0;}
</style>
