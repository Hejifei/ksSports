<template>
  <div class="hello">
    <div class="listtitle">俱乐部管理</div>
    <div class="listSearchCout">
      <div class="listSearchC">
        <div class="listsecBox">
          <label>俱乐部名</label>
          <el-input
            placeholder=""
            v-model="querydata.clubName"
            size="small"
            clearable>
          </el-input>
        </div>
        <div class="listsecBox">
          <label>领队</label>
          <el-input
            placeholder=""
            v-model="querydata.leaderName"
            clearable>
          </el-input>
        </div>
        <div class="listsecBox">
          <label>教练员</label>
          <el-input
              placeholder=""
              v-model="querydata.coach"
              clearable>
            </el-input>
        </div>
        <div class="listsecBox">
          <label>注册时间</label>
          <el-date-picker
              v-model="querydata.regTimeStr"
              type="date"
              placeholder="选择日期"
              style="margin-right:0"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions0"
              @change="timechange"
              >
          </el-date-picker>
          <span>~</span>
          <el-date-picker
              v-model="querydata.regTimeEnd"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="timechange"
              >
          </el-date-picker>
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
          <label>类型</label>
          <el-select v-model="querydata.type" placeholder="类型">
              <el-option label="All" value="">
              </el-option>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </div>
        <el-row>
          <div class="listsecBox">
            <router-link :to='{name:"club-add"}'  class="addBtn">
            </router-link>
          </div>
          <div class="listsecBox">
            <a  @click="listedit()" class="editBtn"></a>
          </div>
          <div class="listsecBox">
            <a  @click="listdelete()" class="removehBtn"></a>
          </div>
        </el-row>

      </div>
      <div class="listsearchc">
        <div class="listsecBox">
          <a  @click="querylist()" class="searchBtn"></a>
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
          prop="clubName"
          label="俱乐部名">
          <template slot-scope="scope">
            <router-link type="text" class="el-button el-button--text" :to='{name:"club-add",query:{id:scope.row.id,type:"view"}}' >{{scope.row.clubName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="levelName"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="leaderName"
          label="领队">
        </el-table-column>
        <el-table-column
          prop="phone"
          width=120
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="coach"
          label="教练员">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.clubStatus === 1" class="listspan listspan_blue">{{scope.row.clubStatusName}}</span>
            <span v-if="scope.row.clubStatus === 2" class="listspan listspan_green">{{scope.row.clubStatusName}}</span>
            <span v-if="scope.row.clubStatus === 3" class="listspan listspan_red">{{scope.row.clubStatusName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width=100>
          <template slot-scope="scope">
            <router-link type="text" :to='{name:"club-add",query:{id:scope.row.id,type:"examine"}}' class="el-button el-button--text" v-if="scope.row.clubStatus==1">审批</router-link>
            <el-col v-else>审批</el-col>
          </template>
        </el-table-column>
        <el-table-column
          width=70
          label="人员流动记录">
          <template slot-scope="scope">
            <router-link type="text" :to='{name:"club-memRec",query:{id:scope.row.id}}' class="el-button el-button--text">查看</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          width=110
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updateUser"
          label="最新更新人">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          width=110
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
import {getClubList,removeClub} from 'api/club.js'
import {getList} from 'api/common.js'
export default {
  data () {
    return {
      test:[],
      fileList:[],
      querydata:{
        clubName:'',
        leaderName:'',
        coach:'',
        regTimeStr:'',
        regTimeEnd:'',
        status:'',
        type:'',
        pageSize:10,
        pageIndex:1,
        pagetotal:0
      },
      typeList: [],
      statusList: [],
      grouplist:[],
      tableData: [],
      selectIds:[],
      maxDate:new Date(),
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  created(){
    let self = this;
  },
  mounted () {
    let self = this;
    self.querylist();
    self.queryEnum();
  },
  methods: {

    timechange(){
      if(this.querydata.regTimeStr !== '' && this.querydata.regTimeEnd !== ''&& this.querydata.regTimeStr !== null && this.querydata.regTimeEnd !== null){
        if(this.querydata.regTimeStr!=this.querydata.regTimeEnd){
          // console.log(this.querydata.regTimeStr.toLocaleString(),this.querydata.regTimeEnd.toLocaleString())
          if(this.time2unix(this.querydata.regTimeStr)>this.time2unix(this.querydata.regTimeEnd)){
          this.$message({
            type: 'warning',
            message: '开始时间不能晚于结束时间！'
          });
          this.querydata.regTimeStr = '';
        }else{
        }
        }
      }
    },
    time2unix(_str){
      var date = new Date(_str);
      var time1 = date.getTime();
      return time1;
    },
    //编辑俱乐部
    listedit() {
      if(this.selectIds.length > 1){
        this.$message({
            type: 'warning',
            message: '每次只能编辑一项！'
        });
      }else if(this.selectIds.length === 1){
        this.$router.push({name:'club-edit',query:{'id':this.selectIds[0]}})
      }else{
        this.$message({
            type: 'warning',
            message: '您还没有勾选要编辑的项！'
        });
      }
    },

    //删除俱乐部
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
          removeClub(this.selectIds).then(res=>{
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
    querylist(){
      let self = this;
      getClubList(this.querydata).then(res=>{
        if(res.code == 200){
          self.querydata.pagetotal = res.data.total;
          self.querydata.pageSize = res.data.pageSize;
          self.querydata.pageIndex = res.data.pageNum;
          self.tableData = res.data.list;
        }
      })
    },
    queryEnum() {
      let self = this;
      getList('ApproveStatus').then(res=>{
          if(res.code == 200){
            self.statusList = res.data
          }
      })
      getList('ClubType').then(res=>{
        if(res.code == 200){
          self.typeList = res.data
        }
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.querylist();
    },
    handleSelectionChange(row) {
      // 获取列表选中项id
      this.selectIds = row.map((row)=>row.id);
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.query-wrapper{
  img{
    width: 104px;
  }
}
.el-button--text{text-decoration: none;}
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
</style>

