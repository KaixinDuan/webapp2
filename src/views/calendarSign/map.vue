<template>
    <div>
        <div id="mapDiv" style="width: 100%;height: 100%;background-color: #000000;position: absolute;">
        　　<p id="allmap" style="width: 80%;height: 80%;position: absolute;margin: 10%;"></p>
        　　<button type="button" class="btnBg" id="btnMapSet" style="margin-left: 10%;bottom: 5%;position: absolute;display: block;">定位确认</button>
        </div>
    </div>
</template>
<script>
import {map} from '../../utils/map.js'
export default {
    data(){
        return{}
    },
    mounted(){
        this.getCity()
    },
    methods:{
        getCity() {
            map.init().then(BMap => {
                const locationCity = new BMap.Geolocation();
                var that = this;
                locationCity.getCurrentPosition(  
                    function getinfo(options){
                        let city = options.address.city;    //此处拿到位置相关信息
                        that.LocationCity = city;
                        console.log(options)
                    },
                    function (e){
                        that.LocationCity = '定位失败';
                        console.log('定位失败')
                    },
                    {provider: 'baidu'}
                    )
                })
            },
    }
}
</script>