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
            prop="colorId"
            label="#">
            </el-table-column>
            <el-table-column
            prop="colorName"
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

        <div class="painblock">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="totalpage">
          </el-pagination>
        </div>


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
import {allcolors, addcolors, deletecolors, updatecolors} from '@/api/color'
export default {
    data() {
      return {
        tableData: [],
        addcolordialogVisible: false,
        editgoodsdialogVisible: false,
        colorinput:'',
        editinput: '',
        currentPage: 0,
        pageSize: 10,
        totalpage: 0,
        colorId: 0
      };
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getall(this.currentPage, this.pageSize)
      },
      addgoodssize(){
          addcolors(this.colorinput).then((res)=>{
            if(res.code == 200) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
              this.getall(this.currentPage, this.pageSize)
            }
          })
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
        this.editinput = row.colorName
        this.colorId = row.colorId
      },
      editsize(){
        updatecolors(this.colorId, this.editinput).then((res)=>{
          if(res.code == 200){
            this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
            this.getall(this.currentPage, this.pageSize)
          }
        })
        this.editinput = ''
        this.editgoodsdialogVisible = false
      },
      formdelete(row) {
          //删除接口
          deletecolors(row.colorId).then((res)=>{
            if(res.code == 200){
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
              this.getall(this.currentPage, this.pageSize)
            }
          })
      },
      getall(currentPage, pageSize){
        allcolors(currentPage, pageSize).then((res)=>{
          if(res.code == 200){
            this.totalpage = res.data.total
            this.tableData = res.data.list
          }
        })
      }
    },
    created(){
      this.getall(this.currentPage, this.pageSize)
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
.painblock {
    text-align: center;
    margin-top: 20px;
}
</style>