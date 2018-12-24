<template>
  <div class="wrapper">
    <div  type="flex"  class="row-bg white homeline">
      <div class="gap halfline" :style="{minHeight : minheight+'px'}">
        <div class="title"><span class="signin">最新俱乐部注册</span><router-link :to='{name:"club-manage"}' tag="span" class="cursor">更多》</router-link></div>
        <div class="content" v-if="clubTable && clubTable.length!=0" v-for="(item,index) in clubTable" :key="index">
          <div class="left">
            <div class="nameline"><router-link  :to="{name:'club-add',query:item.status!=1?{id:item.clubId,type:'view'}:{id:item.clubId,type:'examine'}}" tag="span" class="name cursor">{{item.clubName}}</router-link></div>
            <div class="all">联系电话：<span>{{item.phone}}</span></div>
          </div>
          <div class="middle">
            <div class="all">领队：{{item.leader}}</div>
            <div class="all">人数：{{item.number}}</div>
          </div>
          <div class="right">
            <span class="btn" :style="{background:style(item)}">{{item.statusLabel}}</span>
          </div>
        </div>
        <div class="none" v-if="clubTable.length==0">暂无数据 </div>
      </div>
      <div class="columnline"></div>
      <div class="gap right0 halfline" :style="{minHeight : minheight+'px'}">
        <div class="title"><span class="signin">最新裁判员注册</span><router-link tag="span" :to="{name:'judge-manage'}" class="cursor">更多》</router-link></div>
          <div class="content" v-if="refereeTable && refereeTable.length!=0" v-for="(item,index) in refereeTable" :key="index">
            <div class="left">
              <div class="nameline"><router-link :to="{name:'judge-add',query:item.status!=1?{refereeId:item.refereeId,type:'view'}:{refereeId:item.refereeId,type:'examine'}}" tag="span" class="name cursor">{{item.name}}</router-link></div>
              <div class="all">级别：<span>{{item.levelLabel}}</span></div>
            </div>
            <div class="middle">
              <div class="all">性别：{{item.sexLabel}}</div>
              <div class="all">联系方式：{{item.phone}}</div>
            </div>
            <div class="right">
              <span class="btn" :style="{background:style(item)}">{{item.statusLabel}}</span>
            </div>
          </div>
          <div class="none" v-if="refereeTable.length==0">暂无数据 </div>
      </div>
    </div>
    <div type="flex" class="row-bg bt-top homeline">
      <div  class="gap halfline" :style="{minHeight : minheight+'px'}">
        <div class="title"><span class="signin">最新联赛报名</span><router-link :to='{name:"register-manage"}' tag="span" class="cursor">更多》</router-link></div>
        <div  class="bottom-content gameappline" v-if="matchTable && matchTable.length!=0" v-for="(item,index) in matchTable" :key="index">
          <div class="gameappleft">
            <div class="top nameline"><router-link type="text" :to='{name:"approval-enroll",query:{id:item.enrollId ,type:"view",matchId:item.matchId}}' ><span class="name cursor">{{item.matchName}}</span></router-link></div>
            <div class="bottom">
              <div class="left">
                <div class="nameline"><span>{{item.clubName}}</span>俱乐部</div>
                <div class="all">联系电话：<span>{{item.phone}}</span></div>
              </div>
              <div class="middle">
                <div class="all">报名人数：{{item.number}}</div>
                <div class="all">领队：{{item.leader}}</div>
              </div>
              <!-- <div class="right">
                <span class="btn cursor" :style="{background:style(item)}">{{item.statusLabel}}</span>
              </div> -->
            </div>
          </div>
          <div class="right">
            <span class="btn" :style="{background:style(item)}">{{item.statusLabel}}</span>
          </div>
        </div>
        <div class="none" v-if="matchTable.length==0">暂无数据 </div>
      </div>
      <div class="columnline"></div>
      <div  class="gap right0 halfline" :style="{minHeight : minheight+'px'}">
        <div class="title"><span class="signin">最新群体活动报名</span><router-link :to='{name:"groupregister-manage"}' tag="span" class="cursor">更多》</router-link></div>
        <div v-if="activityTable && activityTable.length!=0" v-for="item in activityTable" :key="item.matchId" class="bottom-content gameappline">
          <div class="gameappleft">
            <div class="top nameline"><router-link type="text" :to='{name:"groupapproval-enroll",query:{id:item.enrollId ,type:"view",matchId:item.matchId}}' ><span class="name cursor">{{item.matchName}}</span></router-link></div>
            <!-- <div class="top nameline"><span class="name cursor">{{item.matchName}}</span></div> -->
            <div class="bottom">
              <div class="left">
                <div class="nameline"><span>{{item.clubName}}</span>俱乐部</div>
                <div class="all">联系电话：<span>{{item.phone}}</span></div>
              </div>
              <div class="middle">
                <div class="all">报名人数：{{item.number}}</div>
                <div class="all">领队：{{item.leader}}</div>
              </div>
            </div>
          </div>
          <div class="right">
              <span class="btn" :style="{background:style(item)}">{{item.statusLabel}}</span>
            </div>
        </div>
        <div class="none" v-if="activityTable.length==0">暂无数据 </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {getSystemHome} from 'api/home'
  export default {
    data () {
      return {
        listnumsw:0,
        refereeTable: [],
        matchTable:[],
        activityTable:[],
        clubTable:[],
        minheight:''
      }
    },
    mounted(){
      this.listnumsw =Math.round(((window.innerHeight - document.getElementsByClassName('BMhead')[0].clientHeight-30-41)/2-33)/86);
      this.initForm()
      this.minheight = (((window.innerHeight - document.getElementsByClassName('BMhead')[0].clientHeight-30-41)/2))
    },
    methods: {
      initForm () {
        getSystemHome(this.listnumsw).then(res => {
          this.loading = false
          
          if (res.code == 200) {
            this.refereeTable = res.data.referee
            this.matchTable = res.data.match
            this.activityTable = res.data.activity
            this.clubTable = res.data.clubInfo
          } else {
            this.$message.error(res.desc)
          }
        })
      },
      style(item){
        if(item.status==2){
          return '#32D296'
        }else if(item.status==1){
          return '#1E87F0'
        }else{
          return '#B30000'
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.wrapper{
  background: #EAEFF3;
  .white{
    background: EAEFF3;
  }
  .gap{
    background: white;
    // padding-right: 18px;
    // margin-right: 10px;
    padding-bottom:27px;
    box-sizing: border-box;
  }
  .right0{
    margin-right: 0;
  }
  .homeline{display:flex;flex-direction:row;box-sizing: border-box;flex-wrap:nowrap;
    .halfline:nth-child(1){padding-right: 18px;}
    .halfline:nth-child(3){padding-left: 18px;}
  }
  .halfline{flex:1 !important;box-sizing: border-box;}
  .columnline{width: 10px;}
  .title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    &>span:nth-child(1){
      color: #000000;
      font-size: 16px;
      font-weight: bold;
    }
    &>span:nth-child(2){
      color: #006DB3;
      font-size: 14px;
    }
  }
  .content{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #E1E1E1;
    padding: 10px;
    align-items: center;
  }
  .gameappline{display: flex;justify-content: space-between;align-items: center;}
  .gameappleft{flex:1;}
  .bottom-content{
    // margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid #E1E1E1;
    .bottom{
      display: flex;
      justify-content: space-between;
      
      // padding: 0 0 10px;
      align-items: center;
    }
  }
  
  .bt-top{
    margin-top: 10px;
  }
  .none{
    height: 38px;
    line-height: 38px;
    color: rgba(93, 101, 111, 1);
    font-size: 14px;
    text-align: center;
    font-family: PingFangSC-Regular;

  }
  .signin{
    border-bottom: 2px solid #232323;
    padding: 5px;
  }
  .name{
    color: #006DB3;
    font-size: 16px;
    // width: 100%;
    // display: block;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
  .nameline{
    height: 19px;
    line-height: 19px;
    color: rgba(93, 101, 111, 1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom:4px;
  }
  .all{
    font-size: 14px;
    color: #5D656F;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .middle .all:nth-child(1){margin-bottom:4px;}
  .btn{
    width: 52px;
    line-height: 28px;
    border-radius: 4px;
    background: red;
    padding: 4px;
    color: white;
    font-size:14px;
  }
  .left,.middle,{
    width: 0;
    flex:1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .right{
    // flex: 1;
    width:55px;
    text-align:right;
    // padding-left: 18px;
  }
  
}
</style>
