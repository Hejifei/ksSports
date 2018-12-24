<template>
  <div>
    <el-row >
        <div class="title">
            <img @click="back" class="back" src="../../assets/img/back.png" alt="">
            <label >赛事通知</label>
          </div>
          <div class="notify_title">{{clubForm.noticeTitle}}</div>
          <div class="notify_time">{{clubForm.createTime}}</div>
          <hr class="greyline" />
          <div class="notify_body" v-html='clubForm.noticeContent'></div>
      </el-row>
  </div>
</template>
<script>
import {getNoticeDetail} from 'api/notify.js'

export default {
  data() {
    
    return {
      readFlag:'',
      noticeDetailId:'',
      clubForm:{
        id:'',
      }
    };
  },
  components: {},
  mounted(){
    this.clubForm.id = this.$route.query.id;
    this.readFlag = this.$route.query.readFlag;
    this.noticeDetailId = this.$route.query.noticeDetailId;
    this.notifyDetail();
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    notifyDetail(){
      let param = {};
      if(this.readFlag !== undefined){
        param={noticeId:this.clubForm.id,readFlag:this.readFlag,noticeDetailId:this.noticeDetailId}
      }else{
        param={noticeId:this.clubForm.id}
      }
      getNoticeDetail(param).then(res=>{
        this.clubForm = res.data;
      })
    }
  },
};
</script>
<style lang="less" scoped>
.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #1b2125;
  font-weight: bold;
}
.notify_title{margin-top: 20px;
  line-height: 33px;
  color: rgba(27, 33, 37, 1);
  font-size: 24px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.notify_time{margin: 10px 0 20px;
  line-height: 22px;
  color: rgba(132, 132, 132, 1);
  font-size: 16px;
  text-align: left;
  font-family: PingFangSC-Regular;
}
.greyline{border: 0;border-top: 1px solid #D1D1D1;}
.notify_body{padding: 15px 0;}
</style>
