<template>
  <div class="hello">
    <!-- 下载 -->
    <form id="searchForm" :action="`${myapiUrl.apiUrl}/get/system/exportReferee`" method='get' style="display:none;">
      <input name="refereeName" v-model="querydata.refereeName"/>
      <input name="level" v-model="querydata.level"/>
      <input name="itemId" v-model="querydata.itemId"/>
      <input name="certTimeStr" v-model="querydata.certTimeStr"/>
      <input name="certTimeEnd" v-model="querydata.certTimeEnd"/>
      <input name="status" v-model="querydata.status"/>
    </form>
    <div class="listtitle">{{cmFrom !== 'judge' ? '裁判管理' : '其他裁判'}}</div>
    <div class="listSearchCout">
      <div class="listSearchC" style="padding-bottom:0;">
        <div class="listsecBox">
          <label>姓名</label>
          <el-input
            placeholder=""
            v-model="querydata.refereeName"
            size="small"
            clearable>
          </el-input>
        </div>
        <div class="listsecBox">
          <label>级别</label>
          <el-select v-model="querydata.level" placeholder="级别">
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
        <div class="listsecBox">
          <label>类别</label>
          <el-select v-model="querydata.itemId" placeholder="类别">
            <el-option label="All" value="">
            </el-option>
            <el-option
              v-for="item in itemlist"
              :key="item.typeId"
              :label="item.typeName"
              :value="item.typeId">
            </el-option>
          </el-select>
        </div>
        <div class="listsecBox">
          <label>获证时间</label>
          <el-date-picker
              v-model="querydata.certTimeStr"
              type="date"
              placeholder="选择日期"
              style="margin-right:0"
              :picker-options="pickerOptions0"
              @change="timechange"
              >
          </el-date-picker>
          <span>~</span>
          <el-date-picker
              v-model="querydata.certTimeEnd"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions0"
              @change="timechange"
              >
          </el-date-picker>
        </div>
        <!-- <el-row> -->
          <div class="listsecBox"  v-if="cmFrom !== 'judge'">
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
        <!-- </el-row> -->
      </div>
      <div class="listsearchc">
        <div class="listsecBox" style="height:50px;">
          <a  @click="querylist()" class="searchBtn"></a>
        </div>
      </div>
    </div>
    <div class="listSearchC" style="padding-top:0;" v-if="cmFrom !== 'judge'">
      <el-row>
        <el-col :span="12">
          <div class="listsecBox">
            <router-link :to='{name:"judge-add"}'  class="addBtn"></router-link>
          </div>
          <div class="listsecBox">
            <a  @click="listedit()" class="editBtn"></a>
          </div>
          <div class="listsecBox">
            <a  @click="listdelete()" class="removehBtn"></a>
          </div>
        </el-col>
        <el-col :span="12" class="texta_right">
          <div class="listsecBox">
          <a href="javascript:void(0)" class="exportBtn" @click="exportout" ></a>
        </div>
          <div class="listsecBox">
            <a href="javascript:void(0)" class="insetBtn" @click="insertIn"></a>
          </div>
          <div class="listsecBox">
            <a href="javascript:void(0)" class="downloadBtn" @click="download">导入模板下载</a>
          </div>
          <el-upload
            style="display:none;"
            class="upload-demo"
            name="uploadExcel"
            :action="importUrl"
            :before-upload="handleType"
            :on-success='imageChange'
            :file-list="fileList">
            <el-button id='insertBtn'>导入</el-button>
          </el-upload>
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
          prop="refereeName"
          label="姓名">
          <template slot-scope="scope">
            <router-link type="text" class="el-button el-button--text" :to='{name:"judge-add",query:{refereeId:scope.row.refereeId,type:"view"}}' >{{scope.row.refereeName}}</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="类别">
        </el-table-column>
        <el-table-column
          prop="levelName"
          label="级别">
        </el-table-column>
        <el-table-column
          prop="phone"
          width=120
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="duty"
          label="职务">
        </el-table-column>
        <el-table-column
          prop="clubStatusName"
          label="奖惩记录">
          <template slot-scope="scope">
            <router-link type="text" :to='{name:"judge-record",query:{refereeId:scope.row.refereeId}}' class="el-button el-button--text">查看</router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusName"
          v-if="cmFrom !== 'judge'"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1" class="listspan listspan_blue">{{scope.row.statusName}}</span>
            <span v-if="scope.row.status === 2" class="listspan listspan_green">{{scope.row.statusName}}</span>
            <span v-if="scope.row.status === 3" class="listspan listspan_red">{{scope.row.statusName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="cmFrom !== 'judge'">
          <template slot-scope="scope">
            <router-link type="text" :to='{name:"judge-add",query:{refereeId:scope.row.refereeId,type:"examine"}}' class="el-button el-button--text" v-if="scope.row.status==1">审批</router-link>
            <el-col v-else>审批</el-col>
          </template>
        </el-table-column>
        <el-table-column
          prop="createName"
          width=120
          v-if="cmFrom !== 'judge'"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          width=110
          v-if="cmFrom !== 'judge'"
          label="创建日期">
        </el-table-column>
        <el-table-column
          prop="updateUser"
          width=120
          v-if="cmFrom !== 'judge'"
          label="最新更新人">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          width=110
          v-if="cmFrom !== 'judge'"
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
import * as myapiUrl from 'api/config.js'
import {getRefereeList,removeReferee,getOtherRefereeList} from 'api/judge.js'
import {getList,getRefereeTypeDrop,getparameter} from 'api/common.js'
import {importUrl} from 'api/config.js'
export default {
  data () {
    return {
      myapiUrl:{},
      fileList:[],
      delIds:[],
      querydata:{
        refereeName:'',
        level:'',
        itemId:'',
        certTimeStr:'',
        certTimeEnd:'',
        status:'',
        pageSize:10,
        pageIndex:1,
        pagetotal:10
      },
      typeList: [],
      statusList: [],
      itemlist:[],
      tableData: [],
      certId:[],
      refereeId:[],
      apiUrl:'',
      importUrl:importUrl,
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      },
      cmFrom:''//来自裁判后台
    }
  },
  mounted () {
    if(this.$store.state.user.refereeId !== null){
      this.cmFrom = 'judge'
    }
    this.querylist();
    this.queryEnum();
    this.myapiUrl = myapiUrl;
    getparameter('REFEREE_EXCEL_IMPORT').then(res=>{
      this.apiUrl=res.data
    })
  },
  methods: {
    //对导入的文件类型做限制
    handleType(file){

      let re=/\.(?:xls|xlsx)$/i
      if(!re.test(file.name)){
        this.$message.error('文件类型必须为excel');
        return false
      }
    },
    timechange(){
      if(this.querydata.certTimeStr !== '' && this.querydata.certTimeEnd !== ''&& this.querydata.certTimeStr !== null && this.querydata.certTimeEnd !== null){
        if(this.time2unix(this.querydata.certTimeStr)>this.time2unix(this.querydata.certTimeEnd)){
          this.$message({
            type: 'warning',
            message: '开始时间不能晚于结束时间！'
          });
          this.querydata.certTimeStr = '';
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
      if(this.cmFrom !== 'judge'){
        getRefereeList(this.querydata).then(res=>{
          if(res.code == 200){
            this.querydata.pagetotal = res.data.total;
            this.querydata.pageSize = res.data.pageSize;
            this.querydata.pageIndex = res.data.pageNum;
            this.tableData = res.data.list;
          }
        })
      }else{
        getOtherRefereeList(this.querydata).then(res=>{
          if(res.code == 200){
            this.querydata.pagetotal = res.data.total;
            this.querydata.pageSize = res.data.pageSize;
            this.querydata.pageIndex = res.data.pageNum;
            this.tableData = res.data.list;
          }
        })
      }
    },
    download(){
      window.location.href=this.apiUrl
    },
    exportout(){
      var form = document.getElementById('searchForm');
      form.submit();
    },
    insertIn(){
      // 导入
      document.getElementById('insertBtn').click();
    },
    imageChange(response, file, fileList){
      this.$message({
        type: 'success',
        message: response.desc
      });
      this.querylist();
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
    },

    queryEnum() {
      getList('ApproveStatus').then(res=>{
          if(res.code == 200){
            this.statusList = res.data

          }
      })
      getList('ProjectLevel').then(res=>{
        if(res.code == 200){
          this.typeList = res.data
        }
      })
      getRefereeTypeDrop().then(res=>{
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
        this.$router.push({name:'judge-edit',query:{'refereeId':this.refereeId[0]}})
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
      this.refereeId= val.map((val)=>val.refereeId);
      this.certId= val.map((val)=>val.certId);
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
          removeReferee({refereeId:this.refereeId,certId:this.certId}).then(res=>{
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
</style>

