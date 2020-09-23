<template>
  <div>
    <van-nav-bar fixed placeholder title="执法宣传" left-text="返回" @click-left="back" left-arrow/>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <template v-for="(item,index) in list">
        <van-card 
        :key="index"
        :title="item.title"
        :desc="item.publishtime"
        :thumb="item.src?item.src:defaultSrc"
        @click="handleList(item.id)"
        />
      </template>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      defaultSrc:require("../../assets/img/default.jpg")
    };
  },

  created() {
    // this.getList();
  },

  methods: {
    back() {
      history.back();
    },
    async getList() {
      let url = "/qxcgrqr/Process?operation=query&type=lawpublic";
      this.loading = true;
      try {
        let res = await this.$axios.get(url);
        this.list = res.data;
      } catch (error) {}
      this.loading = false;
      this.finished = true;
    },
    handleList(id){
        this.$router.push({
            name: 'volumeDetail', // 路径
            params:{
                id: id, // 参数1
            }
        })
    }
  }
};
</script>

<style lang="less">
.card__footer {
  padding-top: 10px;
}
.card__tags {
  .van-tag {
    margin-right: 5px;
  }
}
.notice-list{
    background: #fff;
    padding:10px 25px;
    border-bottom: 1px solid #eee;
    h5{
        font-size: 14px;
        font-weight: normal;
        line-height: 34px;
    }
    p{
        color: #ccc;
        font-size: 12px;
    }
}
</style>


