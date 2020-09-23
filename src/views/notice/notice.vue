<template>
  <div>
    <van-nav-bar fixed placeholder title="通知公告" left-text="返回" @click-left="back" left-arrow/>
    <van-search v-model="searchword" placeholder="请输入搜索关键词" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
      <template >
        <div class="notice-list" v-for="(item,index) in list" :key="index+''" @click="handleList(item.id)">
            <h5>{{item.title}}</h5>
            <div>{{item.content}}</div>
            <p><em>{{item.publisher}}</em><span>发布时间：<em>{{item.publishtime}}</em></span></p>
        </div>
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
      searchword:''
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
      let url = "/qxcgrqr/Process?operation=query&type=notice";
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
            path: '/notice/detail/'+id
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
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    div{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 12px;
      line-height: 16px;
      color:#333;
      margin-bottom: 8px;
    }
    p{
        color: #ccc;
        font-size: 12px;
        em{
          font-style: normal;
          color: #7fb9fc;
        }
        span{
          float: right;
        }
    }
}
</style>


