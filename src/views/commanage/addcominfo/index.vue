<template>
  <div class="mybody">
    <div class="myheader">添加商品</div>
    <el-divider></el-divider>
    <el-card class="container">

   
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="所属商品类别">
          <el-select v-model="form.class" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
            <el-input v-model="form.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
            <el-input autosize type="textarea" v-model="form.descripe" placeholder="商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
            <el-input v-model="form.price" placeholder="商品价格"></el-input>
        </el-form-item>
        <el-form-item label="折后价格">
            <el-input v-model="form.countprice" placeholder="折后价格"></el-input>
        </el-form-item>
        <el-form-item label="商品库存">
            <el-input v-model="form.goodscount" :disabled="true" placeholder="商品库存"></el-input>
        </el-form-item>
        <el-form-item label="商品材质">
            <el-input v-model="form.goodsmade" placeholder="商品材质"></el-input>
        </el-form-item>
        <el-form-item label="商品运费">
            <el-input v-model="form.goodsyunfei" placeholder="商品运费"></el-input>
        </el-form-item>
        <el-form-item label="商品销量">
            <el-input v-model="form.goodssale" placeholder="商品销量"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="toadd">立即添加</el-button>
        </el-form-item>
      </el-form>
     </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      form: {
        class:'',
        name: '',
        imageUrl: '',
        descripe: '',
        price: '',
        countprice: '',
        goodscount: 0,
        goodsmade: '',
        goodsyunfei: '',
        goodssale: '',
      },
    }
  },
  methods: {
    toadd(){

    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
  }
}
</script>
<style scoped>
.mybody {
  padding: 20px;
}
.myheader {
  font-size: 35px;
  margin:0 0 20px 0px;
}
.avatar-uploader .el-icon-plus {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-icon-plus:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.container {
  width: 50%;
  margin: 0 auto;
}
</style>