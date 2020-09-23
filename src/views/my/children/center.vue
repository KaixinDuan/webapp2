<template>
  <div class="center">
    <!-- 头部 -->
    <header>
      <div class="beijin"></div>
      <div class="flex aic users pixed" style="width:50%;">
        <img :src="require('../../../assets/img/personal/tx.jpg')" class="imege" />
        <router-link v-if="!isLogin" to="/login" class="f16 fff ml-20">立即登录</router-link>
        <span v-else class="f16 fff ml-20">用户 {{username}}</span>
      </div>
    </header>

    <!-- 主体 -->
    <main class="mt-10">
      <div class="bg-fff">
        <van-cell title="真实姓名" :value="user.truename"></van-cell>
        <van-cell title="部门名称" :value="user.department"></van-cell>
        <van-cell title="邮箱" :value="user.email"></van-cell>
        <van-cell title="电话" :value="user.phone"></van-cell>
        <van-cell title="上次登陆时间" :value="user.lastlogintime"></van-cell>
        <van-cell title="注册时间" :value="user.registertime" ></van-cell>
        <!-- <van-cell title="设置" isLink to="/my/set"></van-cell> -->
      </div>
    </main>

    <Footer page="my" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
export default {
  components: {
    Footer
  },
  computed: {
    ...mapGetters(["username", "isLogin"])
  },
  data(){
    return{
      user:{}
    }
  },
  created(){
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user)
  }
};
</script>

<style lang="less" scoped>
@import "./center.less";
</style>