<template>
  <div class="hello">
    <div class="listtitle">赛事管理</div>
    <div class="listSearchC">
      <div class="listsecBox">
        <label>赛事名称</label>
        <el-input
          placeholder=""
          v-model="querydata.matchName"
          size="small"
          clearable>
        </el-input>
      </div>
      <div class="listsecBox">
        <label>项目</label>
        <el-select v-model="querydata.machProjectId" placeholder="项目">
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
          <label>状态</label>
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
      <el-row>
        <el-col :span="12">
          <div class="listsecBox">
            <router-link :to='{name:"game-add"}'  class="addBtn">
            </router-link>
            <!-- <a  class="addBtn"></a> -->
          </div>
          <div class="listsecBox">
            <a  @click="listedit()" class="editBtn"></a>
          </div>
          <div class="listsecBox">
            <a  @click="listdelete()" class="removehBtn"></a>
          </div>
        </el-col>

      </el-row>


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
          prop="statusLabel"
          label="状态">
          <template slot-scope="scope">
            <span :class="[
            'listspan',
            {listspan_green:scope.row.status==4},
            {listspan_blue:scope.row.status==1},
            {listspan_orange:scope.row.status==2},
            {listspan_yellow:scope.row.status==3},
            {listspan_red:scope.row.status==5},

            ]">
              {{scope.row.statusLabel}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="通过队伍/报名队伍">
          <template slot-scope="scope">
            <div>{{scope.row.passTeam}}/{{scope.row.enrollTeam}}</div>
          </template>
        </el-table-column>
         <el-table-column
            width="50"
            prop="enrollPlayer"
            label="报名人数">
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <span @click="handleScore(scope.row)" :class="['maintain',{maintain_gray:scope.row.status!==4 && scope.row.status!==5},{listspan_blue:scope.row.status===4 || scope.row.status===5}]">成绩维护</span>
            <span @click="handleOrder(scope.row)" :class="['maintain',{maintain_gray:(scope.row.status===1 || scope.row.status===2)},{listspan_blue:(scope.row.status!==1 && scope.row.status!==2)}]">秩序册</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          width=110
          label="创建日期">
        </el-table-column>
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
import {getMatchManagementList,removeMatch} from 'api/game.js'

import {getList,getItemDrop,getparameter} from 'api/common.js'
import {importUrl} from 'api/config.js'
export default {
  data () {
    return {
      fileList:[],
      delIds:[],
      querydata:{
        matchType:1,
        matchName:'',
        machProjectId:'',
        status:'',
        startTime:'',
        endTime:'',
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
      importUrl:importUrl,
    }
  },
  mounted () {
    this.querylist();
    this.queryEnum();
    getparameter('REFEREE_EXCEL_IMPORT').then(res=>{
      this.apiUrl=res.data
      // console.log(this.apiUrl)
    })
    this.querydata.machProjectId = this.$route.query.typeId !== undefined ? parseInt(this.$route.query.typeId) : '';
  },
  methods: {
    handleScore(val){
      if(val.status===4 || val.status===5){
        this.$router.push({name:'game-score',query:{id:val.matchId,matchName:val.matchName}})
      }
    },
    handleOrder(val){
      if(val.status!==1 && val.status!==2){
        this.$router.push({name:'order-book',query:{id:val.matchId}})
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
      getMatchManagementList(this.querydata).then(res=>{
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
      getList('GameStatus').then(res=>{
          if(res.code == 200){
            this.statusList = res.data

          }
      })
      getList('ProjectLevel').then(res=>{
        if(res.code == 200){
          this.typeList = res.data
        }
      })
      getItemDrop(1).then(res=>{
        if(res.code==200){
          this.itemlist=res.data
        }
      })

    },
    //编辑裁判
    listedit() {
      if(this.refereeId.length > 1){
        this.$message({
            type: 'warning',
            message: '每次只能编辑一项！'
        });
      }else if(this.refereeId.length === 1){
        this.$router.push({name:'game-edit',query:{'id':this.refereeId[0]}})
      }else{
        this.$message({
            type: 'warning',
            message: '您还没有勾选要编辑的项！'
        });
      }
    },
    handleCurrentChange(val) {
      this.querylist();
    },

    handleSelectionChange(val) {
      // 获取列表选中项id
      this.refereeId= val.map((val)=>val.matchId);
    },
    //刪除裁判
    listdelete() {
      if(this.refereeId.length === 0){
        this.$message({
            type: 'warning',
            message: '您还没有勾选要删除的项！'
        });
      }else{
        this.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          removeMatch({deleteIds:this.refereeId}).then(res=>{
            this.$message.success(res.desc);
            this.querylist();
          })
        }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
        });
      }
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

