<template>
  <div class="page">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="back"></van-nav-bar>

    <van-cell-group class="mt-10">
      <van-cell title="用户名" :value="$store.state.username"></van-cell>
      <van-cell isLink title="登录密码" value="重置"></van-cell>
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="logout">
      <p class="blue">退出登录</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      history.back();
    },
    async logout() {
      let url = "/logout";
      let res = await this.$axios.post(url);
      // 修改登陆状态
      this.$store.commit("updateLogin", false);
      // 把用户名置空
      this.$store.commit("updateUsername", "");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.logout {
  bottom: 0;
  height: 50px;
  color: #ff5f16;
}
</style>

