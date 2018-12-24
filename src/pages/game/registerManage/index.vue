<template>
  <div class="hello">
    <!-- 下载 -->
      <form id="searchForm" :action="`${importUrl}/get/match/enrollMatchExport`" method='get' style="display:none;">
        <input name="matchProject" v-model="querydata.matchProject"/>
        <input name="matchName" v-model="querydata.matchName"/>
        <input name="clubName" v-model="querydata.clubName"/>
        <input name="startTime" v-model="querydata.startTime"/>
        <input name="endTime" v-model="querydata.endTime"/>
        <input name="status" v-model="querydata.status"/>
        <input name="matchType" v-model="querydata.matchType"/>
      </form>
    <div class="listtitle">报名列表</div>
    <div class="listSearchCout">
      <div class="listSearchC">
        <div class="listsecBox">
          <label>报名赛事</label>
          <el-input
            placeholder=""
            v-model="querydata.matchName"
            size="small"
            clearable>
          </el-input>
        </div>
        <div class="listsecBox">
          <label>报名项目</label>
          <el-select v-model="querydata.matchProject" placeholder="项目">
            <el-option label="All" value="">
            </el-option>
            <el-option
              v-for="item in itemlist"
              :key="item.value"
              :label="item.itemName"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="listsecBox">
          <label>俱乐部</label>
          <el-input
            placeholder=""
            v-model="querydata.clubName"
            size="small"
            clearable>
          </el-input>
        </div>
        
        <div class="listsecBox">
          <label>报名时间</label>
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
          <label style="width:55px;display:inline-block;text-align:right;">状态</label>
          <el-select v-model="querydata.status" placeholder="状态">
            <el-option label="All" value="">
            </el-option>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
       
      </div>
      <div class="listsearchc">
        <div class="listsecBox" style="height:50px;">
          <a  @click="querylist()" class="searchBtn"></a>
        </div>
        <div class="listsecBox">
          <a href="javascript:void(0)" class="exportBtn" @click="exportout" ></a>
        </div>
      </div>
    </div>
    <div class="listtableC">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
          label="选择"
          type="selection"
          width='50'
          >
        </el-table-column>
        <el-table-column
          label="俱乐部">
          <template slot-scope="scope">
            <router-link type="text" class="el-button el-button--text" :to='{name:"approval-enroll",query:{id:scope.row.enrollId,type:"view",matchId:scope.row.matchId}}' >{{scope.row.clubName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目">
        </el-table-column>
        <el-table-column
          prop="matchName"
          label="赛事名称">
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别">
          <template slot-scope="scope">
            <span>
              {{scope.row.levelLabel}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="leader"
          label="领队">
        </el-table-column>
        <el-table-column
          prop="phone"
          width="120"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="number"
          label="队伍人数">
        </el-table-column>
        <el-table-column
          prop="enrollTime"
          width="150"
          label="报名时间">
        </el-table-column>
        <el-table-column
          prop="statusLabel"
          label="状态">
          <template slot-scope="scope">
            <span :class="[
            'listspan',
            {listspan_green:scope.row.status==2},
            {listspan_blue:scope.row.status==1},
            {listspan_red:scope.row.status==3},

            ]">
              {{scope.row.statusLabel}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span @click="approval(scope.row)" style="cursor:pointer;" :class="['gray',{active:scope.row.status==1}]">审批</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="createTime"
          width=110
          label="创建日期">
        </el-table-column> -->
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="querydata.page"
        :page-size="querydata.pageSize"
        :total="querydata.pagetotal"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getEnrollList,removeMatch,enrollMatchExport} from 'api/game.js'

import {getList,getItemDrop,getparameter} from 'api/common.js'
import {apiUrl} from 'api/config.js'
export default {
  data () {
    return {
      fileList:[],
      delIds:[],
      querydata:{
        matchProject:'',
        matchName:'',
        clubName:'',
        startTime:'',
        endTime:'',
        status:'',
        matchType:1,
        pageSize:10,
        page:1,
        pagetotal:new Number()
      },
      typeList: [],
      statusList: [],
      itemlist:[],
      tableData: [],
      certId:[],
      refereeId:[],
      apiUrl:'',
      importUrl:apiUrl,
    }
  },
  mounted () {
    this.querylist();
    this.queryEnum();
    // enrollMatchExport().then(res=>{
    //   this.apiUrl=res.data
    //   debugger
    //   console.log(this.apiUrl)
    // })
  },
  computed:{
  },
  methods: {
    level(val){
      if(val===1) return '甲级'
      if(val===2) return '乙级'
      if(val===3) return '丙级'
    },
    approval(val){
      if(val.status==1){
        this.$router.push({name:'approval-enroll',query:{id:val.enrollId,matchId:val.matchId,matchlevel:val.level}})
      }
    },
    exportout(){
      var form = document.getElementById('searchForm');
      form.submit();
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
      getEnrollList(this.querydata).then(res=>{
        // console.log(res)
        // console.log(res)
        if(res.code == 200){
          this.querydata.pagetotal = res.data.total;
          this.querydata.pageSize = res.data.pageSize;
          this.querydata.page = res.data.pageNum;
          this.tableData = res.data.list;
        }
      })
    },
    download(){
      window.location.href=this.apiUrl
    },

    queryEnum() {
      getList('ApproveStatus').then(res=>{
          if(res.code == 200){
            this.statusList = res.data

          }
      })
      getItemDrop(1).then(res=>{
        if(res.code==200){
          this.itemlist=res.data
        }
      })

    },
    handleCurrentChange(val) {
      this.querylist();
    },

    handleSelectionChange(val) {
      // 获取列表选中项id
      this.refereeId= val.map((val)=>val.matchId);
    }
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
}
.gray{
  color: #A0A0A0;
  font-size: 16px;

}
.active{
  color: #009BFF;
}

</style>

