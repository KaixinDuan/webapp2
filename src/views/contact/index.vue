<template>
  <div class="contact">
      <!-- <van-nav-bar fixed placeholder title="通讯录" left-text="返回" @left-click="back" left-arrow/> -->
       <van-nav-bar fixed placeholder title="通讯录" left-text="返回" @click-left="back" left-arrow/>
    <van-index-bar :sticky='false'>
        <van-index-anchor v-for="(item,index) in list" :key="index" :index="index">
            <span class="indexWord" v-show="item.length>0">{{index}}</span>
            <van-cell @click="handleList(citem.username)" v-for="(citem,cindex) in item" :key="cindex" :title="citem.truename" :value="citem.phone"/>   
        </van-index-anchor>
      </van-index-bar>
    
  </div>
</template>
<script>
let pinyin = require('js-pinyin')
pinyin.setOptions({checkPolyphone:false,charCase:0})
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      FirstPin: ["A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","W","X","Y","Z"]
    };
  },

  mounted() {
    this.getList();
  },

  methods: {
    back() {
      history.back()
    },
    getList() {
      let url = "/qxcgrqr/User?operation=query";
      this.loading = true;
      this.$axios
            .get(url)
            .then(res => {
                if(res.state){
                    let firstName = {};
                    this.FirstPin.forEach((item)=>{
                      firstName[item] = [];
                      res.data.forEach((el)=>{
                        if(el.truename){
                          let first = pinyin.getFullChars(el.truename).substring(0,1);
                           if( first == item ){
                              firstName[item].push(el)
                            }    
                        }
                      })
                    })
                    this.list=firstName;
                    console.log(this.list,'list')
                }else{
                    Notify({ type: 'warning', message: res.message });
                }
            })
            .catch(err => {
            console.log("err", err);
        });
    },
    handleList(id){
        this.$router.push({
            name: 'contactDetail', // 路径
            params:{
                id: id, // 参数1
            }
        })
    }
  }
};
</script>

<style lang="less">
.content{
background: #eee;
}
::v-deep .van-index-anchor{
padding: 0;
b{
padding-left:10px;
font-size: 14px;
font-weight: 600;
}
}
</style>