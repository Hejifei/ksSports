<template>
  <div class="approval-wrapper">
    <el-form :model='ruleForm' ref="ruleForm"  label-position="top">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
          <label >报名信息</label>
        </div>
        <el-row>
          <el-col>
            <div class="club-name font-style">俱乐部名称：<span>{{ruleForm.clubName}}</span></div>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="领队"  v-if="showAuth.leaderStatus===1">
              <el-input v-model="ruleForm.leader" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item   label="主教练" v-if="showAuth.coachStatus===1" >
              <el-input v-model="ruleForm.coach" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12">
            <el-form-item  label="赞助商" v-if="showAuth.sponsorStatus===1">
              <el-input v-model="ruleForm.sponsor" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item  label="电话"  v-if="showAuth.phoneStatus===1">
              <el-input v-model="ruleForm.phone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="24">
            <el-form-item  label="服装" v-if="showAuth.clothesMainStatus === 1 ||showAuth.shortsMainRequire === 1 || showAuth.socksMainStatus === 1 ||
            showAuth.clothesSubStatus === 1 || showAuth.shortsSubStatus === 1 || showAuth.socksSubStatus === 1 ">
              <div class="clothes">
                <div v-if="showAuth.clothesMainStatus===1">
                  <span>上衣主颜：{{ruleForm.coatThemeMain}}</span>
                </div>
                <div v-if="showAuth.shortsMainRequire==1">
                  <span>短裤主颜：{{ruleForm.shortsThemeMain}}</span>
                </div>
                <div v-if="showAuth.socksMainStatus===1">
                  <span>球袜主颜：{{ruleForm.sockThemeMain}}</span>
                </div>
              </div>
              <div style="margin-top:10px;" class="clothes">
                <div v-if="showAuth.clothesSubStatus===1">
                  <span>上衣副颜：{{ruleForm.coatThemeDeputy}}</span>
                </div>
                <div v-if="showAuth.shortsSubStatus===1">
                  <span>短裤副颜：{{ruleForm.shortsThemeDeputy}}</span>
                </div>
                <div v-if="showAuth.socksSubStatus===1">
                  <span>球袜副颜：{{ruleForm.sockThemeDeputy}}</span>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-for="(item,index) in ruleForm.group" :key="index">
          <el-row>
          <div class="font-style" style="margin-top:10px;">组别：{{item.teamName}}</div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-table
              :data="item.player"
              stripe
              style="width: 100%">
              <el-table-column
                prop="playerName"
                label="运动员"
                width="180">
                <template slot-scope="scope">
                  <router-link type="text" class="el-button el-button--text" :to='{name:"sport-add",query:{id:scope.row.playerId,type:"view"}}' >{{scope.row.playerName}}</router-link>
                </template>
              </el-table-column>
              <el-table-column
                label="转会处罚记录"
                width="180">
                <template slot-scope="scope">
                  <router-link type="text" class="el-button el-button--text" :to='{name:"sport-record",query:{id:scope.row.playerId}}' >查看</router-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="号码">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </div>
        <el-row>
          <el-col>
            <div v-for="(item,index) in record" :key="index" style="margin-top:10px;">
              审批记录：<span>{{item.approvalDate}}</span>
              <span >{{item.status==3?'已拒绝':'已通过'}}</span>
              <span v-show="item.status==3">原因:{{item.reason}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="$route.query.type==undefined" type="flex" style="margin-top:50px;" justify="center"  class="commit-wrapper">
          <el-button class="savebtn" type="primary" size="medium" @click="isApproval(1)">通过</el-button>
          <el-button class="savebtn" type="danger" size="medium" @click="isApproval(2)">拒绝</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {getMatchEnrollDetail,approvalMatch,getApprovalRecord,getEnrollShowItem} from 'api/game.js'
import {getList,getItemDrop} from 'api/common.js'
export default {
  data() {
    return {
      ruleForm: {
        clubName:'',
        leader:'',
        coach:'',
        sponsor:'',
        phone:'',
        coatThemeMain:'',
        coatThemeDeputy:'',
        shortsThemeMain:'',
        shortsThemeDeputy:'',
        sockThemeMain:'',
        sockThemeDeputy:'',
        group:[]
      },
      record:[],
      showAuth:[]
    };
  },
  components: {
  },
  computed:{
    
  },
  watch:{
    
  },
  mounted(){
    this.queryInit()
    this.getRecord()
  },
  created(){
  },
  methods: {
    queryInit(){
      getMatchEnrollDetail(this.$route.query.id).then(res=>{
        if(res.code==200){
          this.ruleForm=res.data
        }
      })
      getEnrollShowItem(this.$route.query.matchId).then(res=>{
        this.showAuth=res.data
      })
    },
    getRecord(){
      getApprovalRecord({enrollId:this.$route.query.id,approveType:4}).then(res=>{
        if(res.code==200){
          this.record=res.data
        }
      })
    },
    back(){
      this.$router.go(-1)
    },
    
    // 获取比赛项目下拉
    getItemId(type){
      getItemDrop(type).then(res=>{
        this.itemIds=res.data
        this.tableData=res.data.group
      })
    },
    isApproval(val){
      if(val==1){
        approvalMatch({
          enrollId:this.$route.query.id,
          flag:1,
        }).then(res=>{
          if(res.code==200){
            this.$router.push({name:'groupregister-manage'})
          }
        })
      }else{
        this.$prompt('请输入拒绝原因', '拒绝原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator:(val)=>{
          if(!val) return false
        },
        inputErrorMessage: '请输入拒绝原因'
      }).then(({ value }) => {
        
        approvalMatch({
          enrollId:this.$route.query.id,
          flag:0,
          reason:value,
        }).then(res=>{
          if(res.code==200){
            this.$router.push({name:'groupregister-manage'})
          }
          
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
        
      }
    }
    
  }
};
</script>
<style lang="less">
.approval-wrapper /deep/ .el-form-item__label{
  color: #848484;
  font-size: 18px;
}
.approval-wrapper{
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b2125;
    font-weight: bold;
  }
  .font-style{
    color: #848484;
    font-size: 18px;
  }
  .club-name{
    // font-size: 16px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .clothes{
    display: flex;
    padding-left: 18px;
    padding-right: 18px;
    align-items: center;
    justify-content: space-between;
    border: 1px solid gainsboro;
    color: #c0c4cc;
    // div:nth-child(1){
    //   margin-left: 18px;
    // }
    div{
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}


</style>
