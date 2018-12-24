<template>
  <div class="approval-wrapper">
    <el-form :model='ruleForm' :rules="rules" ref="ruleForm"  label-position="left">
      <el-row >
        <div class="title">
          <img @click="back" class="back" src="../../assets/img/back.png" alt="">
          <label >报名登记</label>
        </div>
        <el-row>
          <el-col>
            <div class="club-name font-style">俱乐部名称：<span>{{ruleForm.clubName}}</span></div>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12" v-if="showAuth.leaderStatus===1">
            <el-form-item :prop="showAuth.leaderRequire===1?'leader':null" label="领队" >
              <el-input v-model="ruleForm.leader" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="showAuth.coachStatus===1">
            <el-form-item :prop="showAuth.coachRequire===1?'coach':null"   label="主教练"  >
              <el-input v-model="ruleForm.coach" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="12" v-if="showAuth.sponsorStatus===1">
            <el-form-item :prop="showAuth.sponsorRequire===1?'sponsor':null"  label="赞助商">
              <el-input v-model="ruleForm.sponsor" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="showAuth.phoneStatus===1">
            <el-form-item :prop="showAuth.phoneRequire===1?'phone':null"   label="电话" >
              <el-input v-model="ruleForm.phone" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="58">
          <el-col :span="24" 
            v-if="showAuth.clothesMainStatus === 1 ||showAuth.shortsMainStatus === 1 || showAuth.socksMainStatus === 1 ||
            showAuth.clothesSubStatus === 1 || showAuth.shortsSubStatus === 1 || showAuth.socksSubStatus === 1 "
          >
              <span class="label">服装</span>
              <div class="clothes">
                <div class="flex-clothes" v-if="showAuth.clothesMainStatus===1">
                  <!-- <span class="width-100">上衣主颜：</span> -->
                  <el-form-item label-width="115px" label="上衣主颜：" :prop="showAuth.clothesMainRequire===1?'coatThemeMain':null">
                    <el-input v-model="ruleForm.coatThemeMain" ></el-input>
                  </el-form-item>
                </div>
                <div class="flex-clothes" v-if="showAuth.shortsMainStatus===1">
                  <el-form-item label-width="115px" label="短裤主颜：" :prop="showAuth.shortsMainRequire===1?'shortsThemeMain':null">
                    <el-input v-model="ruleForm.shortsThemeMain" ></el-input>
                  </el-form-item>
                </div>
                <div class="flex-clothes" v-if="showAuth.socksMainStatus===1">
                  <el-form-item label-width="115px" label="球袜主颜：" :prop="showAuth.socksMainRequire===1?'sockThemeMain':null">
                    <el-input v-model="ruleForm.sockThemeMain" ></el-input>
                  </el-form-item>
                </div>
              </div>
              <div style="margin-top:10px;" class="clothes">
                <div class="flex-clothes" v-if="showAuth.clothesSubStatus===1">
                  <el-form-item label-width="115px" label="上衣副颜：" :prop="showAuth.clothesSubRequire===1?'coatThemeDeputy':null">
                    <el-input v-model="ruleForm.coatThemeDeputy" ></el-input>
                  </el-form-item>

                </div>
                <div class="flex-clothes" v-if="showAuth.shortsSubStatus===1">
                  <el-form-item label-width="115px" label="短裤副颜：" :prop="showAuth.shortsSubRequire===1?'coatThemeDeputy':null">
                    <el-input v-model="ruleForm.shortsThemeDeputy" ></el-input>
                  </el-form-item>

                </div>
                <div class="flex-clothes" v-if="showAuth.socksSubStatus===1">
                  <el-form-item label-width="115px" label="球袜副颜：" :prop="showAuth.socksSubRequire===1?'sockThemeDeputy':null">
                    <el-input v-model="ruleForm.sockThemeDeputy" ></el-input>
                  </el-form-item>

                </div>
              </div>
          </el-col>
        </el-row>
        <div  v-for="(item,index) in ruleForm.group" :key="index">
          <el-row>
          <div class="font-style inline-label"  >
            <div class="labdiv">{{item.groupName}}</div>
            <input class="el-input__inner" v-model="item.groupnewName" placeholder="自定义组名"/>
            <!-- <el-form-item :label="item.groupName" class="group-item"  :inline-message="true"  :prop="`group[${index}].groupName`" >
              <el-input v-model="item.groupnewName" placeholder="自定义组名" ></el-input>
            </el-form-item>   -->
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-table
              :data="item.player"
              stripe
              style="width: 100%">
              <el-table-column
                prop="playerName"
                label="运动员"
                >
                <template slot-scope="scope">
                  <div v-if="scope.row.add!=1" class="ath-sel">
                    <span class="del el-icon-minus" @click="del(scope.row,index)"></span>
                  <el-select @change="change" v-model="scope.row.athleteId" filterable placeholder="请选择">
                    <el-option
                      
                      v-for="item1 in athletes"
                      :key="item1.playerId"
                      :label="item1.playerName"
                      :value="item1.playerId">
                    </el-option>
                  </el-select>
                  </div>
                  <div v-else>
                    <span class="add el-icon-plus" @click="add(index)"></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="number"
                label="号码">
                <template slot-scope="scope">
                  <!-- {{ruleForm.group[index].player[scope.$index]}}
                  {{scope.row.number}}
                  <el-form-item v-if="showAuth.playerNumStatus===1 && scope.row.add!=1"  class="ath-sel" style="margin-bottom:0;" 
                    :prop="ruleForm.group[index].player[scope.$index].number"
                   :rules="{required: true, message: '域名不能为空', trigger: 'blur'}" >
                    <el-input v-model="scope.row.number" ></el-input>
                  </el-form-item> -->
                  <el-form-item v-if="showAuth.playerNumStatus===1 && scope.row.add!=1"  class="ath-sel" style="margin-bottom:0;" >
                    <el-input v-model="scope.row.number" ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        </div>
        <el-row>
          <el-col>
            <div v-for="(item,index) in record" :key="index" style="margin-top:10px;">
              审批记录：<span>{{item.approvalDate}}</span>
              <span >{{item.status==3?'已拒绝':'已通过'}}</span>
              <span v-show="item.status==3">原因:{{item.reason}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="$route.query.type==undefined" type="flex" style="margin-top:50px;" justify="center"  class="commit-wrapper">
          <el-button class="savebtn" type="primary" size="medium" @click="submit">提交登记</el-button>
        </el-row>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import {getMatchEnrollDetail,getApprovalRecord,getEnrollShowItem,getAthleteDrop,registration} from 'api/game.js'
import {getList,getItemDrop} from 'api/common.js'
import validators from '@/assets/js/validate.js'
export default {
  data() {
    return {
      ruleForm: {
        clubId:'',
        matchId:'',
        clubName:'',
        leader:'',
        coach:'',
        sponsor:'',
        phone:'',
        coatThemeMain:'',
        coatThemeDeputy:'',
        shortsThemeMain:'',
        shortsThemeDeputy:'',
        sockThemeMain:'',
        sockThemeDeputy:'',
        tipFlag:false,
        group:[
          
        ]
      },
      enrollId:'',
      athletes:[],
      tempAthletes:[],

      group:[{athleteId:'',number:'',groupId:'',groupName:''}],
      rules:{
        coach: [
            { required: true, message: '请输入主教练', trigger: 'change' }
        ],
        leader: [
            { required: true, message: '请输入领队', trigger: 'change' }
        ],
        sponsor: [
            { required: true, message: '请输入赞助商', trigger: 'change' }
        ],
        phone: [
          {validator:validators.phone,required:true,trigger:'blur'},
        ],
        coatThemeMain: [
            { required: true, message: '请输入上衣主颜', trigger: 'change' }
        ],
        coatThemeDeputy: [
            { required: true, message: '请输入上衣副颜', trigger: 'change' }
        ],
        shortsThemeMain: [
            { required: true, message: '请输入短裤主颜', trigger: 'change' }
        ],
        shortsThemeDeputy: [
            { required: true, message: '请输入短裤副颜', trigger: 'change' }
        ],
        sockThemeMain: [
            { required: true, message: '请输入球袜主颜', trigger: 'change' }
        ],
        sockThemeDeputy: [
            { required: true, message: '请输入球袜副颜', trigger: 'change' }
        ],
        playnum: [
          {required:true,message: '请输入号码',trigger:'blur'},
        ],
      },
      showAuth:{
        leaderStatus:'1',
        // leaderRequire:'1'
      },
      record:[]
      
    };
  },
  components: {
  },
  
  watch:{
    
  },
  mounted(){
    this.ruleForm.clubId=JSON.parse(localStorage.getItem('user')).clubId
    this.ruleForm.matchId=this.$route.query.id
    this.enrollId=this.$route.query.enrollId
    
    this.queryInit()
    this.getAthleteDrop()
    this.getRecord()
    
  },
  created(){
  },
  methods: {
    
    change(val){
      console.log(this.$route.query.partTime,2)
      if(this.$route.query.partTime == 0) {
        return
      }
      let count=0
      // console.log(this.ruleForm)
      this.ruleForm.group.map(item=>{
        item.player.map(item2=>{
          if(item2.athleteId==val){
            count++
            if(count>=2){
              this.tipFlag=true
              this.$message.error('同一运动员只能选择一次')
            }else{
              this.tipFlag=false
            }
            return
          }
        })
      })
      // this.athletes=this.tempAthletes.filter(item=>{
      //   return item.playerId!=val
      // })
    },
    submit(){

      this.$refs.ruleForm.validate(valid=>{
        // console.log(this.ruleForm)
        if(valid){
          
          let tempArr=JSON.parse(JSON.stringify(this.ruleForm))
          let numMaxFlag=tempArr.group.some(val=>{
            return val.player.length-1>this.showAuth.enrollMax
          })
          let numMinFlag=tempArr.group.some(val=>{
            return val.player.length-1<this.showAuth.enrollMin
          })
          if(numMaxFlag){
            this.$message.error('每组报名人数超过最大限制');
            return
          }
          if(numMinFlag){
            this.$message.error('每组报名人数少于最小限制');
            return
          }
          if(this.tipFlag){
            this.$message.error('同一运动员只能选择一次');
            return
          }
          let arr2=[]
          tempArr.group.forEach(item=>{
            item.player.forEach(item2=>{
              delete item2.num
              delete item2.athleteName
              item2.groupName= item.groupnewName !== '' && item.groupnewName !== undefined ? item.groupnewName : item.groupName
              item2.groupId=item.groupId
              arr2.push(item2)
            })
            
          })
          arr2=arr2.filter(val=>{
            return val.add!=1
          })
          tempArr.group=arr2
          if(this.enrollId){
            tempArr.enrollId=this.enrollId
          }
          if(this.showAuth.player_num_require==1){
            let flag=tempArr.group.some(val=>{
              return val.number==''
            })

            if(flag){
              this.$message.error('请输入球员号码');
              return
            }
            
          }
          let playerFlag=tempArr.group.some(item=>{
            return item.athleteId==""
          })
          if(playerFlag){
            this.$message.error('请选择远动员');
            return
          }
          // 哈哈哈哈
          // console.log(tempArr)
          registration(tempArr).then(res=>{
            if(res.code==200){
              this.$alert(res.data, '报名登记成功', {
                showClose:false,
                confirmButtonText: '确定',
                callback: action => {
                 this.$router.push({name:'club-gameenroll'})
                }
              });
            }
          })
        }
      })
    },
    getDetail(){
      getMatchEnrollDetail(this.enrollId).then(res=>{
        if(res.code==200){
          let result=res.data
          result.clubId=JSON.parse(localStorage.getItem('user')).clubId
          result.matchId=this.$route.query.id
         
          result.group.map(item=>{
            item.groupName=item.teamName
            delete item.teamName
            item.player.map((item2,index)=>{
              item2.groupName=item2.playerName
              delete item2.playerName
              item2.athleteId=item2.playerId
              delete item2.playerId
              item2.num=index
              
              return item2
            })
            item.player.push({add:'1'})
            return item
          })
           this.ruleForm=result
        }
      })
    },
    add(val,index){
      let arr=this.ruleForm.group[val].player
      this.ruleForm.group[val].player.splice(-1,0,{
          num:arr.length+1,
          athleteName:"",
          number:"",
          athleteId:"",
      })
    },
    del(val,index){
      console.log(this.ruleForm.group[index].player)
      let arr=JSON.parse(JSON.stringify(this.ruleForm))

      arr.group[index].player=arr.group[index].player.filter(item=>{
        return item.num!=val.num
      })
      
      this.ruleForm=arr
      console.log(this.ruleForm.group)
      
    },
    queryInit(){

      getEnrollShowItem(this.$route.query.id).then(res=>{
        if(res.code==200){
          this.ruleForm.clubName=JSON.parse(localStorage.getItem('user')).clubName
          this.showAuth=res.data
          this.ruleForm.group=res.data.groupInfo
          this.ruleForm.group=res.data.groupInfo.map(item=>{
            item.player=[
                    {
                        num:1,
                        athleteName:"",
                        number:"",
                        athleteId:"",

                    },
                    {
                        add:'1'
                        
                    }

                ]
                return item
          })
          if(this.enrollId){
            this.getDetail()
          }
          // this.ruleForm=res.data
          // console.log('ruleFoem',this.ruleForm)
        }
      })
    },
    getAthleteDrop(){
      getAthleteDrop({clubId:this.ruleForm.clubId,matchId:this.$route.query.id}).then(res=>{
        if(res.code==200){
          this.athletes=res.data
          this.tempAthletes=JSON.parse(JSON.stringify(this.athletes))
        }
      })
    },
    getRecord(){
      getApprovalRecord({enrollId:this.$route.query.enrollId,approveType:parseInt(this.$route.query.matchType) === 1 ? 3 :4}).then(res=>{
        if(res.code==200){
          this.record=res.data
        }
      })
    },
    back(){
      this.$router.go(-1)
    },
    
    // 获取比赛项目下拉
    getItemId(type){
      getItemDrop(type).then(res=>{
        this.itemIds=res.data
        this.tableData=res.data.group
      })
    }
    
    
  }
};
</script>
<style lang="less">
.approval-wrapper  .el-form-item__label{
  color: #848484;
  font-size: 14px;
}
.label{
  color: #848484;
  font-size: 16px;
  display: block;
  margin-bottom: 10px;
}
.approval-wrapper{
  .title {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #1b2125;
    font-weight: bold;
  }
  .font-style{
    color: #848484;
    font-size: 16px;
  }
  .inline-label{
    margin-top:10px;display:flex;align-items: center;flex-direction:row;
    .labdiv{margin-right: 10px;}
    input{width:185px;}
    .group-item{
      margin-bottom: 0;
    }
  }
  .club-name{
    // font-size: 16px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  .clothes{
    display: flex;
    padding: 18px;
    align-items: center;
    justify-content: flex-start;
    border: 1px solid gainsboro;
    .el-form-item__label{
      color: #848484;
      font-size: 14px;
      text-align: right;
    }
    // div:nth-child(1){
    //   margin-left: 18px;
    // }
  }
  .flex-clothes{
    display: flex;
    align-items: center;
    margin-left: 20px;
    .width-100{
      display: block;

      width: 100px;
    }
  }
  .ath-sel{
    
    display: flex;
    align-items: center;
    .del{
      width: 35px;
      font-size: 20px;
      text-align: center;
      margin-right: 17px;
      font-weight: bold;
      cursor: pointer;
    }
    .el-form-item__error{top: 0%;
    left: 70%;}
  }
  .add{
      width: 35px;
      display: block;
      font-size: 20px;
      text-align: center;
      margin-right: 17px;
      font-weight: bold;
      cursor: pointer;
    }
}


</style>
