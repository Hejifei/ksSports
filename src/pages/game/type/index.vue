<template>
  <div class="hello">
    <div class="listtitle">联赛分类</div>
    <div class="content">
      <div class="flex-3"  v-for="(item,index) in list" :key="index">
        <router-link :to="{name:'game-manage',query:{typeId:item.typeId}}" tag="div" class="img"  :style="{background:`url('${item.matchBackImg}') no-repeat center center`,'backgroundSize':'cover'}">
          <!-- <div> -->
            <div class="name">{{item.matchName}}</div>
            <div class="total">{{item.number}}场赛事</div>
          <!-- </div> -->
        </router-link>
      </div>
      
    </div>
  </div>
</template>

<script>
import {getLeagueClassification} from 'api/game.js'
export default {
  data(){
    return {
      list:[],
    }
  },
  computed:{
    count(){
      if(this.list.length!=0){
        console.log(this.list.length)
        return parseInt(this.list.length/3)
      }
      
      
    }
  },
  methods:{
    async init(){
      getLeagueClassification({matchType:1}).then(res=>{
        this.list=res.data
      })
    }
  },
  mounted(){
    this.init()
  }
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  // align-content: space-around;
  .flex-3{
    display: flex;
    width: 320px;
    // min-width: 320px;
    height: 140px;
    box-sizing: border-box;
    margin-top: 45px;
    margin-right: 45px;
    .img{
      width: 320px;
      height: 140px;
      display: flex;
      border-radius: 3px;
      cursor: pointer;
      // align-items: center;
      flex-direction:column;
      justify-content: center;
      padding:0 50px;
    }
    .name{
      height: 45px;
      line-height: 45px;
      color: rgba(255, 255, 255, 1);
      font-size: 30px;
      text-align: left;
      font-family: PingFangSC-Semibold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .total{
      margin-top:9px;
      height: 25px;
      line-height: 25px;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      text-align: left;
      font-family: PingFangSC-Semibold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  // .flex-3:nth-child(3n-1){
  //   padding:0 25px;
  //   min-width: 370px;
  // }
  // .flex-3:nth-child(3n-2){
  //   padding-right:25px;
  //   min-width: 345px;
  // }
  // .flex-3:nth-child(3n){
  //   padding-left:25px;
  //   min-width: 345px;
  // }
}
</style>

