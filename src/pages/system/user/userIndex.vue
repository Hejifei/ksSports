
  <template>
    <div>
        <div class="listtitle">
            用户管理
        </div>
        <div class="listSearchC">
            <div class="listsecBox">
                <router-link :to='{name:"userAdd"}'  class="addBtn">
                </router-link>
            </div>
            <div class="listsecBox">
                <a  @click="listedit()" class="editBtn"></a>
            </div>
            <div class="listsecBox">
                <a  @click="listdelete()" class="removehBtn"></a>
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
            prop="username"
            label="用户名">
            </el-table-column>
            <el-table-column
            prop="account"
            label="账号">
            </el-table-column>
            <el-table-column
            label="状态">
                <template slot-scope="scope">
                    <a class="staChanBtn" v-show="scope.row.id!=1"  @click="userStaCha(scope.row)">{{scope.row.statusName}}</a>
                    <span v-show="scope.row.id==1">{{scope.row.statusName}}</span>
                </template>
                <!-- <template slot-scope="scope">
                    <a class="staChanBtn"  @click="userStaCha(scope.row)">{{scope.row.statusName}}</a>
                </template> -->
              
            </el-table-column>
            <el-table-column
            prop="roleName"
            :show-overflow-tooltip='true'
            label="角色类型">
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
import { userDel,userList,updateStatus } from '@/api/systemUser'

export default {
    data() {
    return {
        querydata:{
            pageIndex: 1,
            pageSize:10,
            pagetotal:0
        },
        tableData: [],
        selectIds:[]
    }
    },
    methods:{
        //编辑
        listedit() {
            if(this.selectIds.length > 1){
                this.$message({
                    type: 'warning',
                    message: '每次只能编辑一项！'
                });
            }else if(this.selectIds.length === 1){
                if(this.selectIds[0]==1){
                  this.$message({
                    type: 'warning',
                    message: '该账户为admin账户，不允许操作'
                  });
                  return
                }
                let useredit =  (this.tableData.filter(val=>val.id === this.selectIds[0]))[0];
                sessionStorage.useredit = JSON.stringify(useredit);
                this.$router.push({name:'userAdd',query:{'id':this.selectIds[0]}})
            }else{
                this.$message({
                    type: 'warning',
                    message: '您还没有勾选要编辑的项！'
                });
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
                if(this.selectIds[0]==1){
                  this.$message({
                    type: 'warning',
                    message: '该账户为admin账户，不允许操作'
                  });
                  return
                }
                self.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                userDel({deleteIds:this.selectIds}).then(res=>{
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
            let self = this;
            userList(this.querydata).then(res=>{
                if(res.code === 200){
                    self.tableData = res.data.list;
                    self.querydata.pagetotal = res.data.total;
                    self.querydata.pageSize = res.data.pageSize;
                    self.querydata.pageIndex = res.data.pageNum;
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
        userStaCha(rowval){
          // if(rowval.id==1){
          //       this.$message({
          //           type: 'warning',
          //           message: '该账户为admin账户，不允许编辑'
          //         });
          //         return
          //   }
            this.$confirm('确认修改用户状态?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
              
                updateStatus({id:rowval.id,status:rowval.status}).then(res=>{
                    this.$message({
                        message: res.desc,
                        type: 'success'
                    });
                    this.querylist();
                })
            }).catch(() => {
                self.$message({
                type: 'info',
                message: '已取消修改！'
                });
            });
            
        }
    },
    mounted() {
        this.querylist();
    },
}
  </script>

  <style lang="less" scoped>
      .button-top{
          padding-top: 10px;

      }
      .title{
        font-size: 20px;
        font-weight:bolder;
        border-bottom: 3px solid black;
        padding-bottom: 10px;
        padding-left: 30px;
      }

      .userFormTbl{
        width: 100%; 
      }
      .userFormTbl td:first-child{
          width: 30%;
          height: 50px;
      }

      .userFormTbl td:nth-child(2){
          width: 70%;
          height: 50px;
      }
      .tblRowColor{
          background-color:blue
      }
    .staChanBtn{color: #006DB3;cursor: pointer;}  
  </style>
  