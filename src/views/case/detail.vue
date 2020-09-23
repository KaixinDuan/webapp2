<template>
    <div>
        <van-nav-bar fixed placeholder title="案件信息" left-text="返回" @click-left="back" left-arrow />
        <van-grid :border="false" :column-num="3">
            <van-grid-item>
                <van-image :src="caseDetail.pic1?caseDetail.pic1:img1" />
            </van-grid-item>
            <van-grid-item>
                <van-image :src="caseDetail.pic2?caseDetail.pic2:img2" />
            </van-grid-item>
            <van-grid-item>
                <van-image :src="caseDetail.pic3?caseDetail.pic3:img3" />
            </van-grid-item>
        </van-grid>
        <van-list>
            <van-cell title="案件名" :value="caseDetail.name" />
            <van-cell title="案件类型" :value="caseDetail.type" />
            <van-cell title="状态" :value="caseDetail.state" />
            <van-cell title="上传人" :value="caseDetail.operator" />
            <van-cell title="部门" :value="caseDetail.department" />
            <van-cell title="上传时间" :value="caseDetail.registertime" />
            <van-cell title="内容" />
            <van-cell >
                <van-field disabled
                    v-model="caseDetail.content"
                    min-rows="3"
                    autosize
                    type="textarea"
                />
            </van-cell>
        </van-list>
        <van-button v-if="caseDetail.state=='办理中'" type="primary" block @click="handleChange()">审核完结</van-button>
  </div>
</template>

<script>
import $ from "jquery";
export default {
    data() {
        return {
            img1:'https://img.yzcdn.cn/vant/apple-1.jpg',
            img2:'https://img.yzcdn.cn/vant/apple-2.jpg',
            img3:'https://img.yzcdn.cn/vant/apple-3.jpg',
            caseDetail:{}
        }
    },
    methods: {
        back() {
            history.back();
        },
        getDetail(id){
            let url = "/qxcgrqr/Process?operation=query&type=caseinfo&field=id&value="+id; // /api/goods
            this.$axios
                .get(url)
                .then(res => {
                if(res.state){

                    this.caseDetail = res.data[0];
                }
                })
                .catch(err => {
                console.log("err", err);
            });
        },
        handleChange(){
            var data={
                id:this.caseDetail.id,
                name:this.caseDetail.name,
                state:"已完结",
                reviewer:sessionStorage.getItem('user').truename
            }
             $.ajax({
                url: '/api/qxcgrqr/Process?type=caseinfo&operation=edit',
                type: "POST",
                dataType: 'JSON',
                async: true,
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                success: res=> {
                    // 处理成功回调
                    if (res.state == true) {
                        this.$notify({ type: 'success', message: res.message });
                        location.reload()
                    } else {
                        jqtoast(res.message);
                    }
                },
                error: function (err) {
                    console.log(err, 'err');
                }
            });
        }
        
    },
    created(){
        var id = this.$route.params.id;
        this.getDetail(id)
    }
}
</script>

<style scoped lang="less">
.van-cell__value--alone{
    color:#969799;
    text-indent: 1em;
}
</style>