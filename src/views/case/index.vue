<template>
  <div class="case-add">
    <van-nav-bar fixed placeholder title="案件" left-text="返回" @click-left="back" left-arrow />
    <van-card
      v-for="(item,index) in list"
      :key="index"
      :price="item.Registertime"
      :desc="item.content"
      :title="item.name"
      :thumb="imgSrc"
      @click="toDetail(item.id)"
    >
    <template #tags>
        <van-tag plain type="primary">{{item.state}}</van-tag>
    </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        imgSrc:require('../../assets/img/down.jpeg'),
        list:[
            // {
            //     name:'案件1',
            //     type:'类型',
            //     content:'案件1内容案件1内容案件1内容案件1内容案件1内容案件1内容',
            //     Picture1:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
            //     Registertime:'2020-09-04',
            //     Geometry_wkt:'131.4,34',
            //     state:'处理中',
            //     id:1
            // },
            // {
            //     name:'案件2',
            //     type:'类型',
            //     content:'案件1内容案件1内容案件1内容案件1内容案件1内容案件1内容',
            //     Picture1:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
            //     Registertime:'2020-09-04',
            //     Geometry_wkt:'131.4,34',
            //     state:'处理中',
            //     id:2
            // },
            // {
            //     name:'案件3',
            //     type:'类型',
            //     content:'案件1内容案件1内容案件1内容案件1内容案件1内容案件1内容',
            //     Picture1:'http://www.kuaibao.cn/d/file/p/2020/08/cdb33d0def67ba6a16f1dbda260aa140.png',
            //     Registertime:'2020-09-04',
            //     Geometry_wkt:'131.4,34',
            //     state:'处理中',
            //     id:3
            // }

        ],
       
    };
  },
  methods: {
    back() {
      history.back();
    },
    toDetail(id){
        console.log(id)
        this.$router.push({
            path: '/caseDetail/'+id
        })
    },
    getCase(){
      let url = "/qxcgrqr/Process?operation=query&type=caseinfo"; // /api/goods
      this.$axios
        .get(url)
        .then(res => {
          if(res.state){
            this.list = res.data;
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
    
  },
  created(){
    this.getCase()
  }
};
</script>

<style lang="less">
.van-card__price-currency{
    display: none;
}
</style>