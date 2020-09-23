<template>
  <div style="height:100%;background:#fff">
    <van-nav-bar fixed placeholder title="通知公告" left-text="返回" @click-left="back" left-arrow/>
    <div class="content">
      <h5>{{detail.title}}</h5>
      <p class="tig">发布人：<em>{{detail.publisher}}</em><span>发布时间：<em>{{detail.publishtime}}</em></span></p>
      <div class="content-box" v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      loading: false,
      finished: false
    };
  },

  created() {
    this.getDetail(this.$route.params.id)
  },

  methods: {
    back() {
      history.back();
    },
    getDetail(id){
      let url = "/qxcgrqr/Process?operation=query&type=lawpublic&field=id&value="+id; // /api/goods
            this.$axios
                .get(url)
                .then(res => {
                  if(res.state){
                      this.detail = res.data[0];
                  }
                })
                .catch(err => {
                console.log("err", err);
            });
    }
  }
};
</script>

<style lang="less">
.content{
  padding: 20px;
  h5{
    width: 90%;
    margin: 0 auto;
    line-height: 26px;
    text-align: center;
  }
  p.tig{
        color: #ccc;
        font-size: 14px;
        padding: 10px 0 20px;
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


