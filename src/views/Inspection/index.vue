<template>
  <div>
    <van-nav-bar title="道路巡查" left-text="返回" right-text="新增" @click-left="back" @click-right="$router.push('/inspection/Add')" left-arrow />
    <van-sticky :offset-top="0">
         <van-tabs v-model="active" @click="getQuestionByTypeid2">
            <van-tab title="巡查记录"></van-tab>
            <van-tab title="管理"></van-tab>
        </van-tabs>
    </van-sticky>
    <van-tabs class="content">
      <van-tab v-model="cur">
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
                        <p class="li-bottom"><span>{{item.geometry_wkt}}</span><van-tag type="primary">{{item.state}}</van-tag></p>  
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
      page:1,
      count:10,
      start:0,
      img1:'https://img.yzcdn.cn/vant/apple-1.jpg',
      img2:'https://img.yzcdn.cn/vant/apple-2.jpg',
      img3:'https://img.yzcdn.cn/vant/apple-3.jpg',
      detail:{},
      curId:null,
      cur:0
    };
  },
  methods: {
    back() {
      history.back();
    },
    showDetail(id){
        this.$router.push({
            name:'inspectionDetail',
            params:{id:id}
        })
    },
    onLoad(){
        this.page+=1;
        this.getList(this.curId);
    },
    getQuestionByTypeid2(itd,title){
        this.curId = itd;
        this.getList(itd)
    },
    getList(num){
        let url="";
        var roleId = sessionStorage.getItem('user').roleid;
        if(num==0){
            url = "/qxcgrqr/Process?operation=query&type=roadwatch&start="+(this.page-1)*this.count+'&count='+this.count;
        }else if(roleId==1){
            url = "/qxcgrqr/Process?operation=query&type=roadwatch&field=state&value=巡查中&start="+this.page+'&count='+this.count;
        }else
        {
            this.cur=0;
            this.$notify({ type: 'warning', message: "您还没有权限访问" });
            return
        }
        this.$axios
            .get(url)
            .then(res => {
                this.loading=false;
                if(res.state){
                    if(res.data.length){
                        this.list = res.data;  
                    }else{
                        this.finished=true;
                    }  
                }else{
                    this.$notify({ type: 'warning', message: res.message });
                }
            })
            .catch(err => {
            console.log("err", err);
        });
    },
    
  },
  created(){
      this.getList(this.active);
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