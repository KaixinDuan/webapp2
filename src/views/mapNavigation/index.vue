<template>
  <div style="height:100%;width:100%">
    <van-nav-bar title="道路巡查" left-text="返回" @click-left="back" left-arrow />
    <div class="search-box">
        <div class="input-box">
            <input type="text" id="suggestId" name="address_detail" placeholder="如门牌号等" v-model="address_detail" class="input_style">
            <van-button size="small" type="primary" @click="goMap">去这里</van-button>
        </div>
       
        <div id="allmap"></div>
    </div>
  
  </div>
</template>

<script>
import {MP} from '../../utils/map'
export default {
  data() {
    return {
        sms:'',
        imgSrc:require("../../assets/img/dt.png"),
        address_detail: null, //详细地址
        userlocation:{lng:"",lat:""},  
    };
  },
  methods: {
    back() {
      history.back();
    },
    goMap(){
        // http://api.map.baidu.com/marker?location=纬度,经度&title=所在位置名称&content=所在位置的简介（可选）&output=html"
        window.location.href='http://api.map.baidu.com/geocoder?address='+this.sms+'&output=html&src=webapp.baidu.openAPIdemo'
    }
  },
  created() {
      this.$nextTick(function () {
          MP("FbBEzGR5nYwzv2cpIqNTQ7sSQ6zNIawE").then( BMap => {
            var th = this
            var map = new BMap.Map("allmap");            // 创建Map实例
            var point = new BMap.Point(116.404, 39.915); // 创建点坐标
            map.centerAndZoom(point,15);
            map.enableScrollWheelZoom();
            var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
              {"input" : "suggestId"
              ,"location" : map
            })
            var myValue
            ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
              var _value = e.item.value;
              myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
               this.address_detail = myValue
              setPlace();
            });

            function setPlace(){
              map.clearOverlays();    //清除地图上所有覆盖物
              function myFun(){
                th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                map.centerAndZoom(th.userlocation, 18);
                map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
              }
              var local = new BMap.LocalSearch(map, { //智能搜索
                onSearchComplete: myFun
              });
              local.search(myValue);
            }
            })
          })
    var location_lon = "",
      location_lat = ""; // 经度,纬度
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        location_lon = position.coords.longitude;
        location_lat = position.coords.latitude;
        alert('h5经度：'+location_lon);alert('h5纬度：'+location_lat);
      });
    } else {
      alert("您的设备不支持定位功能");
    }
  },
};
</script>

<style lang="less" scoped>
.search-box{
    height: calc(100% - 80px);
    position: relative;
    .input-box{
        width: 90%;
        position: absolute;
        left: 50%;
        top: 10px;
        z-index: 99999;
        box-sizing: border-box;
        transform: translateX(-50%);
        input{
            width: calc(100% - 80px);
            height: 40px;
            padding: 0 15px;
            line-height: 40px;
            border-radius: 10px 0 0 10px;
            border: 1px solid #ccc;
            float: left;
            box-sizing: border-box;
            
        }
        .van-button--small{
            float: left;
            height: 40px;
            line-height: 40px;
            border-radius: 0px 10px 10px 0;
        }
    }
    
}
#allmap{
    height: 100%;
    width: 100%;
}

</style>