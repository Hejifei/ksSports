<template>
  <div class="hello">
    <div class="listtitle">裁判类型</div>
    <div class="listSearchC">

      <div class="listsecBox">
        <router-link :to='{name:"refereeTAdd"}'  class="addBtn">
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
          prop="name"
          label="类别名称">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建日期">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getRefereeTypeList,removeRefereeType} from 'api/dataMaintance.js'
export default {
  data () {
    return {
      test:[],
      fileList:[],
      querydata:{
      },
      statusList: [],
      tableData: [],
      selectIds:[]
    }
  },
  created(){
    let self = this;
  },
  mounted () {
    let self = this;
    self.querylist();
  },
  methods: {
    //编辑
    listedit() {
      if(this.selectIds.length > 1){
        this.$message({
            type: 'warning',
            message: '每次只能编辑一项！'
        });
      }else if(this.selectIds.length === 1){
        this.$router.push({name:'refereeTAdd',query:{'id':this.selectIds[0]}})
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
          removeRefereeType({ids:this.selectIds}).then(res=>{
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
      getRefereeTypeList({}).then(res=>{
        if(res.code === 200){
          self.tableData = res.data;
        }
      })
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
.listimg{width:80px;height: 35px;}
</style>

