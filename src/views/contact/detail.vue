<template>
    <div>
        <van-nav-bar fixed placeholder title="通讯录" left-text="返回" @click-left="back" left-arrow />
        <van-list>
            <van-cell title="真实名称" :value="userDetail.truename" />
            <van-cell title="手机号" :value="userDetail.phone" />
            <van-cell title="邮箱" :value="userDetail.email" />
            <van-cell title="部门" :value="userDetail.department" />
        </van-list>
  </div>
</template>

<script>
export default {
    data() {
        return {
            img1:'https://img.yzcdn.cn/vant/apple-1.jpg',
            img2:'https://img.yzcdn.cn/vant/apple-2.jpg',
            img3:'https://img.yzcdn.cn/vant/apple-3.jpg',
            userDetail:{}
        }
    },
    methods: {
        back() {
            history.back();
        },
        getDetail(id){
            let url = "/qxcgrqr/User?operation=query&type=caseinfo&field=username&value="+id; // /api/goods
            this.$axios
                .get(url)
                .then(res => {
                if(res.state){

                    this.userDetail = res.data[0];
                }
                })
                .catch(err => {
                console.log("err", err);
            });
        }
        
    },
    created(){
        var id = this.$route.params.id;
        this.getDetail(id)
        console.log(id)
    }
}
</script>

<style scoped lang="less">
.van-cell__value--alone{
    color:#969799;
    text-indent: 1em;
}
</style>