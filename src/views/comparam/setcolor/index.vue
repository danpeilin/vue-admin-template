<template>
    <div class="mybody">
        <div class="myheader">商品颜色列表</div>
        <el-divider></el-divider>
        <el-row>
            <el-button type="primary" @click="addcolordialogVisible = true">添加商品颜色</el-button>
        </el-row>
        <el-dialog
            title="添加商品颜色"
            :visible.sync="addcolordialogVisible"
            :before-close="addcolorclose"
            width="30%">
            <div class="inpuheader">商品颜色名称</div>
            <el-input v-model="colorinput" placeholder="商品颜色名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="colorinput = ''">重置</el-button>
                <el-button type="primary" @click="addgoodssize">确 定</el-button>
            </span>
        </el-dialog>


        <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px;">
            <el-table-column
            fixed
            prop="id"
            label="#">
            </el-table-column>
            <el-table-column
            prop="name"
            label="商品尺寸名称">
            </el-table-column>
            <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button @click="formedit(scope.row)" type="text" style="margin-right: 8px" size="small">修改</el-button>
                <el-popconfirm
                    title="您确定要删除吗？"
                    @onConfirm="formdelete(scope.row)"
                >
                <el-button slot="reference" type="text" size="small">删除</el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="修改商品颜色"
            :visible.sync="editgoodsdialogVisible"
            :before-close="editclose"
            width="30%">
            <div class="inpuheader">商品颜色名称</div>
            <el-input v-model="editinput" placeholder="商品颜色名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editinput = ''">重置</el-button>
                <el-button type="primary" @click="editsize">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
export default {
    data() {
      return {
        tableData: [{
          id: '1',
          name: '卡其色',
        }, {
          id: '2',
          name: '土黄色',
        }, {
          id: '3',
          name: '天蓝色',
        }, {
          id: '4',
          name: '浅绿色',
        }],
        addcolordialogVisible: false,
        editgoodsdialogVisible: false,
        colorinput:'',
        editinput: ''
      };
    },
    methods: {
      addgoodssize(){
          //添加请求
          this.colorinput = ''
          this.addcolordialogVisible = false
      },
      addcolorclose(done) {
        this.colorinput = ''
        done()
      },
      editclose(done) {
        this.editinput = ''
        done()
      },
      formedit(row) {
        this.editgoodsdialogVisible = true
        this.editinput = row.name
      },
      editsize(){
        //编辑接口
        this.editinput = ''
        this.editgoodsdialogVisible = false
      },
      formdelete(row) {
          //删除接口
          console.log(row.id);
      },
    }
}
</script>
<style scoped>
.mybody {
  padding: 20px;
}
.myheader {
  font-size: 35px;
  margin: 20px 0px;
}
.inpuheader {
    margin-bottom: 5px;
    font-weight: 700;
    font-size: 15px;
}
</style>