<template>
  <div class="hello">
    <div class="listtitle">运动员管理</div>
    <div class="listSearchC">
      <div class="listsecBox">
        <label>姓名</label>
        <el-input
            placeholder=""
            v-model="querydata.playerName"
            size="small"
            clearable>
          </el-input>
      </div>
      <div class="listsecBox">
        <label>身份证号/护照</label>
        <el-input
            placeholder=""
            v-model="querydata.idCardNo"
            clearable>
        </el-input>
      </div>
      <div class="listsecBox" v-show="$route.name!='clubsport-manage'">
        <label>所属俱乐部</label>
        <el-select v-model="querydata.clubId" placeholder="">
          <el-option label="All" value="">
          </el-option>
          <el-option
            v-for="item in clubs"
            :key="item.id"
            :label="item.clubName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="listsecBox">
        <label>处罚情况</label>
        <el-select v-model="querydata.punishStatus" placeholder="">
          <el-option label="All" value="">
          </el-option>
          <el-option
            v-for="item in punishStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="listsecBox">
        <a  @click="querylist()" class="searchBtn"></a>
      </div>
      <br />
      <el-row>
        <div class="listsecBox">
          <router-link :to='router()'  class="addBtn">
          </router-link>
        </div>
        <div class="listsecBox">
          <a  @click="listedit()" class="editBtn"></a>
        </div>
        <div class="listsecBox">
          <a  @click="listdelete()" class="removehBtn"></a>
        </div>
        <div v-show="$route.name=='clubsport-manage'" class="listsecBox cursor" style="float:right">
          <router-link :to="{name:'all-record'}" tag="span" class="flow">人员流动记录</router-link>
        </div>
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
          prop="playerName"
          label="姓名">
          <template slot-scope="scope">
            <router-link type="text" class="el-button el-button--text" :to="{name:$route.name=='clubsport-manage'?'clubsport-add':'sport-add',query:{id:scope.row.id,type:'view'}}" >{{scope.row.playerName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="idCardNo"
          label="身份证号/护照">
        </el-table-column>
        <el-table-column
          prop="socialNo"
          label="社保号码">
        </el-table-column>
        <el-table-column
          prop="clubName"
          label="所属俱乐部" v-if="$route.name !== 'clubsport-manage'">
        </el-table-column>
        <el-table-column
          prop="punishStatusName"
          label="处罚情况">
          <template slot-scope="scope">
            <span v-if="scope.row.punishCount === 0" class="">{{scope.row.punishStatusName}}</span>
            <span v-if="scope.row.punishCount > 0" class="red">{{scope.row.punishStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="leaderName"
          label="转会和处罚记录">
          <template slot-scope="scope">
            <router-link type="text" :to="{name:$route.name=='clubsport-manage'?'clubsport-record':'sport-record',query:{id:scope.row.id}}" class="el-button el-button--text">查看</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updateUser"
          label="最新更新人">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="最新更新日期">
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
import {getPlayerList,removePlayer} from 'api/player.js'
import {getList,getClubDrop} from 'api/common.js'
export default {
  data () {
    return {
      fileList:[],
      delIds:[],
      querydata:{
        playerName:'',
        idCardNo:'',
        clubId:'',
        punishStatus:'',
        pageSize:10,
        pageIndex:1,
        pagetotal:0
      },
      tableData: [],
      selectIds:[],
      punishStatusList:[],
      clubs:[]
    }
  },
  created(){
    let self = this;
  },
  mounted () {
    this.querydata.clubId = JSON.parse(localStorage.getItem('user')).clubId
    let self = this;
    this.querylist();
    this.queryEnum();
    this.getClubs();
    this.router()

  },
  methods: {
    router(){
      if(this.$route.name=='clubsport-manage'){
        return {name:'clubsport-add',query:{'clubId':JSON.parse(localStorage.getItem('user')).clubId}}
      }else{
        return {name:"sport-add"}
      }
    },

    querylist(){
      let self = this;
      getPlayerList(this.querydata).then(res=>{
        self.querydata.pagetotal = res.data.total;
        self.querydata.pageSize = res.data.pageSize;
        self.querydata.pageIndex = res.data.pageNum;
        self.tableData = res.data.list;
      })
    },
    queryEnum() {
      let self = this;
      getList('ExistType').then(res=>{
        if(res.code == 200){
          self.punishStatusList = res.data
        }
      });
    },
    getClubs(type) {
      getClubDrop(type).then(res=>{
        this.clubs = res.data
      })
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.querylist();
    },
    handleSelectionChange(row) {
      // 获取列表选中项id
      this.selectIds = row.map((row)=>row.id);
    },
    listdelete() {
      let self = this;
      if(this.selectIds.length === 0){
        this.$message({
            type: 'warning',
            message: '您还没有勾选要删除的项！'
        });
      }else{
        self.$confirm('确认删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          removePlayer(this.selectIds).then(res=>{
            this.$message.success(res.desc);
            self.querylist();
          })
        }).catch(() => {
            self.$message({
              type: 'info',
              message: '已取消删除'
            });
        });
      }
    },
    listedit() {
      if(this.selectIds.length > 1){
        this.$message({
            type: 'warning',
            message: '每次只能编辑一项！'
        });
      }else if(this.selectIds.length === 1){
        if(this.$route.name=='clubsport-manage'){
          this.$router.push({name:'clubsport-edit',query:{'id':this.selectIds[0]}})
        }else{
          this.$router.push({name:'sport-edit',query:{'id':this.selectIds[0]}})
        }
      }else{
        this.$message({
            type: 'warning',
            message: '您还没有勾选要编辑的项！'
        });
      }
    },



  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.query-wrapper{
  img{
    width: 104px;
  }
}
.listSearchC .listsecBox .flow{
  width: 104px;
  height: 36px;
  line-height: 36px;
  color:white!important;
  background: #006DB3;
  text-align: center;
  border-radius: 4px;
  // padding: 5px;
  font-size: 14px;
}
.red{
  color: #FF0000;
}
</style>

