<template>
  <div class="mybody">
    <div class="myheader">商品分类列表</div>
    <el-table :data="tableData" stripe:true style="width: 100%">
      <el-table-column prop="id" label="#"></el-table-column>
      <el-table-column prop="classify" label="商品分类名称"></el-table-column>
      <el-table-column
        prop="classifyImage"
        label="商品分类图片"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" @click="modify(scope.row)" size="small"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [
        {
          id: "3",
          classify: "女装",
          classifyImage: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: "4",
          classify: "女装",
          classifyImage: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: "5",
          classify: "女装",
          classifyImage: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    handleClick(data) {
      alert("查看" + data.classify);
    },
    modify(data) {
      this.$router.push({
        name: "Modify",
        params: {
          data: data
        },
      });
    },
  },
};
</script>