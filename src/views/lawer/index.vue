<template>
  <div>
    <van-nav-bar fixed placeholder title="政策法规" left-text="返回" @click-left="back" left-arrow/>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <template v-for="(item,index) in list">
        <van-cell :key="index" :title="item.title" :value="item.publishtime" @click="handleList(item.id)" right-arrow/>
      </template>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        title:'云南《关于支持滇中新区深化改革创新加快推动高质量发展的实施意见》综',
        publishtime:'2020-02-25 10:11',
        src:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
        id:"1"
      },{
        title:'关于正是启用叮叮【员工健康】上报的通知',
        src:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
        publishtime:'2020-02-25 10:11',
        id:"2"
      },
      {
       title:'关于正是启用叮叮【员工健康】上报的通知',
        src:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
        publishtime:'2020-02-25 10:11',
        id:"3"
      },
      {
        title:'关于正是启用叮叮【员工健康】上报的通知',
        src:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
        publishtime:'2020-02-25 10:11',
        id:"4"
      },
      {
        title:'关于正是启用叮叮【员工健康】上报的通知',
        src:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
        publishtime:'2020-02-25 10:11',
        id:"5"
      }],
      loading: false,
      finished: false
    };
  },

  created() {
    this.getList();
  },

  methods: {
    back() {
      history.back();
    },
    async getList() {
      let url = "/qxcgrqr/Process?operation=query&type=policy";
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
            name: 'lawerDetail', // 路径
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
.van-card__content{
    min-height: auto;
    .van-card__desc{
        text-align: right;
    }
}
</style>


