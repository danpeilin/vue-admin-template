<template>
  <div class="mybody">
    <div class="myheader">修改商品分类</div>
    <div class="classifyImage">
      <el-image class="img" :src="tableData.classifyImage" fit="cover"></el-image>
    </div>
    <el-form ref="form" :model="form" label-width="230px">
      <el-form-item label="商品分类名称">
        <el-input v-model="tableData.classify"> </el-input>
      </el-form-item>
      <el-form-item label="商品分类图片(图片规格：171*180)">
        <el-upload class="upload-demo"
          action="#" :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove"
          multiple :limit="3" :on-exceed="handleExceed">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onReset(form)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.mybody {
  padding: 20px;
}
.myheader {
  font-size: 24px;
  margin: 20px 0px;
}
.classifyImage{
  height: 300px;
  width: 200px;
  margin-left: 230px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>


<script>
import { resetRouter } from '@/router';
export default {
  data() {
    return {
      tableData: this.$route.params.data,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      }
    };
  },
  methods: {
    onSubmit() {
      alert("·修改商品分类成功")
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onReset(dom){
      
    }
  },
};
</script>