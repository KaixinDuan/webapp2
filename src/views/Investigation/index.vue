<template>
  <div>
    <van-nav-bar title="安全排查" fixed placeholder left-text="返回" right-text="新增" @click-left="back" @click-right="$router.push('/investigation/Add')" left-arrow />
    <van-sticky :offset-top="0">
         <van-tabs v-model="active">
            <van-tab title="排查记录"></van-tab>
            <van-tab title="详情"></van-tab>
        </van-tabs>
    </van-sticky>
   
    <van-tabs v-model="active" class="content">
      <van-tab>
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
                <ul class="list-box">
                    <li v-for="(item,index) in list" :key="index" @click="showDetail(item.id)">
                        <div class="li-top">
                            <img :src="item.pic1?('data:image/png;base64,'+item.pic1):img1">
                            <div class="fr">
                                <h5>{{item.name}}<span class="fr">{{item.Registertime}}</span></h5>
                                <p class="line">{{item.goline}}</p>
                                <p class="content">{{item.content}}</p>
                            </div>
                        </div>
                        <p class="li-bottom"><span>{{item.type}}</span><van-tag type="primary">{{item.state}}</van-tag></p>  
                    </li>
                </ul>
            </van-list>
      </van-tab>
      <van-tab >
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      loading:false,
      list: [],
      finished: true,
      img1:'https://img.yzcdn.cn/vant/apple-1.jpg',
      img2:'https://img.yzcdn.cn/vant/apple-2.jpg',
      img3:'https://img.yzcdn.cn/vant/apple-3.jpg',
      detail:{}
    };
  },
  methods: {
    back() {
      history.back();
    },
    showDetail(id){
        this.active=1;
        this.getDetail(id)
    },
    onLoad(){

    },
    getList(){
        let url = "/qxcgrqr/Process?operation=query&type=safety"; // /api/goods
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
    },
    getDetail(id){
        this.$router.push({
            name:'investigationDetail',
            params:{id:id}
        })
    }
  },
  created(){
      this.getList()
  }
};
</script>

<style scoped lang="less">
.content{
    /deep/.van-tabs__wrap{
        display: none;
    }
}
.list-box{
    .fr{
        float: right;
    }
    li{
        padding: 10px 20px;
        height: 130px;
        background: #fff;
        margin-bottom: 8px;
        vertical-align: top;
        position: relative;
        .li-top{
            height: 90px;
            border-bottom: 1px solid #ccc;
            img{
                width: 120px;
                height: 80px;
            }
            &>div{
                width: calc(100% - 120px);
                padding-left: 10px;
            }
            h5{
                font-weight: normal;
                line-height: 28px;
                span{
                    font-size: 14px;
                    color: #ccc;
                }
            }
            .line{
                margin-top: 3px;
                font-size: 14px;
            }
            .content{
                font-size: 14px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                color: #808080;
                margin-top: 10px;
            }
        }
        .li-bottom{
            height: 30px;
            line-height: 30px;
            position: relative;
            .van-tag{
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>