<template>
  <div class="mybody">
    <div class="myheader">添加商品</div>
    <el-divider></el-divider>
    <el-card class="container">

   
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="所属商品类别">
          <el-select v-model="form.cateId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.cateId"
            :label="item.cateName"
            :value="item.cateId">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
            <el-input v-model="form.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">
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
        <el-form-item label="商品描述">
            <el-input autosize type="textarea" v-model="form.descripe" placeholder="商品描述"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.price" size="mini" :min="0" :max="999" label="商品价格"></el-input-number>
        </el-form-item>
        <el-form-item label="折后价格">
          <el-input-number v-model="form.countprice" size="mini" :min="0" :max="999" label="折后价格"></el-input-number>
        </el-form-item>
        <el-form-item label="商品库存">
          <el-input-number v-model="form.goodscount" size="mini" :min="0" :max="999" label="商品库存"></el-input-number>
        </el-form-item>
        <el-form-item label="商品材质">
            <el-input v-model="form.goodsmade" placeholder="商品材质"></el-input>
        </el-form-item>
        <el-form-item label="商品产地">
            <el-input v-model="form.goodsorigin" placeholder="商品产地"></el-input>
        </el-form-item>
        <el-form-item label="商品运费">
          <el-input-number v-model="form.goodsyunfei" size="mini" :min="0" :max="999" label="商品运费"></el-input-number>
        </el-form-item>
        <el-form-item label="商品销量">
          <el-input-number v-model="form.goodssale" size="mini" :min="0" :max="999" label="商品销量"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="toadd">立即添加</el-button>
        </el-form-item>
      </el-form>
     </el-card>
  </div>
</template>

<script>
import {getallcate, addgoods} from '@/api/goods'
export default {
  data(){
    return {
      options: [],
      form: {
        cateId:'',
        name: '',
        imageUrl: '',
        descripe: '',
        price: '',
        countprice: '',
        goodscount: '',
        goodsmade: '',
        goodsorigin: '',
        goodsyunfei: '',
        goodssale: '',
      },
    }
  },
  methods: {
    toadd(){
      addgoods(this.form).then((res) => {
        if(res.code = 200) {
          this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
          });
          
          this.form.cateId = ''
          this.form.name = ''
          this.form.imageUrl = ''
          this.form.descripe = ''
          this.form.price = 0
          this.form.countprice = 0
          this.form.goodscount = 0
          this.form.goodsmade = ''
          this.form.goodsorigin = ''
          this.form.goodsyunfei = 0
          this.form.goodssale = 0
        } else {
          this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'error'
          });
        }
      })
    },
    getallcates() {
      getallcate().then((res) => {
        if(res.code == 200) {
          this.options = res.data.cates
        }
      })
    },
    handleAvatarSuccess(res, file) {
        this.form.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        //const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

        // if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
        }
        //return isJPG && isLt2M;
        return isLt2M;
    }
  },
  created(){
    this.getallcates()
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