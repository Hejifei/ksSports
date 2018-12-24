<template>
  <div>
    <el-form ref="ruleForm" label-position="top">
      <el-row >
        <div class="title listtitle botmpad15">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >人员流动记录</label>
        </div>
      </el-row>
      <ul class="flowlist">
        <li v-for="(flow,index) in list" :key="index">
          <p>{{flow.flowTime}} &nbsp;&nbsp;{{flow.flowContent}}</p>
        </li>
        <div v-if="list.length==0" class="recordlistno">暂无数据</div>
      </ul>
      
    </el-form>
  </div>
</template>
<script>
import {getFlowList} from 'api/player.js'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      list:[]
    }  
  },
  components: {
  },
  computed:{
    ...mapGetters(['user'])
  },
  mounted(){
    this.getList()
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
    
    //转会处罚记录获取
    async getList(){
      let result=await getFlowList(this.user.clubId)
      if(result){
        this.list=result.data
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
    .see{
      color: #006DB3;
      font-size: 18px;
      cursor: pointer;
    }
    .del{
      color: #B30000;
      font-size: 18px;
      cursor: pointer;
    }
  }
}
.flex{
  display: flex;
  justify-content: space-between;
  .add-pubnish{
    font-size: 20px;
    color: rgb(0, 109, 179);
  }
}
.date-wrapper{
  margin-top: 10px;
}
.dialog-footer{
  display: flex;
  justify-content: space-between;
}
.recordlistno{text-align: center;}
</style>
