<template>
  <div class="sign-wrapper">
    <div class="title">
      智慧体育赛事管理系统-会员注册
    </div>
    <div class="main">
      <div class="regsusC">
        <div class="regsusSon">
          <div class="sucText">
            <img src="../../assets/img/web_wczz.png" />
            <!-- 恭喜您完成注册 -->
          </div>
          <div class="waittext">
            <p v-if="type !== 'judge'">您已完成注册智慧体育赛事管理系统会员，请耐心等到后台审核！</p>
            <p v-else-if="type === 'judge'">您已完成注册智慧体育赛事管理系统裁判，请耐心等到后台审核！</p>
            <router-link :to='{name:"login"}'>
              <span style="color:#0099C2;">返回登录</span>
            </router-link>
            <!-- <a>返回登录</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'styles/regist.less'
export default {
    data() {
      return {
        type:''
      };
    },
    computed:{
      
    },
    methods: {
    },
    mounted(){
      this.type = this.$route.query.type;
      console.log(this.type)
    }
  }
</script>
<style lang="less" scoped>
  .main{
    height: 100%;
  }
</style>

