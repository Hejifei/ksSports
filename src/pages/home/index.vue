<template>
  <div>
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-table
          :data="sysTable"
          style="width: 100%">
          <el-table-column
            label="系统通知"
            width="180">
            <template slot-scope="scope">
              <span class="red-point" v-if="scope.row.readFlag == 0"></span>
              <div> {{scope.row.noticeTitle}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label=""
            width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <el-table
          :data="matchTable"
          style="width: 100%">
          <el-table-column
            label="赛事通知"
            width="180">
            <template slot-scope="scope">
              <span class="red-point" v-if="scope.row.readFlag == 0"></span>
              <div> {{scope.row.noticeTitle}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            width="180">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
  </div>
</template>
<script>
import {getSystemHome} from 'api/home'
export default {
  data () {
    return {
      sysTable: [],
      matchTable:[]
    }
  },
  mounted(){
    
  },
  created: function () {
    this.initForm()
  },
  methods: {
    initForm () {
      getSystemHome().then(res => {
        this.loading = false
        const data = res.data;
        if (data.code == 200) {
          this.matchTable = data.matchNotice
          this.sysTable = data.sysNotice
        } else {
          this.$message.error(data.desc)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .red-point{
    content: " ";
    border: 3px solid red;/*设置红色*/
    border-radius:3px;/*设置圆角*/
    position: absolute;
    z-index: 1000;
    margin-right: -5px;
    margin-top: -5px;
  }
</style>
