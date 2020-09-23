<template>
  <div class="case-add">
    <van-nav-bar fixed placeholder title="道路巡查新增" left-text="返回" @click-left="back" left-arrow />
    <van-form @submit="onSubmit">
          <van-cell-group>
            <van-field v-model="form.name" label="道路名称" placeholder="请输入道路名" />
            <van-field v-model="form.type" label="类型" placeholder="请输入类型" />
            <van-field v-model="form.goLine" label="巡查路线" placeholder="请输入巡查路线" />       
            <van-field name="uploader" label="照片上传">
              <template #input>
                <van-uploader v-model="form.uploader" :max-count="2" />
              </template>
            </van-field>
            <van-field
              v-model="form.content"
              rows="2"
              autosize
              label="巡查内容"
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
import $ from "jquery"
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
        this.$notify({ type: 'danger', message: '请输入道路名称' });
        return
      };
      if(this.form.type=='' || this.form.type==undefined){
        this.$notify({ type: 'danger', message: '请输入类型' });
        return
      }
      if(this.form.goLine=='' || this.form.goLine==undefined){
        this.$notify({ type: 'danger', message: '请输入巡查路线' });
        return
      }
      if(this.form.content=='' || this.form.content==undefined){
        this.$notify({ type: 'danger', message: '请输入内容' });
        return
      }
      var data = {
        name:this.form.name,
        type:this.form.type,
        goline:this.form.goLine,
        content:this.form.content,
        operator:JSON.parse(sessionStorage.getItem('user')).truename,
        state:'巡查中'
      };
      console.log(values.uploader)
      values.uploader.forEach((item,index) => {
        var index=index+1;
        data['pic'+index] = item.content.substring(item.content.indexOf(',')+1);
      });
      $.ajax({
                url: '/api/qxcgrqr/Process?type=roadwatch&operation=add',
                type: "POST",
                dataType: 'JSON',
                async: true,
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                success: res=> {
                    // 处理成功回调
                    if (res.state == true) {
                      this.$notify({ type: 'success', message: res.message });
                    } else {
                      this.$notify({ type: 'error', message: res.message });
                    }
                },
                error: function (err) {
                    console.log(err, 'err');
                }
            });
      
      
    },
  },
};
</script>

<style>
</style>