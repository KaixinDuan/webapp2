<template>
  <div class="calendar-sigin">
       <van-nav-bar fixed placeholder title="巡查签到" left-text="返回" :right-text="!isCount?'签到首页':'签到统计'" @click-right="rightHandle()" @click-left="back" left-arrow/>
       <div v-if="isCount">
            <van-calendar
            :poppable="false"
            :show-confirm="false"
            :min-date="minDate"
            :max-date="maxDate"
            :style="{ height: '500px' }"
            />
            <van-button type="primary" block @click="qiandaoHandle">签到</van-button>
       </div>
    <div v-else>
        <div  v-if="list&&list.length>0">
            <van-cell v-for="(item,index) in list" :key="index"  center :title="item.name" :value="item.signtime" :label="item.remark" />
        </div>
         <van-empty v-else description="暂无签到记录" />
    </div>
  </div>
</template>

<script>
var user = JSON.parse(sessionStorage.getItem('user'));
var latitude='';
var longitude='';
window.addEventListener('load', function() {
    console.log(111)
        if (navigator.geolocation) {
            console.log(navigator.geolocation)
            navigator.geolocation.watchPosition(update);
        }
    }, false);

function update(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(latitude,longitude)
}
import $ from 'jquery'
export default {
    data(){
        return{
            defaultdate:[],
            minDate: new Date(),
            maxDate: new Date(),
            list:[],
            isCount:true
        }
    },
    methods:{
        back(){
            history.back()
        },
        qiandaoHandle(){
            console.log(new Date())
            var data={
                userid:user.username,
                name:user.truename
            };
            let url = "/api/qxcgrqr/Process?operation=add&type=signpunch"; // /api/goods
            $.ajax({
                url: url,
                type: "POST",
                dataType: 'JSON',
                async: true,
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                success: res=> {
                    // 处理成功回调
                    if (res.state == true) {
                        this.$notify({ type: 'success', message: res.message });
                    } else {
                        this.$notify({ type: 'danger', message: res.message });
                    }
                },
                error: function (err) {
                    console.log(err, 'err');
                }
            });
        },
        rightHandle(){
            this.isCount=!this.isCount;
            if(!this.isCount){
                this.getList()
            }
        },
        getList(){
            // signpunch
            // var username = sessionStorage.getItem('user').username;
            console.log(user)
            let url = "/qxcgrqr/Process?operation=query&type=signpunch&field=name,userid&value="+user.truename+','+user.username; // /api/goods
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
    }
}
</script>

<style scoped lang="less">
/deep/.van-calendar__header-title{
    display: none;
}
</style>