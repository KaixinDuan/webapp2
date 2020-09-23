<template>
  <div class="case-add">
    <van-nav-bar title="安全排查新增" left-text="返回" @click-left="back" left-arrow />
    <van-form @submit="onSubmit">
          <van-cell-group>
            <van-field v-model="form.name" label="排查名称" placeholder="请输入名称" />
            <van-field v-model="form.type" label="类型" placeholder="请输入类型" />
            <van-field v-model="form.location" label="地点" placeholder="请输入地点" />       
            <van-field name="uploader" label="照片上传">
              <template #input>
                <van-uploader v-model="form.uploader" :max-count="2" />
              </template>
            </van-field>
            <van-field
              v-model="form.content"
              rows="2"
              autosize
              label="排查情况"
              type="textarea"
              maxlength="200"
              placeholder="请输入内容"
              show-word-limit
            />
          </van-cell-group>
          <van-field v-model="form.tips" label="整改意见" placeholder="请输入整改意见" />   
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
  </div>
</template>

<script>
import $ from 'jquery'
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
      console.log(JSON.parse(sessionStorage.getItem('user')).truename)
      if(this.form.name=='' || this.form.name==undefined){
        this.$notify({ type: 'danger', message: '请输入名称' });
        return
      };
      if(this.form.type=='' || this.form.type==undefined){
        this.$notify({ type: 'danger', message: '请输入类型' });
        return
      }
      if(this.form.location=='' || this.form.location==undefined){
        this.$notify({ type: 'danger', message: '请输入地点' });
        return
      }
      if(this.form.content=='' || this.form.content==undefined){
        this.$notify({ type: 'danger', message: '请输入内容' });
        return
      }
      if(this.form.tips=='' || this.form.tips==undefined){
        this.$notify({ type: 'danger', message: '请输入整改意见' });
        return
      }
      var data = {
        name:this.form.name,
        type:this.form.type,
        content:this.form.content,
        tips:this.form.tips,
        state:'排查中',
        operator:JSON.parse(sessionStorage.getItem('user')).truename
      };
      values.uploader.forEach((item,index) => {
        var index=index+1;
        data['pic'+index] = item.content.substring(item.content.indexOf(',')+1);
      });
      $.ajax({
                url: '/api/qxcgrqr/Process?type=safety&operation=add',
                type: "POST",
                dataType: 'JSON',
                async: true,
                data: { data: encodeURIComponent(JSON.stringify(data)) },
                success: res=> {
                    // 处理成功回调
                    if (res.state == true) {
                      this.$notify({ type: 'success', message: res.message });
                      history.back()
                    } else {
                       this.$notify({ type: 'warning', message: res.message }); 
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