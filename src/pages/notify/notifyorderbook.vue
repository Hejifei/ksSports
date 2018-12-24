<template>
  <div>
    <el-row >
        <div class="title">
            <img @click="back" class="back" src="../../assets/img/back.png" alt="">
            <label >赛事通知</label>
          </div>
          <div class='obk_info'>
            <div class="notify_title">{{clubForm.noticeTitle}}</div>
            <div class="obk_littletitle">
              <div class="obkname">{{clubForm.matchName}}</div>
              <div class="obktype">秩序册</div>
              <div class="notify_time">{{clubForm.createTime}}</div>
            </div>
            <hr class="greyline" />
            <div class="notify_body" v-html='clubForm.noticeContent'></div>
            <hr class="greyline" />
            <div class="notify_body" v-html='clubForm.matchSchedule'></div>
            <hr class="greyline" />
            <div class="notcTitle">代表队名单</div>
          </div>
          <div class="notifyclubsC">
            
            <el-collapse v-model="activeNames">
              <el-collapse-item v-for="(item,index) in clubInfo"  :key="index" :title="item.clubName" :name="index">
                <div v-for="(item2,index2) in item.groupInfo" :key="index2">
                  <div>
                    <span class="common">{{item2.groupNameSelf}}</span>
                    <span class="common">组别：{{item2.groupName}}</span>
                  </div>
                  <div>
                    <span class="common">领队：{{item2.leader}} {{item2.phone}}</span>
                    <!-- <span class="common"></span> -->
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
          </div>
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
      },
      clubInfo:[],
      activeNames: []
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
        this.clubInfo=res.data.clubInfo
      })
    }
  },
};
</script>
<style lang="less">
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

.obk_info{padding:0 38px;
  .notcTitle{
    height: 68px;
    line-height: 68px;
    color: rgba(35, 35, 35, 1);
    font-size: 16px;
    text-align: left;
    font-family: PingFangSC-Regular;
  }
}
.obk_littletitle{display:flex;
  .obkname,.obktype{margin: 10px 0 20px;
  line-height: 22px;
  color: #232323;
  font-size: 16px;
  text-align: left;
  font-family: PingFangSC-Regular;}
  .obkname{margin-right:45px;}
  .obktype{margin-right: 53px;}
  
}

</style>
