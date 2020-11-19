<template>
  <div class="mybody">

    <div class="myheader">商品分类列表</div>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe:true style="width: 100%">
      <el-table-column prop="id" label="#"></el-table-column>
      <el-table-column prop="classify" label="商品分类名称"></el-table-column>
      <el-table-column label="商品分类图片">
        <div slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.classifyImage" fit="cover"></el-image>
        </div>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" type="text">修改</el-button>
          <el-button type="text" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span> 将删除此分类和此分类下所有商品，确定要删除这个分类吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removePush">确 定</el-button>
      </span>
    </el-dialog>

    <el-drawer title="修改商品分类" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
      <div class="drawerBody">
        <el-form ref="form" label-width="auto" label-position="top">
        <el-form-item label="商品分类名称" size="40px">
          <el-input v-model="modifyRow.classify"></el-input>
        </el-form-item>
        <el-form-item label="商品分类图片(点击图片更换)">
          <el-upload class="avatar-uploader" 
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifiPush">提交</el-button>
          <el-button @click="modifyRow = {}">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
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

.mybody {
  padding: 20px;
}
.myheader {
  align-self: start;
  font-size: 35px;
  margin: 20px 0px;
}
.drawerBody{
  padding: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      drawer: false,
      direction: 'rtl',
      removeRow: {},
      modifyRow: {},
      imageUrl: '',
      tableData: [
        {
          id: "1",
          classify: "男装",
          classifyImage: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          id: "2",
          classify: "女装",
          classifyImage: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          id: "3",
          classify: "休闲装",
          classifyImage: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
      ],
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？").then((_) => {
          done();
          }).catch((_) => {});
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = true;//file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },


    remove(data) {
        this.dialogVisible = true;
        this.removeRow = data;
    },
    removePush(){
        this.dialogVisible = false;
        this.tableData.splice(this.removeRow);
        //请求后端删除
    },
    modify(row){
        this.drawer = true;
        this.modifyRow = row;
    },
    modifiPush(){
      alert("修改"+this.modifyRow.id);
      this.drawer = false;
        //请求后端修改分类图片
    },

  }
};
</script>