<template>
  <div class="mybody" v-loading="loading">

    <div class="myheader">商品分类列表</div>
    <el-divider></el-divider>
    <el-table :data="tableData" stripe:true style="width: 100%">
      <el-table-column prop="cateId" label="#"></el-table-column>
      <el-table-column prop="cateName" label="商品分类名称"></el-table-column>
      <el-table-column label="商品分类图片">
        <div slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.catePic" fit="cover"></el-image>
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

    <el-drawer title="修改商品分类" :visible.sync="drawer" :before-close="handleClose">
      <div class="drawerBody">
        <el-form ref="form" label-width="auto" label-position="top">
        <el-form-item label="商品分类名称" size="40px">
          <el-input v-model="modifyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类图片(点击图片更换)">
          <el-upload class="avatar-uploader" 
          action="http://localhost:8002/fileoss"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="modifyForm.imageUrl" :src="modifyForm.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifiPush">提交</el-button>
          <el-button @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-drawer>
    <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
  </div>
</template>

<script>
import { uploading,list,deleteRow,updateRow } from '@/api/commodity'
export default {
  data() {
    return {
      //弹出框开关
      dialogVisible: false,
      //侧边栏开关
      drawer: false,
      //删除行数据
      removeRow: '',
      //修改行数据
      modifyRow: {},
      //修改的表单数据
      modifyForm: {
        name: "",
        imageUrl: ''
      },
      //加载开关
      loading: false,
      //列表数据
      tableData: [],
      currentPage:0,
      pageSize:10,
      total: 0
    };
  },
  methods: {
    //关闭侧边栏
    handleClose(done) {
      this.$confirm("确认关闭？").then((_) => {
        this.loading = false;
          done();
          }).catch((_) => {});
    },
    //图片上传之后回调
    handleAvatarSuccess(res) {
        this.modifyForm.imageUrl = res.data.url;
        this.loading = false;
    },
    //在图片上传之前回调
    beforeAvatarUpload(file) {
        const isImage = (file.type === 'image/jpeg') || (file.type === 'png') || (file.type === 'gif');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isImage) {
          this.$message.error('上传图片格式有误!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        this.loading = true;
        return isImage && isLt2M;
    },
    //获取要删除的行
    remove(row) {
        this.dialogVisible = true;
        this.removeRow = row.cateId;
    },
    //提交删除
    removePush(){
        console.log(this.removeRow)
        this.dialogVisible = false;
        this.deleteData(this.removeRow);
        this.removeRow = '';
    },
    //获取要修改的行数据
    modify(row){
        this.drawer = true;
        this.modifyRow = row;
        this.modifyForm.name = row.cateName;
        this.modifyForm.imageUrl = row.catePic;
    },
    //分页切换
    handleCurrentChange(val){
      this.currentPage = val;
      this.getList(this.currentPage,this.pageSize)

    },
    //请求提交修改
    modifiPush(){
      if(this.modifyForm.name != null && this.modifyForm.name.length > 0){
          if(this.modifyForm.imageUrl != null && this.modifyForm.imageUrl.length > 0){
            this.modifyData(this.modifyRow.cateId);
          }else this.$message.error('表单信息不完整，无法修改！');
      }else this.$message.error('表单信息不完整，无法修改！');
    },
    //重置表单数据
    reset(){
        this.modifyForm.name = this.modifyRow.cateName;
        this.modifyForm.imageUrl = this.modifyRow.catePic;
    },
    //上传图片
    upload(data){
      uploading(data).then((res) => {
        if(res.code == 200){
          this.$message.success('上传成功');
        }
      })
    },
    //获取列表
    getList(curr,page){
      list(curr,page).then((res) =>{
        if(res.code == 200){
          this.tableData = res.data.tableData;
          this.total = res.data.total;
        }
      })
    },
    //删除一列
    deleteData(row){
      deleteRow(row).then((res) =>{
        if(res.code == 200){
          this.$message.success("删除成功");
          this.getList(this.currentPage,this.pageSize);
        }else{
          this.$message.error("删除失败");
        }
      })
    },
    //修改一列
    modifyData(row_id){
      var data = {
        cateId: row_id,
        cateName: this.modifyForm.name,
        catePic: this.modifyForm.imageUrl,
      };
      updateRow(data).then((res) => {
        if(res.code == 200){
          this.drawer = false;
          this.$message.success("修改成功");
          this.getList(this.currentPage,this.pageSize);
        }else{
          this.$$message.error("修改失败");
        }
      })
    }
  },
  created(){
    this.getList(this.currentPage,this.pageSize);
  }
};
</script>

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
.block{
  margin-top: 20px;
  text-align: center;
}
</style>