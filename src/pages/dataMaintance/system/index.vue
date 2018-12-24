<template>
  <div class="hello">
    <div class="listtitle">系统参数</div>
    <div class="listSearchC">
      <div class="listsecBox">
        <a  @click="listedit()" class="editBtn"></a>
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
          prop="key"
          label="参数">
        </el-table-column>
        <el-table-column
          prop="desc"
          label="描述">
        </el-table-column>>
        <el-table-column
          prop="value"
          label="值">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getSysParameterList} from 'api/dataMaintance.js'
import store from '@/store'
export default {
  data () {
    return {
      querydata:{
      },
      tableData: [],
      selectIds:[]
    }
  },
  mounted () {
    let self = this;
    self.querylist();
  },
  methods: {
    ...mapActions(['SetSysPara']),
    //编辑
    listedit() {
      if(this.selectIds.length > 1){
        this.$message({
            type: 'warning',
            message: '每次只能编辑一项！'
        });
      }else if(this.selectIds.length === 1){
        this.SetSysPara((this.tableData.filter(val=>val.id === this.selectIds[0]))[0]).then(res => {
          this.$router.push({name:'systemDateEdit'})
        })
        
      }else{
        this.$message({
            type: 'warning',
            message: '您还没有勾选要编辑的项！'
        });
      }
    },

    querylist(){
      let self = this;
      getSysParameterList({}).then(res=>{
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

