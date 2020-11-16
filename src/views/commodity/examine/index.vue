<template>
  <div class="mybody">

    <div class="myheader">商品分类列表</div>

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
          <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
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

  </div>
</template>

<style lang="scss" scoped>
.mybody {
  padding: 20px;
}
.myheader {
  align-self: start;
  font-size: 24px;
  margin: 20px 0px;
}
</style>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      scopeRow: {},
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
    modify(data) {
      this.$router.push({
        name: "Modify",
        params: {
          data: data,
        }
      });
    },
    remove(data) {
        this.dialogVisible = true;
        this.scopeRow = data;
    },
    removePush(){
        this.dialogVisible = false;
        this.tableData.splice(this.scopeRow);
        //请求后端删除
    },
    handleClose(done) {
      this.$confirm("确认关闭？").then((_) => {
          done();
          }).catch((_) => {});
    },
  },
};
</script>