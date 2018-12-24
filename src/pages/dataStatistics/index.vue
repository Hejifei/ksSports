<template>
  <div class="hello">
    <div class="listtitle">数据统计</div>
    <div class="totalshow">
      <label>俱乐部总数：{{tableData.clubTotal}}；</label>
      <label>区镇总数：{{tableData.townTotal}}；</label>
      <label>运动员总数：{{tableData.playerTotal}}；</label>
      <label>裁判员总数：{{tableData.refereeTotal}}；</label>
    </div>
    <div class="listSearchC">
      <div class="listsecBox">
        <el-date-picker 
            :editable = false
            :clearable = false
            v-model="querydata.startDate"
            type="date"
            placeholder="选择日期"
            style="margin-right:0"
            :picker-options="pickerOptions0"
            @change="timechange"
            >
        </el-date-picker>
        <span>~</span>
        <el-date-picker
            :editable = false
            :clearable = false
            v-model="querydata.endDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions0"
            @change="timechange"
            >
        </el-date-picker>
      </div>
    </div>
    <div class="dsBoxC">
      <div class="dsboxline">
        <div class="dsboxson"><span>新增俱乐部</span><label>{{tableData.addClubNumber}}</label></div>
        <div class="dsboxson"><span>新增区镇</span><label>{{tableData.addTownNumber}}</label></div>
      </div>
      <div class="dsboxline">
        <div class="dsboxson"><span>联赛数</span><label>{{tableData.matchNumber}}</label></div>
        <div class="dsboxson"><span>群体活动数</span><label>{{tableData.activityNumber}}</label></div>
      </div>
      <div class="dsboxline">
        <div class="dsboxson"><span>参赛俱乐部数</span><label>{{tableData.attendClubNumber}}</label></div>
        <div class="dsboxson"><span>参赛区镇数</span><label>{{tableData.attendTownNumber}}</label></div>
        <div class="dsboxson"><span>参赛运动员数</span><label>{{tableData.attendPlayer}}</label></div>
      </div>

    </div>
    <div class="listtableC">
      <el-table
        :data="tableData.newlist"
        tooltip-effect="dark"
        style="width: 100%"
        >
        <el-table-column prop="name" label=""></el-table-column>
        <el-table-column prop="threeClub" label="甲级俱乐部"></el-table-column>
        <el-table-column prop="twoClub" label="乙级俱乐部"></el-table-column>
        <el-table-column prop="oneClub" label="丙级俱乐部"></el-table-column>
        <el-table-column prop="playerNumber" label="运动员数"></el-table-column>
        <el-table-column prop="tiReferee" label="国际级裁判"></el-table-column>
        <el-table-column prop="natiReferee" label="国家级裁判"></el-table-column>
        <el-table-column prop="oneLvReferee" label="一级裁判"></el-table-column>
        <el-table-column prop="towLvReferee" label="二级裁判"></el-table-column>
        <el-table-column prop="threeLvReferee" label="三级裁判"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getStatistics} from 'api/dataStatistics.js'
export default {
  data () {
    return {
      querydata:{
        startDate:this.getLastMonth(),
        endDate:new Date(),
      },
      tableData:{},
      maxDate:new Date(),
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  mounted () {
    let self = this;
    self.querylist();
  },
  methods: {
    timechange(){
      if(this.querydata.startDate !== '' && this.querydata.endDate !== ''){
        if(this.time2unix(this.querydata.startDate)>this.time2unix(this.querydata.endDate)){
          this.$message({
            type: 'warning',
            message: '开始时间不能晚于结束时间！'
          });
        }else{
          this.querylist();
        }
      }
    },
    time2unix(_str){
      var date = new Date(_str);
      var time1 = date.getTime();
      return time1;
    },
    querylist(){
      let self = this;
      getStatistics(self.querydata).then(res=>{
        let resdata = res.data;
        let newlist = [];
        Object.assign(resdata.match,{'name':'联赛'})
        newlist.push(resdata.match);
        Object.assign(resdata.activity,{'name':'群体活动'})
        newlist.push(resdata.activity);
        resdata.newlist = newlist;
        self.tableData = resdata;
      })
    },
    getLastMonth(){
      let date = new Date();
      var daysInMonth = new Array([0],[31],[28],[31],[30],[31],[30],[31],[31],[30],[31],[30],[31]);  
      var strYear = date.getFullYear()-1;    
      var strDay = date.getDate();    
      var strMonth = date.getMonth()+2;  
      if(strYear%4 == 0 && strYear%100 != 0){  
          daysInMonth[2] = 29;  
      }  
      if(strMonth - 1 == 0)  
      {  
          strYear -= 1;  
          strMonth = 12;  
      }  
      else  
      {  
          strMonth -= 1;  
      }  
      strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];  
      if(strMonth<10)    
      {    
          strMonth='0'+strMonth;    
      }  
      if(strDay<10)    
      {    
          strDay='0'+strDay;    
      }  
      let datastr = strYear+'/'+strMonth+'/'+strDay;  
      datastr= new Date(datastr);
      return datastr;  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello /deep/ .el-input__inner{
      line-height: 0;
}
.dsBoxC{
  // padding: 10px 6px;
  .dsboxline{padding-bottom: 20px;
    // padding: 10px 0;
    .dsboxson{text-align: center;width: 150px;height: 108px;display: inline-block;padding: 15px 0 5px;
      border-radius: 3px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.1);
      margin-right: 20px;
      span{display: block;
          line-height: 22px;
          color: rgba(132, 140, 151, 1);
          font-size: 20px;
      }
      label{display: block;
        line-height: 65px;
        color: rgba(117, 117, 117, 1);
        font-size: 40px;
        text-align: center;
        font-family: PingFangSC-Semibold;
      }
    }
  }
  .dsboxline:nth-child(1) .dsboxson{border: 2px solid #FF85C2;}
  .dsboxline:nth-child(2) .dsboxson{border: 2px solid #8DC63F;}
  .dsboxline:nth-child(3) .dsboxson{border: 2px solid #3BCCFF;}
}
.totalshow{padding-top: 22px;
  label{
    line-height: 33px;
    height: 33px;
    color: rgba(27, 33, 37, 1);
    font-size: 22px;
    text-align: left;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    margin-right: 22px;
  }
}
</style>

