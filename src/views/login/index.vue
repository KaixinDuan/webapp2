<template>
  <div class="container bgF">
    <van-nav-bar title="登陆"/>
    <h2 class="logoIcon"></h2>
    <ul class="formCom form-login form-mini">
      <li class="icon-clear">
        <label>
          <span>账号</span>
          <input type="text" placeholder="请输入手机号" v-model='username'>
          <van-icon @click='username = ""' name="close"/>
        </label>
      </li>
      <li :class='[{"icon-eye1":showPwd},{"icon-eye2":!showPwd}]'>
        <label>
          <span>密码</span>
          <input :type="showPwd?'password':'text'" placeholder="请输入6-12位密码" v-model.trim='password'>
          <!-- <i @click='showPwd = !showPwd' :class="showPwd?'eye-o':''"></i> -->
          <van-icon @click='showPwd = !showPwd' :name="showPwd?'eye-o':'closed-eye'"/>
        </label>
      </li>
      <li class="yzm-li">
          <label>
            <span>验证码</span>
            <input type="text" placeholder="请输入验证码" v-model.trim='code'>
            <a href="javascript:;" class="verification-code" @click="changeCodeImg()"><img :src="yzmSrc" alt=""></a>
            
          </label>
      </li>
    </ul>
    <van-button type="primary" block @click.native="logIn()">登陆</van-button>
    <div class="forgetWarp">
      <span class="fr col6" @click="$router.push('/regist')">马上注册</span>
      
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        code: '',
        showPwd: true,  //开关--密码可见
        canvas: {},      //存放canvas DOM节点
        yzmSrc:''
      }
    },
    methods: {
      back(){
        history.back()
      },
      logIn(){
         let checkUsername = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/,
          checkPwdOne = /^[\d\D]{6,12}$/;
          //先做一些简单的判断再提交ajax
          if(checkUsername.test(this.username)==false){
            this.$notify({ type: 'danger', message: '用户名格式不正确' });
            return
          }
          if (checkPwdOne.test(this.password) === false) {
            this.$notify({ type: 'danger', message: '密码格式不正确' });
            return
          };
          if(this.code==''|| this.code==undefined){
            this.$notify({ type: 'danger', message: '验证码格式不正确' });
            return
          }
        this.$axios.get('/qxcgrqr/User?operation=login&username='+this.username+'&password='+this.password+'&validationCode='+this.code
            )
            .then(res => {
              if(res.state){
                this.$notify({ type: 'success', message: res.message });
                sessionStorage.setItem('user',JSON.stringify(res.data));
                this.$store.state.isLogin=true;
                this.$store.state.username=res.data.username;
                this.$router.push('/')
              }else{
               this.$notify({ type: 'danger', message: res.message });
               this.code='';
               this.changeCodeImg()
              }
            })
            .catch(err => {
            console.log("err", err);
        });
      },
      changeCodeImg:function(){
  　　　　var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
  　　　　this.yzmSrc='http://39.98.58.102:8090/qxcgrqr/ValidationCode?'+num;
  　　},
    },
    mounted(){
      this.changeCodeImg()
    }
  }
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  background: #fff;
  .logoIcon {
    width: 150px;
    height: 150px;
    margin: 30px auto;
    background: url(../../assets/img/logo.png) center center no-repeat;
    background-size: 100% 100%;
    text-indent: -999em;
}
.form-login {
    background: #fff;
    margin-bottom: 20px;
    padding: 20px;
    li{
      color: #333;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      label{
        display: block;
      }
      input{
        width: 79%;
        line-height: 36px;
        background: transparent;
        position: absolute;
        right: 0;
        top: 0;
        border: 0 none;
        font-size: 14px;
      }
      .van-icon{
        position: absolute;
        right: 0;
        bottom: 8px;
      }
    }
    li.yzm-li{
      img{
        position: absolute;
        right: 0;
        height: 34px;
        top: 2px;
        z-index: 3;
      }
    }
}
.van-button--block{
  width: 90%;
  margin: 0 auto;
}
  .forgetWarp{
    height: 40px;
    line-height: 40px;
    color: #666;
    font-size: 12px;
    padding: 0 25px;
    .fr{
      float: right;
    }
  }
}

</style>