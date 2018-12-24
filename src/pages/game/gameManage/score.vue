
  <template>
    <div class='score-wrapper'>
        <div class="listtitle">
            <img @click="back" class="back" src="../../../assets/img/back.png" alt="">
            比赛成绩维护
        </div>
        <el-row>
          <el-col>
            <div class="title">{{matchName}}</div>
          </el-col>
        </el-row>
        <div class="listtableC">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            >
            
            <el-table-column
            prop="clubName"
            label="俱乐部">
            </el-table-column>
            <el-table-column
            prop="levelLabel"
            label="级别">
            </el-table-column>
            
            <el-table-column
            prop="leader"
            :show-overflow-tooltip='true'
            label="领队">
            </el-table-column>
            <el-table-column
            prop="number"
            :show-overflow-tooltip='true'
            label="队伍人数">
            </el-table-column>
            <el-table-column
            width="100"
            :show-overflow-tooltip='true'
            label="积分">
            <template slot-scope="scope">
              <el-input @input="handleInput(scope.row)" v-model.number="scope.row.integral"
                ></el-input>
            </template>
            </el-table-column>
            <el-table-column
            width="100"
            :show-overflow-tooltip='true'
            label="排名">
            <template slot-scope="scope">
              <el-input  v-model="scope.row.rank"  @input="handleInput2(scope.row)"
                ></el-input>
            </template>
            </el-table-column>
        </el-table>
        <el-row style="margin-top:20px;">
          <el-col>
            <div class="btn-wrapper">
              <el-button type="primary" @click="order">排序</el-button>
              <el-button type="primary" @click="save">保存</el-button>
            </div>
          </el-col>
        </el-row>
        </div>

    </div>
  </template>

  <script>
import { userDel,userList,updateStatus } from '@/api/systemUser'
import {getScoreList,addOrModifyScore} from '@/api/game.js'
export default {
    data() {
      return {
          matchName:'',
          querydata:{
              pageIndex: 1,
              pageSize:10,
              pagetotal:0
          },
          params:{
            integral:'',
            rank:''
          },
          tableData: [],
          selectIds:[]
      }
    },
    watch:{
      'params.integral'(val){
        let reg=/^[1-9]\d+$/
        if(!reg.test(val)){
          
          this.$message({
          message: '必须为正整数',
          type: 'warning'
          });
          
        }
        
      },
    },
    methods:{
        handleInput(val){
          let reg=/^[0-9]+\d*$/
          if(!reg.test(val.integral)){
            this.$message({
              message: '积分必须为非负整数',
              type: 'warning'
            });
          }
        },
        order(){
          let tableData=this.tableData;
          let noscorelist = tableData.filter(val=>val.integral === null || val.integral === '');
          let scorelist = tableData.filter(val=>val.integral !== null && val.integral !== '');
          tableData = scorelist.sort(function(a,b){
            return b.integral-a.integral
          })
          for(let i in tableData){
            if(tableData[i].rank === null || tableData[i].rank === ''){
              tableData[i].rank =parseInt(i)+1;
            }
          }
          tableData = [...tableData,...noscorelist]
          this.tableData =tableData;
        },
        save(){
          let arr=[]
          this.tableData.map(item=>{
            let integralreg=/^[0-9]+\d*$/;
            let rankreg=/^[1-9]+\d*$/
            const {matchId,clubId,integral,rank,scoreId}=item
            if(!integralreg.test(integral)){
              this.$message({
                message: '积分必须为非负整数',
                type: 'warning'
              });
              throw '';
            }else if(!rankreg.test(rank)){
              this.$message({
                message: '排名必须为正整数',
                type: 'warning'
              });
              throw '';
            }
            const obj={matchId,clubId,integral,rank,scoreId}
            arr.push(obj)
          })
          addOrModifyScore(arr).then(res=>{
            if(res.code==200){
              this.$router.push({name:'game-manage'})
            }
          })
        },
        handleInput2(val){
          let reg=/^[1-9]+\d*$/
          if(!reg.test(val.rank)){
            
            this.$message({
            message: '排名必须为正整数',
            type: 'warning'
            });
            
          }
        },
        querylist(){
          let self = this;
          getScoreList(this.$route.query.id).then(res=>{
            if(res.code===200){
              self.tableData=res.data;
            }
          })
        },
        back(){
          this.$router.go(-1)
        },
    },
    mounted() {
        this.querylist();
        this.matchName = this.$route.query.matchName;
    },
}
  </script>

  <style lang="less" scoped>
  .listtitle{
    display: flex;
    align-items: center;
  }
  .score-wrapper /deep/ .el-input__inner{
    height: 30px;
  }
      .button-top{
          padding-top: 10px;

      }
      .title{
        color: #006DB3;
        font-size: 20px;
        margin-top: 20px;
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
    .btn-wrapper{
      display: flex;
      justify-content: flex-end;
    }
  </style>
  