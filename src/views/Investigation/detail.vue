<template>
    <div style="height:100%;background:#fff">
        <van-nav-bar fixed placeholder title="安全排查" left-text="返回" @click-left="back" left-arrow />
        <van-grid :border="false" :column-num="3">
            <van-grid-item>
                <van-image :src="detail.pic1?('data:image/png;base64,'+detail.pic1):img1" />
            </van-grid-item>
            <van-grid-item>
                <van-image :src="detail.pic2?('data:image/png;base64,'+detail.pic2):img2" />
            </van-grid-item>
            <van-grid-item>
                <van-image :src="detail.pic3?('data:image/png;base64,'+detail.pic1):img3" />
            </van-grid-item>
        </van-grid>
        <van-list>
            <van-cell title="排查名称" :value="detail.name" />
            <van-cell title="类型" :value="detail.type" />
            <van-cell title="状态" :value="detail.state" />
            <van-cell title="执法部门" :value="detail.department" />
            <van-cell title="经办人" :value="detail.operator" />
            <van-cell title="时间" :value="detail.registertime" />
            <van-cell title="地点" value="查看" is-link url="/vant/mobile.html"></van-cell>
            <van-cell title="排查情况" />
            <van-cell >
                <van-field disabled
                    v-model="detail.content"
                    min-rows="3"
                    autosize
                    type="textarea"
                />
            </van-cell>
            <van-cell title="整改意见" :value="detail.tips"/>
            <van-cell title="审核人" :value="detail.reviewer"/>
            <van-cell title="整改结果" />
            <van-cell >
                <van-field disabled
                    v-model="detail.result"
                    min-rows="3"
                    autosize
                    type="textarea"
                />
            </van-cell>
        </van-list>
    </div>
</template>
<script>
export default {
    data(){
        return{
            img1:'https://img.yzcdn.cn/vant/apple-1.jpg',
            img2:'https://img.yzcdn.cn/vant/apple-2.jpg',
            img3:'https://img.yzcdn.cn/vant/apple-3.jpg',
            detail:{}
        }
    },
    methods:{
        back() {
            history.back();
        },
        getDetail(id){
            let url = "/qxcgrqr/Process?operation=query&type=safety&field=id&value="+id; // /api/goods
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
    },
    created(){
        console.log(this.$route.params.id)
        this.getDetail(this.$route.params.id)
    }
}
</script>
