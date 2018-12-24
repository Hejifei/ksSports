<template>
  <div class="hello">
    <div class="listtitle">通知管理</div>
    <div class="listSearchC">
      <div class="listsecBox">
        <label>通知标题</label>
        <el-input
          placeholder=""
          v-model="querydata.noticeTitle"
          size="small"
          clearable>
        </el-input>
      </div>
      <div class="listsecBox">
        <label>通知类型</label>
        <el-select v-model="querydata.noticeType" placeholder="通知类型">
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
        <label>创建时间</label>
        <el-date-picker
            v-model="querydata.startTime"
            type="date"
            placeholder="选择日期"
            style="margin-right:0"
            :picker-options="pickerOptions0"
            @change="timechange"
            >
        </el-date-picker>
        <span>~</span>
        <el-date-picker
            v-model="querydata.endTime"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0"
            @change="timechange"
            >
        </el-date-picker>
      </div>
      <div class="listsecBox">
        <a  @click="querylist()" class="searchBtn"></a>
      </div>
      <br />
      <el-row>
        <div class="listsecBox">
          <router-link :to='{name:"notify-add"}'  class="addBtn">
          </router-link>
          <!-- <a  class="addBtn"></a> -->
        </div>
        <div class="listsecBox">
          <a  @click="listdelete()" class="removehBtn"></a>
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
          label="通知标题">
          <template slot-scope="scope">
            <router-link type="text" v-if="scope.row.noticeType === 1" class="el-button el-button--text" :to='{name:"notify-system",query:{id:scope.row.noticeId}}' >{{scope.row.noticeTitle}}</router-link>
            <router-link type="text" v-else-if="scope.row.noticeType === 2 && scope.row.noticeMatchType === 3" class="el-button el-button--text" :to='{name:"notify-other",query:{id:scope.row.noticeId}}' >{{scope.row.noticeTitle}}</router-link>
            <router-link type="text" v-else-if="scope.row.noticeType === 2 && scope.row.noticeMatchType === 1" class="el-button el-button--text" :to='{name:"notify-orderbook",query:{id:scope.row.noticeId}}' >{{scope.row.noticeTitle}}</router-link>
            <router-link type="text" v-else-if="scope.row.noticeType === 2 && scope.row.noticeMatchType === 2" class="el-button el-button--text" :to='{name:"notify-score",query:{id:scope.row.noticeId}}' >{{scope.row.noticeTitle}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="noticeTypeLabel"
          label="通知类型">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
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
import {getNoticeList,removeNotice} from 'api/notify.js'
import {getList} from 'api/common.js'
export default {
  data () {
    return {
      test:[],
      fileList:[],
      querydata:{
        noticeTitle:'',
        noticeType:'',
        startTime:'',
        endTime:'',
        pageSize:10,
        page:1,
        pagetotal:0
      },
      statusList: [],
      tableData: [],
      selectIds:[],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  created(){
  },
  mounted () {
    this.querylist();
    this.notifytypeGet();
  },
  methods: {
    timechange(){
      if(this.querydata.startTime !== '' && this.querydata.endTime !== '' && this.querydata.startTime !== null && this.querydata.endTime !== null){
        if(this.time2unix(this.querydata.startTime)>this.time2unix(this.querydata.endTime)){
          this.$message({
            type: 'warning',
            message: '开始时间不能晚于结束时间！'
          });
          this.querydata.startTime = '';
          this.querydata.endTime = '';
        }
      }
    },
    time2unix(_str){
      var date = new Date(_str);
      var time1 = date.getTime();
      return time1;
    },
    // 通知类型获取
    notifytypeGet(){
      getList('NoticeTyep').then(res=>{
        this.statusList =  res.data;
      })
    },
    //编辑
    listedit() {
      if(this.selectIds.length == 1){
        this.$router.push({name:'club-edit',params:{'id':this.selectIds[0]}})
      }
    },

    //删除
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
          removeNotice(this.selectIds).then(res=>{
            this.$message({
              message: res.desc,
              type: 'success'
            });
            this.querylist();
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
      getNoticeList(this.querydata).then(res=>{
        this.querydata.pagetotal = res.data.total;
        this.querydata.pageSize = res.data.pageSize;
        this.querydata.page = res.data.pageNum;
        this.tableData = res.data.list;
      })
    },
    handleCurrentChange(val) {
      // 分页
      this.querylist();
    },
    handleSelectionChange(row) {
      // 获取列表选中项id
      this.selectIds = row.map((row)=>row.noticeId);
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello /deep/ .el-input__inner{
      line-height: 0;
}
.el-button--text{text-decoration: none;}
</style>

