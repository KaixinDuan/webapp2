<template>
  <div class="case-add">
    <van-nav-bar fixed placeholder title="案件上报" left-text="返回" @click-left="back" left-arrow />
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field v-model="form.name" label="案件名" placeholder="请输入案件名" />
        <van-field v-model="form.type" label="类型" placeholder="请输入类型" />
        <van-field name="uploader" label="照片上传">
          <template #input>
            <van-uploader v-model="form.uploader" :max-count="2" />
          </template>
        </van-field>
        <van-field
          v-model="form.content"
          rows="2"
          autosize
          label="内容"
          type="textarea"
          maxlength="200"
          placeholder="请输入内容"
          show-word-limit
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import $ from "jquery";
import qs from 'qs'
import * as dataService from "../../assets/add"
function isJson(obj){
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
export default {
  data() {
    return {
      form: {
        name: "",
        uploader: [],
      },
      showPicker: false,
    };
  },
  methods: {
    back() {
      history.back();
    },
    onConfirm(time) {
      this.value = time;
      this.showPicker = false;
    },
    onSubmit(values) {
      if(this.form.name=='' || this.form.name==undefined){
        this.$notify({ type: 'danger', message: '请输入案件名' });
        return
      };
      if(this.form.type=='' || this.form.type==undefined){
        this.$notify({ type: 'danger', message: '请输入案件类型' });
        return
      }
      if(this.form.content=='' || this.form.content==undefined){
        this.$notify({ type: 'danger', message: '请输入内容' });
        return
      }
      var data = {
        'name':this.form.name,
        'type':this.form.type,
        'content':this.form.content,
        'operator':JSON.parse(sessionStorage.getItem('user')).truename,
        'state': '处理中',
        'geometry_wkt': ''
      };
      values.uploader.forEach((item,index) => {
        var index=index+1;
        data['pic'+index] = item.content.substring(item.content.indexOf(',')+1);
      });
      $.ajax({
                url: '/api/qxcgrqr/Process?type=caseinfo&operation=add',
                type: "POST",
                dataType: 'JSON',
                async: true,
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                success: res=> {
                    // 处理成功回调
                    if (res.state == true) {
                      this.$notify({ type: 'success', message: res.message });
                      this.$router.push({path:'/case'})
                    } else {
                        this.$notify({ type: 'danger', message: res.message });
                    }
                },
                error: function (err) {
                    console.log(err, 'err');
                }
            });
      
      // this.$axios.post('/api/qxcgrqr/Process?type=caseinfo&operation=add',{data:encodeURIComponent(encodeURIComponent(JSON.stringify(data)))}
      //   )
      //       .then(res => {
      //         if(res.state){
      //           this.$notify({ type: 'success', message: res.message });
      //           sessionStorage.setItem('user',JSON.stringify(res.data));
      //           this.$router.push('/')
      //         }else{
      //          this.$notify({ type: 'danger', message: res.message });
      //          this.code='';
      //          this.changeCodeImg()
      //         }
      //       })
      //       .catch(err => {
      //       console.log("err", err);
      //   });
      // console.log('submit', values.uploader);
      }
    
  },
};
</script>

<style>
</style>