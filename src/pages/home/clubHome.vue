<template>
  <div class="wrapper">
    <el-row :gutter="20"  type="flex"  class="row-bg white" justify="center">
      <el-col :span="12">
        <div class="sys">系统通知</div>
        <div v-if="sysNotice && sysNotice.length!=0" class="content" v-for="(item,index) in sysNotice" :key="index" >
          <router-link  :to='{name:"notify-system",query:{id:item.noticeId,readFlag:item.readFlag,noticeDetailId:item.noticeDetailId}}' >
            <div><span v-show="item.readFlag==0" class="icon"></span>{{item.noticeTitle}}</div>
            <span>{{item.createTime}}</span>
          </router-link>
        </div>
        <div class='listnodata' v-if="sysNotice.length==0">暂无数据</div>
      </el-col>
      <el-col :span="12">
        <div class="sys">赛事通知</div>
        <div class="content" v-if="matchNotice && matchNotice.length!=0" v-for="(item,index) in matchNotice" :key="index">
          <router-link type="text" v-if="item.noticeMatchType === 3" :to='{name:"notify-other",query:{id:item.noticeId,readFlag:item.readFlag,noticeDetailId:item.noticeDetailId}}' >
            <div><span v-show="item.readFlag==0" class="icon"></span>{{item.noticeTitle}}</div>
            <span>{{item.createTime}}</span>
          </router-link>
          <router-link type="text" v-else-if="item.noticeMatchType === 1"  :to='{name:"notify-orderbook",query:{id:item.noticeId,readFlag:item.readFlag,noticeDetailId:item.noticeDetailId}}' >
            <div><span v-show="item.readFlag==0" class="icon"></span>{{item.noticeTitle}}</div>
            <span>{{item.createTime}}</span>
          </router-link>
          <router-link type="text" v-else-if="item.noticeMatchType === 2" :to='{name:"notify-score",query:{id:item.noticeId,readFlag:item.readFlag,noticeDetailId:item.noticeDetailId}}' >
            <div><span v-show="item.readFlag==0" class="icon"></span>{{item.noticeTitle}}</div>
            <span>{{item.createTime}}</span>
          </router-link>
        </div>
        <div class='listnodata' v-if="matchNotice.length==0">暂无数据</div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getClubHome} from 'api/home.js'
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      matchNotice:[],
      sysNotice:[]
    }
  },
  computed:{
    ...mapGetters(['user'])
  },
  methods:{
   async init(){
     let result=await getClubHome({clubId:this.user.clubId,pageSize:5})
     if(result){
       this.matchNotice=result.data.matchNotice
       this.sysNotice=result.data.sysNotice
     }
    }
  },
  mounted(){
    this.init()
  }
}
</script>
<style lang="less" scoped>
.sys{
  font-size: 20px;
  color: #1B2125;
  border-bottom: 3px solid black;
  padding: 10px;
}
.content{
  padding-top: 24px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  a{display: flex;
  justify-content: space-between;
  width:100%;color: #1B2125;text-decoration:none;
    div{flex:1;white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;}
    span{flex:1;}
  
  }
}
.listnodata{
  font-size: 20px;
  color: #1B2125;
  text-align:center;
  padding: 24px;
  }
.icon{
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background: red;
  display: inline-block;
}
</style>
