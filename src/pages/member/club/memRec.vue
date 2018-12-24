<template>
  <div>
    <el-form ref="ruleForm" label-position="top">
      <el-row >
        <div class="title listtitle botmpad15">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >人员流动记录</label>
        </div>
      </el-row>
      <ul class="flowlist" v-if="flowlist.length !== 0">
        <li v-for="(flow,index) in flowlist" :key="index">
          <p>{{flow.flowTime}} &nbsp;&nbsp;{{flow.flowContent}}</p>
        </li>
      </ul>
      <div class="listnoRec" v-if="flowlist.length === 0">暂无人员流动记录</div>
    </el-form>
  </div>
</template>
<script>
import {getFlowList} from 'api/club.js'

export default {
  data() {
    var self = this;
    return {
      id:'',
      flowlist:[]
    }  
  },
  components: {
  },
  mounted(){
    this.id = this.$route.query.id;
    this.FlowListGet();
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    FlowListGet(){
      getFlowList({id:this.id}).then(res=>{
        this.flowlist = res.data;
      })
    },
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
.listnoRec{line-height: 25px;
    color: rgba(35, 35, 35, 1);
    font-size: 16px;
    text-align: left;
    font-family: PingFangSC-Regular;
    padding: 15px 0;
    text-align: center;    
}
</style>
