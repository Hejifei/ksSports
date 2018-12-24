<template>
  <div class="hello">
    <div class="listtitle">赛事列表</div>
    <div class="listSearchC">
      <div class="listsecBox">
          <label>比赛类型</label>
          <el-select v-model="querydata.matchType" placeholder="类型">
            <el-option label="All" value="" >
            </el-option>
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      <div class="listsecBox">
        <label>比赛时间</label>
        <el-date-picker
            v-model="querydata.startTime"
            type="date"
            placeholder="选择日期"
            style="margin-right:0"
            @change="timechange"
            >
        </el-date-picker>
        <span>~</span>
        <el-date-picker
            v-model="querydata.endTime"
            type="date"
            placeholder="选择日期"
            @change="timechange"
            >
        </el-date-picker>
      </div>
      <div class="listsecBox">
        <a  @click="querylist()" class="searchBtn"></a>
      </div>
      <el-row>
        
      </el-row>


    </div>
    <div class="listtableC">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column
          prop="matchName"
          label="赛事名称">
          <!-- <template slot-scope="scope">
            <router-link type="text" class="el-button el-button--text" :to='{name:"judge-add",query:{refereeId:scope.row.refereeId,type:"view"}}' >{{scope.row.refereeName}}</router-link>
          </template> -->
        </el-table-column>
        <el-table-column
          width="50"
          prop="matchProject"
          label="项目">
        </el-table-column>
        <el-table-column
          prop="matchType"
          label="比赛类型">
          <template slot-scope="scope">
          <div>{{scope.row.matchType==1?'联赛':'群体活动'}}</div>
        </template>
        </el-table-column>
        <el-table-column
          label="报名开始-结束时间">
          <template slot-scope="scope">
          <div>{{scope.row.enrollStartTime}}</div>
          <div>{{scope.row.enrollEndTime}}</div>
        </template>
        </el-table-column>
        <el-table-column
          label="比赛开始-结束时间">
          <template slot-scope="scope">
          <div>{{scope.row.matchStartTime}}</div>
          <div>{{scope.row.matchEndTime}}</div>
        </template>
        </el-table-column>
        <el-table-column
          width="100"
          prop="schedule"
          label="竞赛规程">
          <template slot-scope="scope">
            <router-link v-if="scope.row.matchType === 1" type="text" class="el-button el-button--text" :to='{name:"game-info",query:{"id":scope.row.matchId,type:"view"}}' >竞赛规程</router-link>
            <router-link v-if="scope.row.matchType === 2" type="text" class="el-button el-button--text" :to='{name:"group-info",query:{"id":scope.row.matchId,type:"view"}}' >竞赛规程</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusLabel"
          width="100"
          label="状态">
          <template slot-scope="scope">
            <span :class="[
            'listspan',
            {listspan_yellow:scope.row.status==4},
            {listspan_blue:scope.row.status==1},
            {listspan_green:scope.row.status==2},
            {listspan_red:scope.row.status==3},
            {listspan_grey:scope.row.status==5},

            ]">
              {{scope.row.statusLabel}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <span @click="handleScore(scope.row)" :class="handleEnroll(scope.row)">{{statusLabel(scope.row)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="enrollTime"
          width=110
          label="报名时间">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="querydata.pageIndex"
        :page-size="querydata.pageSize"
        :total="querydata.pagetotal"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getEnrollMatchList} from 'api/game.js'

import {getList,getItemDrop,getparameter} from 'api/common.js'
import {importUrl} from 'api/config.js'
export default {
  data () {
    return {
      querydata:{
        matchType:'',
        clubId:JSON.parse(localStorage.getItem('user')).clubId,
        startTime:'',
        endTime:'',
        pageSize:10,
        page:1,
        pagetotal:new Number()
      },
      typeList: [],
      tableData: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  mounted () {
    this.querylist();
    this.queryEnum();
  },
  
  methods: {
    statusLabel(val){
      if(val.status==5){
        return '已过期'
      }
      if(val.status==2){
        return '已报名'
      }
      if(val.status==1){
        return '待审批'
      }
      return '报名'
    },
    handleEnroll(val){
      if(val.status==4||val.status==3){
        return ['maintain','listspan_blue']
      }else{
        return ['maintain','maintain_gray']
      }
      // if(val.status==4||val.status==3){
      //   ['maintain','maintain_gray','listspan_blue']
      // }
      
    },
    handleScore(val){
      if(val.status==4||val.status==3){
        if(val.isFull==1){
          this.$message.error('报名人数已满');
          return
        }
        this.$router.push({name:'club-enroll',query:{id:val.matchId,enrollId:val.enrollId,matchType:val.matchType,partTime:val.partTime}})
      }
        
        
      
    },
    timechange(){
      if(this.querydata.startTime !== '' && this.querydata.endTime !== ''&& this.querydata.startTime !== null && this.querydata.endTime !== null){
        if(this.time2unix(this.querydata.startTime)>this.time2unix(this.querydata.endTime)){
          this.$message({
            type: 'warning',
            message: '开始时间不能晚于结束时间！'
          });
          this.querydata.startTime = '';
          this.querydata.endTime = '';
        }else{
        }
      }
    },
    time2unix(_str){
      var date = new Date(_str);
      var time1 = date.getTime();
      return time1;
    },
    querylist(){
      getEnrollMatchList(this.querydata).then(res=>{
        // console.log(res)
        // console.log(res)
        if(res.code == 200){
          
          this.querydata.pagetotal = res.data.total;
          this.querydata.pageSize = res.data.pageSize;
          this.querydata.pageIndex = res.data.pageNum;
          this.tableData = res.data.list;
        }
      })
    },

    queryEnum() {
      getList('GameType').then(res=>{
        if(res.code==200){
          this.typeList=res.data
        }
      })

    },
    handleCurrentChange(val) {
      this.querylist();
    },

    



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello /deep/ .el-input__inner{
      line-height: 0;
}
.query-wrapper{
  img{
    width: 104px;
  }
}
.listspan{
  width: 52px;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
}
.listspan_green{background-color: #32D296;}
.listspan_red{background-color: #B30000;}
.listspan_blue{background-color: #1E87F0;}
.listspan_grey{background-color: #A0A0A0;}
.listspan_orange{
  background-color: #FF5500;
}
.listspan_yellow{
  background-color: #F0BA1E;
}
.maintain{
  width: 74px;
  height: 32px;
  display: inline-block;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

}
.maintain_gray{
  background-color:gainsboro;
  color: gray;
}
</style>

