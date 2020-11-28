<template>
  <div class="mybody" v-loading="loading">
    <div class="myheader">添加商品分类</div>
    <el-divider></el-divider>
    <el-form ref="form" label-width="230px">
      <el-form-item label="商品分类名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品分类图片(图片规格：171*180)">
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8002/fileoss"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.mybody {
  padding: 20px;
}
.myheader {
  font-size: 35px;
  margin: 20px 0px;
}
.avatar-uploader .el-icon-plus {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-icon-plus:hover {
  border-color: #409EFF !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>


<script>
import { uploading } from '@/api/commodity'

export default {
  data() {
    return {
      form: {
        name: "",
        imageUrl: ''
      },
      loading: false,
    }
  },
  methods: {
    onSubmit() {
      if(this.checkForm()){
        var data = {
          cateName: this.form.name,
          catePic: this.form.imageUrl
        }
        this.upload(data);
        this.onReset();
      }else{
        this.$message.error('表单信息不完整，无法添加!');
      }
    },
    onReset(){
      this.form = [];
    },
    handleAvatarSuccess(res) {
        this.loading = false;
        this.form.imageUrl = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isImage = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif');
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImage) {
        this.$message.error('上传图片格式有误!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      if(isImage && isLt2M){
        this.loading = true;
      }
      
      return isImage && isLt2M;
    },
    checkForm(){
      var name = false;
      var imageUrl = false;
      if(this.form.name != null && this.form.name.length > 0){
          name = true;
      }
      if(this.form.imageUrl != null && this.form.imageUrl.length > 0){
          imageUrl = true;
      }

      return name && imageUrl;
    },
    //上传到数据库方法
    upload(data){
      uploading(data).then((res) => {
        if(res.code == 200){
          this.$message.success('上传成功');
        }
      })
    }
  }
};
</script>