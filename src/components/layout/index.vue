<template>
  <div class="hello">
    <el-container class='containerC'>
      <div class="main-top">
        <div class="main-top-left"></div>
        <div class="main-top-right"></div>
      </div>
      <el-header class='BMhead'>
        <el-row>
          <el-col class='BMheadL'>
            <!-- <img @click='menushow = !menushow' src="../../assets/img/icons/side_hide.png"/> -->
            <span class="header-left-title">昆山体育局</span>
          </el-col>
          <el-col  class='BMheadmid'>
            <img v-if="loginLogo === ''" src="../../assets/img/web_loginhead.png" alt="">
            <img v-else :src="loginLogo" alt="">
            <span class="username">{{loginName}}</span>
            <span class="headmid-title">智慧体育赛事管理系统</span>
          </el-col>
          <el-col class='BMheadR'>
            <div>
              <span class="modify-pwd" @click="modifyPwd">修改密码 &nbsp;|</span>
              <span class="logout" @click="logout">退出</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <transition name="slide-fade">
          <el-collapse-transition>
            <el-aside  v-if="menushow" width="200px"  style="background:#006DB3;z-index:999;">
              <el-menu
                class="el-menu-vertical-demo"
                text-color="#fff"
                background='#006DB3'
                active-text-color="lightblue"
                :default-active="$route.path"
                :unique-opened='true'
                :router="true">
                <sidebar-item :routes="menulist"></sidebar-item>
              </el-menu>
            </el-aside>
          </el-collapse-transition>
        </transition>

        <el-main>
          <div class="main-content">
            <!-- <div class="main-top"></div> -->
            <div class="main-content-view"><router-view/></div>
          </div>

        </el-main>
      </el-container>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="passwordedit">
        <el-form ref="form" :model="form" :rules="formRules" label-width="100px">
          <el-form-item label="旧密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="surePwd">
            <el-input v-model="form.surePwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleModify">确 定</el-button>
        </div>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem';
import store from '@/store'
import {modifyPasswordByPassword} from 'api/login.js'
export default {
  name: "Layout",
  data() {
    let pwd=(rule, value, callback) => {
      let reg=/^[a-zA-Z0-9]\w{5,17}$/
      if (value === '') {
        callback(new Error('请输入密码'));
      }else if(!reg.test(value)){
        callback(new Error('请输入正确格式密码'))
      }else {
        if (this.form.surePwd !== '') {
          this.$refs.form.validateField('surePwd');
        }
        callback();
      }
      
    };
    let surePwd=(rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      leftmenu: [],
      menushow: true,
      imglist: ["../../assets/img/icons/side_rygl.png"],
      menulist:[],
      loginName:'',
      loginLogo:'',
      dialogFormVisible: false,
      form: {
         password:'',
         newPassword:'',
         surePwd:''
      },
      formRules:{
        password:[{required:true,message:'请输入原密码',trigger:'change'}],
        newPassword:[{required:true,validator:pwd,trigger:'change'}],
        surePwd:[{required:true,validator:surePwd,trigger:'change'}]
      }
    };
  },
  components:{
    SidebarItem
  },
  computed:{
    routes() {
      // console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
  },
  mounted() {
    this.menulist = store.getters.user.resourceList;
    this.loginName = store.getters.user.loginName;
    if  (store.getters.user.clubId) {
      this.loginName = store.getters.user.clubName;
    }
    this.loginLogo = store.getters.user.clubLogo;
    // 若没有菜单重新登录
    if (sessionStorage.menuC === undefined) {
      // this.$router.push({path:'/login'});
    } else {
      let menulist = JSON.parse(sessionStorage.menuC);
      let leftmenu = [];
      for (let i in menulist) {
        if (menulist[i].pid === 0) {
          let menuson = {
            name: menulist[i].name,
            id: menulist[i].id,
            child: [],
            url: menulist[i].url
          };
          for (let j in menulist) {
            if (menulist[j].pid === menulist[i].id) {
              menuson.child.push({
                name: menulist[j].name,
                id: menulist[j].id,
                url: menulist[j].url
              });
            }
          }
          leftmenu.push(menuson);
        }
      }
      this.leftmenu = leftmenu;
    }
  },
  methods: {
    handleModify(){
      this.$refs['form'].validate(valid=>{
        if(valid){
         modifyPasswordByPassword({
           password:this.form.password,
           newPassword:this.form.newPassword
           }).then(res=>{
             if(res.code==200){
               this.dialogFormVisible=false
               this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                // 修改密码之后清空缓存 返回登录页
                localStorage.clear()
                this.$router.push('/login')
             }
           })
         
        }else{
          return false
        }
      })
    },
    modifyPwd(){
      this.dialogFormVisible=true;
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs['form'].resetFields();
    },
    logout(){
      this.$confirm('确定退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          localStorage.clear()
          this.$router.push('/login')
        }).catch(() => {
                    
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.hello  .el-input__inner{
      line-height: 0;
}
.cursor{
  cursor: pointer;
}
.avatar-wrapper .avatar-uploader{
    min-height: 100px;
    min-width: 100px;
    img{
      width: 100px;
      height: 100px;
    }
    .el-upload--text{
      min-height: 100px;
    }
  }
  .idcard-wrapper .avatar-uploader{
    width: 280px ;
    height: 178px ;
    // background: red;
    box-sizing: border-box;
    img{
      width: 280px !important;
      height: 178px !important;
    
    }
    .el-upload--text{
      height: 178px;
    }
  }
.el-header,
.el-footer,
.el-aside,
.el-menu {
  background-color: transparent;
  border-right: 0;
}
.el-main{
  padding: 0;
}
.el-header{
  height: 125px !important;
  padding-bottom:7px !important;
  // padding:0 !important;
  .el-row{
    height: 125px;
    display: flex;
    align-items: center;
  }
}
.el-menu-item:focus,
.el-menu-item:hover,
.el-submenu__title:hover,
.el-submenu__title:focus {
  background-color: #00416b !important;
}
.el-menu {
  width: 199px;
}
.el-submenu img {
  width: 20px;
  height: 20px;
  // margin: 0 5px 0 2px;
}
.el-menu .is-opened {
  background-color: #00578f;
}
// .el-select{
//   width: 100%;
// }
.el-menu .textleft {
  text-align: left;
}
.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
.el-submenu .el-menu-item {
  padding-left: 53px !important;
}
.containerC {
  height: 100vh;
  // background: linear-gradient(to right, #006db3, #6DC6FF);
  // background-size:100% 350px;
  background-repeat: no-repeat;
  position: relative;
}
.main-top{
  height: 350px;
  width: 100%;
  position: absolute;
  top:0;left: 0;
  display: flex;

  .main-top-left{width: 200px;background-color: #006DB3; }
  .main-top-right{flex: 1;background: linear-gradient(to right, #006db3, #6DC6FF);}
}
.BMhead {
  color: #fff;
  text-align: left;
  z-index: 100;
  width: 100%;
  padding:0;
  // background: linear-gradient(to right, #006db3, #3ca0d0);
  background: url(../../assets/img/web_topbg.png) no-repeat center right;
}
.BMheadmid {
  flex:1;
  text-align: left;
  display: flex;
  align-items: center;
  padding-left: 64px;
  position: relative;
  .username{
    font-size: 24px;
    margin-left: 10px;
    margin-right: 56px;
    display: inline-block;
    position: relative;
    // top:-6px;
  }
  .headmid-title{
    font-size: 38px;
  }

}
.BMheadmid img {
  width: 62px;
  height: 62px;
  display: inline-block;
  position: relative;
  top: 5px;
  border-radius: 50%;
}
.BMheadL{
  width: 200px;
  text-align: center;
}
.BMheadL img {
  width: 25px;
  height: 25px;
  position: relative;
  top: 8px;
}
.BMheadL .header-left-title{
  font-size: 34px;
  height: 48px;
  line-height: 48px;
  display: inline-block;
  color: rgba(255, 255, 255, 1);
  font-family: PingFangSC-Regular;

}
.BMheadR {
  width: 200px;
  color: #fff;
  text-align: right;
  font-size: 12px;
  padding-right: 63px;
  position: relative;
  top:-10px;
}
.BMheadR .el-dropdown-link {
  color: #fff;
  font-size: 12px;
}
/* .BMheadR .el-dropdown-link i:nth-child(1){font-size:12px;width:16px;height:16px;display: inline-block;} */
.BMheadR .el-dropdown-link img:nth-child(1) {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.BMheadR .el-dropdown-link .headimg {
  width: 25px;
  height: 25px;
  position: relative;
  top: 8px;
  margin: 0 5px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.el-dropdown {
  cursor: pointer;
}
.el-container{position: relative;}

.main-content{
  position: relative;
  // background: #EAEFF3;
  // background-position:
  // background-position-y: 300px;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding:0 20px 41px;

  .main-content-view{
    // position: absolute;
    background: white;
    top: 0;
    margin: auto;
    width: 100%;
    border-radius: 18px;
    min-height: 100%;
    box-sizing: border-box;
    padding:15px 30px;
  }
}
.listtitle {
    line-height: 40px;
    color: #1B2125;
    font-size: 20px;
    text-align: left;
    font-weight: bold;
    border-bottom: 2px solid rgba(81, 81, 81, 1);

}
.listSearchC {
    text-align: left;
    line-height: 35px;
    padding: 10px 0;
    font-size: 14px;
    color: #000000;
    display: flex;
    flex-wrap:wrap;
    // justify-content: flex-start;
    .el-date-editor{
      margin-right: 0;
    }
    .el-row{width: 100% !important;}
    .texta_right{display: flex;flex-direction:row-reverse;}
    br{width: 100%;height: 1px;display: block;}
    .listsecBox{margin-right:11px;display: inline-block;height: 50px;line-height:50px;
    // position: relative;
      // float: left;
      // display: flex;align-items:center;
      label{
      line-height: 20px;
      opacity: 0.6;
      color: rgba(0, 0, 0, 1);
      font-size: 14px;
      font-family: PingFangSC-Regular;
      margin-right:18px;
      }
      span{opacity: 0.6;color: rgba(0, 0, 0, 1);height: 29px;line-height: 29px;display: inline-block;}
      a{display: inline-block;position: relative;top:0px;cursor: pointer;outline: none;}
      a:active{position: relative;top:1px;}
      .searchBtn{width:116px;height: 50px;background: url(../../assets/img/web_btsea.png) no-repeat center center;background-size: 100%;}
      .addBtn{width:116px;height: 49px;background: url(../../assets/img/web_btadd.png) no-repeat center center;background-size: 100%;}
      .editBtn{width:116px;height: 49px;background: url(../../assets/img/web_btedit.png) no-repeat center center;background-size: 100%;}
      .removehBtn{width:116px;height: 49px;background: url(../../assets/img/web_btdel.png) no-repeat center center;background-size: 100%;}
      .insetBtn{width:104px;height: 36px;top:6px;;background: url(../../assets/img/web_btimp.png) no-repeat center center;background-size: 100%;}
      .exportBtn{width:104px;height: 36px;top:6px;;background: url(../../assets/img/export.png) no-repeat center center;background-size: 100%;}
      .insetBtn:active{top:7px;}
      .downloadBtn{font-size: 16px;color: #006DB3;line-height: 36px;}
      // .downloadBtn:active{position: relative;top:6px;}
    }
}
// .listSearchC:before,
// .listSearchC:after {
//     display: table;
//     content: " ";
// }

// .listSearchC:after {
//     clear: both;
// }
.listSearchC .el-input {
    line-height: 0;
    width: 130px;
    display: inline-block;
    height: 29px;
    // line-height: 64px;
    // margin-right: 20px;
    .el-input__inner{
      height: 100%;
      padding:  0 0 0 5px;
    }

    .el-input__icon{
      line-height: 0;

    }
    .el-input__prefix{
      right: 0;
      left: auto;
    }


}
.listSearchC .el-button {
    min-width: 96px;
    display: inline-block;
    margin: 12px 26px 12px 0;
    padding: 10px 20px;
    -webkit-box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.8);
}
.listtableC {
    padding: 16px 0;
}
.listtableC .el-pagination {
    margin-top: 40px;
}
.el-pagination {
    white-space: nowrap;
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    text-align: center;
}
.pt-10{
  padding-top: 10px;
}
.ml-27{
  margin-left: 27px;
}
.el-upload--picture-card{
  height: 90px;
  width: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back{
  cursor: pointer;
  margin-right: 20px;
}
.modify-pwd,.logout{
  cursor: pointer;
}
a{
  text-decoration: none;
}
.passwordedit .dialog-footer{justify-content: flex-end;}
</style>
