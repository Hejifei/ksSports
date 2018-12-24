
  <template>
    <div>
        <div class="listtitle">
            角色管理
        </div>
        <div class="listSearchC">
            <div class="listsecBox">
                <router-link :to='{name:"roleAdd"}'  class="addBtn">
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
                prop="roleName"
                label="角色名称">
                </el-table-column>
                <el-table-column
                prop="roleDes"
                label="角色描述">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <a class="staChanBtn" @click="authorize(scope.row.id)">授权</a>
                    </template>
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
        <el-dialog
            title="角色授权"
            :visible.sync="dialogVisible" class="dialog-authorize">
            <div class="authorizeTreeC">
                <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
                </el-input>
                <el-tree
                    class="filter-tree"
                    :data="menutree"
                    :default-checked-keys="aTreekeysChecked"
                    show-checkbox
                    node-key="id"
                    :props="defaultProps"
                    :filter-node-method="filterNode"
                    ref="authorizeTree">
                </el-tree>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="authorizeSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </template>

  <script>
    import {roleDel,roleList,getResListByRole,modifyRolePower } from '@/api/systemRole'

    export default {
      data() {
        return {
            querydata:{
                pageIndex: 1,
                pageSize:10,
                pagetotal:0
            },
            tableData: [],
            selectIds:[],
            menutree:[],
            aTreekeysChecked:[],
            dialogVisible:false,
            authorizeId:'',
            filterText:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
      },
      watch: {
            filterText(val) {
                this.$refs.authorizeTree.filter(val);
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
                let useredit =  (this.tableData.filter(val=>val.id === this.selectIds[0]))[0];
                sessionStorage.useredit = JSON.stringify(useredit);
                this.$router.push({name:'roleAdd',query:{'id':this.selectIds[0]}})
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
                self.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                roleDel({deleteIds:this.selectIds}).then(res=>{
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
        // 列表
        querylist(){
            let self = this;
            roleList(this.querydata).then(res=>{
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
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        // 授权
        authorize(id){
            getResListByRole({id:id}).then(res=>{
                let menutree = [];
                let aTreekeysChecked = [];
                let result = res.data;
                result.map((listson)=>{
                    let son =new Object;
                    son.id= listson.id;
                    son.label = listson.name;
                    if(listson.checked){aTreekeysChecked.push(Number(listson.id))}
                    if(listson.nodes !== null ){
                        let menusec = [];
                        // 去除子节点未全选的父节点id
                        let listsonselNum = 0;
                        listson.nodes.map((val)=>{
                            menusec.push({'id':val.id,'label':val.name})
                            if(val.checked){aTreekeysChecked.push(Number(val.id));listsonselNum++;}
                        })
                        son.children = menusec;
                        if(listson.nodes.length !== listsonselNum && aTreekeysChecked.indexOf(listson.id) !== -1){
                            aTreekeysChecked.splice(aTreekeysChecked.findIndex(v=>v === listson.id),1);
                        }
                    }
                    menutree.push(son)
                })
                this.menutree = menutree;
                this.aTreekeysChecked = aTreekeysChecked;
                this.filterText = '';
                // document.getElementsByClassName('el-input__inner').value='';
                this.dialogVisible= true;
                this.authorizeId = id;
            })
        },
        authorizeSubmit(){
            let listsel = this.$refs.authorizeTree.getCheckedKeys();
            // 若子节点未全选，提交数据时 添加父节点id
            let newlistsel = this.menutree.filter(val=>{
                if(val.children !== undefined){
                    let sonchiled = val.children.map(child=>child.id);
                    for(let i in sonchiled){
                        if(listsel.indexOf(sonchiled[i]) !== -1){
                            if(listsel.indexOf(val.id) === -1){
                                listsel.push(val.id);
                            }
                        }
                    }
                }
            })
            // console.log(this.$refs.authorizeTree.getCheckedKeys())
            // 授权提交
            modifyRolePower({'roleId':this.authorizeId,'resIdList':listsel}).then(res=>{
                this.$message({
                    type: 'success',
                    message: res.desc
                });
            });
            this.dialogVisible = false;
        },
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

       .staChanBtn{color: #006DB3;cursor: pointer;}

    .dialog-authorize .dialog-footer{justify-content: flex-end;}
  </style>
