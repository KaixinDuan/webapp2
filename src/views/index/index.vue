<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" style="width:100%;height:270px"/>
      </van-swipe-item>
    </van-swipe>
    <van-grid gutter="10"> 
      <van-grid-item v-for="(item,index) in gridItems" :to="item.to" :key="index" :icon="item.icon" :text="item.text" />
    </van-grid>
    <Footer page="index"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
var location_lon = '',location_lat = ''; // 经度,纬度
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (position) {
        location_lon = position.coords.longitude;
        location_lat = position.coords.latitude;
        alert('h5经度：'+location_lon);alert('h5纬度：'+location_lat);
    });
}else {
    alert("您的设备不支持定位功能");
}
export default {
  data() {
    return {
        images: [
        require('../../assets/img/banner1.jpeg'),
        require('../../assets/img/banner2.jpeg'),
        require('../../assets/img/banner3.jpeg'),
      ],
      active: 0,
      gridItems:[{
        text:'通知公告',
        icon:'bell',
        to:'notice'
      },{
        text:'执法宣传',
        icon:'volume',
        to:"/volume"
      },{
        text:'政策法规',
        icon:'todo-list',
        to:"lawer"
      },{
        text:'通讯录',
        icon:'friends',
        to:'/contact'
      },{
        text:'二维码扫描',
        icon:'enlarge',
        to:'scanning'
      },{
        text:'巡查签到',
        icon:'eye',
        to:'calendarSign'
      },{
        text:'二维码签到',
        icon:'photo-fail',
        to:'QRsignIn'
      },{
        text:'地图导航',
        icon:'location',
        to:'mapNavigation'
      },{
        text:'案件上报',
        icon:'add-square',
        to:'caseAdd'
      },{
        text:'案件处理',
        icon:'clock',
        to:'caseList'
      },{
        text:'道路巡查',
        icon:'browsing-history',
        to:'Inspection'
      },{
        text:'安全排查',
        icon:'warning',
        to:'Investigation'
      }],
      
    };
  },
  created() {
    let index = this.active + 1;
    this.list = this[`list${index}`]; // this.list1
    // this.getGoods();
  },
  components: {
    Footer
  },
  methods: {
    onchange(index) {
      this.list = this[`list${index + 1}`];
    },

    getGoods() {
      let url = "/goods"; // /api/goods
      this.$axios
        .get(url)
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.van-grid{
  margin-top:10px;
  color: #fff;
}
/deep/.van-grid-item:nth-of-type(1) .van-grid-item__content{
  background-color:#429ef1
}
/deep/.van-grid-item:nth-of-type(2) .van-grid-item__content{
  background-color:#18d0a2
}
/deep/.van-grid-item:nth-of-type(3) .van-grid-item__content{
  background-color:#f55151
}
/deep/.van-grid-item:nth-of-type(4) .van-grid-item__content{
  background-color:#63b2d3
}
/deep/.van-grid-item:nth-of-type(5) .van-grid-item__content{
  background-color:#efc369
}
/deep/.van-grid-item:nth-of-type(6) .van-grid-item__content{
  background-color:#de4e79
}
/deep/.van-grid-item:nth-of-type(7) .van-grid-item__content{
  background-color:#4e84de
}
/deep/.van-grid-item:nth-of-type(8) .van-grid-item__content{
  background-color:#07c160
}
/deep/.van-grid-item:nth-of-type(9) .van-grid-item__content{
  background-color:#ff6c6c
}
/deep/.van-grid-item:nth-of-type(10) .van-grid-item__content{
  background-color:#d1de4e
}
/deep/.van-grid-item:nth-of-type(11) .van-grid-item__content{
  background-color:#4e5bde
}
/deep/.van-grid-item:nth-of-type(12) .van-grid-item__content{
  background-color:#ecec0b
}
/deep/.van-grid-item__text{
  color:#fff;
  font-weight: 500;
  font-size: 12px;
}
.van-grid i{
  color:#fff;
}
</style>
