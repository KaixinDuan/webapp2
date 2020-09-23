<template>
  <div class="container bgF">
    <van-nav-bar title="注册" left-text="返回" @click-left="back" left-arrow/>
    <h2 class="logoIcon"></h2>
    <ul class="formCom form-login">
      <li>
        <label>
          <span>用户名</span>
          <input type="text" placeholder="请输入用户名" v-model.trim='form.username'/>
          <van-icon @click='form.username = ""' name="close"/>
        </label>
      </li>
     <li>
        <label>
          <span>真实姓名</span>
          <input type="text" placeholder="请输入真实姓名" v-model.trim='form.truename'/>
          <van-icon @click='form.truename = ""' name="close"/>
        </label>
      </li>
      <li>
        <label>
          <span>手机号码</span>
          <input type="number" placeholder="请输入手机号码" v-model.trim='form.phone'/>
          <van-icon @click='form.phone = ""' name="close"/>
        </label>
      </li>
      <li :class="showPwdOne?'icon-eye1':'icon-eye2'">
        <label>
          <span>登录密码</span>
          <input :type="showPwdOne?'password':'text'" placeholder="请输入6-12位密码" v-model.trim='form.password'>
          <van-icon @click='showPwdOne = !showPwdOne' :name="showPwdOne?'eye-o':'closed-eye'"/>
        </label>
      </li>
      <li :class="showPwdTwo?'icon-eye1':'icon-eye2'">
        <label>
          <span>确认密码</span>
          <input :type="showPwdTwo?'password':'text'" placeholder="请输入6-12位确认密码" v-model.trim='form.pwdTwo'>
          <van-icon @click='showPwdTwo = !showPwdTwo' :name="showPwdTwo?'eye-o':'closed-eye'"/>
        </label>
      </li>
      <li :class="showPwdTwo?'icon-eye1':'icon-eye2'">
        <label>
          <span>部门</span>
          <van-field
            readonly
            clickable
            name="picker"
            :value="form.department"
            placeholder="点击选择部门"
            @click="showPicker = true"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              value-key="name"
              :columns="departments"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
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
    <van-button type="primary" block @click='goReg'>立即注册</van-button>
    <div class="forgetWarp">
      <span class="fr col6" @click="$router.push('/login')">已有账号？去登陆</span>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        showPicker:false,
        form:{
           username:'',
          
          
        },
        pwdOne: '',
        pwdTwo: '',
       code:'',
        checked: true,      //是否同意协议
        showPwdOne: true,   //开关--明文显示第一个密码
        showPwdTwo: true,   //开关--明文显示第二个密码
        canvas: {},          //存放canvas DOM节点
        yzmSrc:require('../../assets/img/yzm.jpg'),
        departments:[],
        value:''
      }
    },
    methods: {
        back(){
            history.back()
        },
        onConfirm(picture,value) {
          this.form.department = picture.name;
          this.form.departmentid = picture.id;
          this.showPicker = false;
        },
        changeCodeImg:function(){
    　　　　var num=Math.ceil(Math.random()*10);//生成一个随机数（防止缓存）
    　　　　this.yzmSrc='http://39.98.58.102:8090/qxcgrqr/ValidationCode?'+num;
    　　},
      goReg() {
        let checkUsername = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/,
          checkPwdOne = /^[\d\D]{6,12}$/,
          checkSMS = /^[0-9]{4,8}$/,
          checkName=/^[\u4e00-\u9fa5]{2,6}$/,
          checkPhone = /^\d{11}$/;
        //先做一些简单的判断再提交ajax
        if(checkUsername.test(this.form.username)==false){
          this.$notify({ type: 'danger', message: '用户名格式不正确' });
          return
        }
        if(checkName.test(this.form.truename)==false){
          this.$notify({ type: 'danger', message: '真实姓名格式不正确' });
          return
        }
        if(checkPhone.test(this.form.phone)==false){
          this.$notify({ type: 'danger', message: '电话号码格式不正确' });
          return
        }
        if (checkPwdOne.test(this.form.password) === false) {
          this.$notify({ type: 'danger', message: '密码格式不正确' });
          return
        };
        if (this.pwdTwo !== this.form.password) {
          this.$notify({ type: 'danger', message: '确认密码不正确' });
          return
        };
        if(this.form.department==''||this.form.department==undefined){
          this.$notify({ type: 'danger', message: '请选择部门' });
          return
        }
        if(this.code==''||this.code==undefined){
          this.$notify({ type: 'danger', message: '验证码错误' });
          return
        }

        this.$axios.get('/qxcgrqr/User?operation=add&validationCode='+this.code+'&data='+encodeURIComponent(encodeURIComponent(JSON.stringify(this.form))))
            .then(res => {
              if(res.state){
                this.$notify({ type: 'success', message: res.message });
                this.$router.push({path:'/login'})
              }else{
               this.$notify({ type: 'danger', message: res.message });
              }
            })
            .catch(err => {
            console.log("err", err);
        });
      },
      sendCode(val) {
        this.imgCode = val
      },
      
      getDepartment(){
        this.$axios.get('qxcgrqr/Process?operation=query&type=department')
            .then(res => {
              if(res.state){
               this.departments = res.data;
              }else{
               
              }
            })
            .catch(err => {
            console.log("err", err);
        });
      },
    },
    created(){
      this.getDepartment()
    }
  }
</script>
<style lang="less" scoped>
.container{
  height: 100%;
  background: #fff;
  .logoIcon {
    width: 120px;
    height: 120px;
    margin: 30px auto;
    background: url(../../assets/img/logo.png) center center no-repeat;
    background-size: 100% 100%;
    text-indent: -999em;
}
.form-login {
    background: #fff;
    margin-bottom: 20px;
    padding: 0 20px;
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
        width: 75%;
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
    .van-cell--clickable{
      float: right;
      width: 75%;
      padding-left: 0;
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