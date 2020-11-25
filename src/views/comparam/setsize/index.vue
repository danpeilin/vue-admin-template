<template>
    <div class="mybody">
        <div class="myheader">添加商品分类</div>
        <el-divider></el-divider>
        <el-row>
            <el-button type="primary" @click="addgoodsdialogVisible = true">添加商品尺寸</el-button>
        </el-row>
        <el-dialog
            title="添加商品尺寸"
            :visible.sync="addgoodsdialogVisible"
            :before-close="goodsclose"
            width="30%">
            <div class="inpuheader">商品尺寸名称</div>
            <el-input v-model="goodsinput" placeholder="商品尺寸名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goodsinput = ''">重置</el-button>
                <el-button type="primary" @click="addgoodssize">确 定</el-button>
            </span>
        </el-dialog>


        <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px;">
            <el-table-column
            fixed
            prop="sizeId"
            label="#">
            </el-table-column>
            <el-table-column
            prop="sizeName"
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
            title="修改商品尺寸"
            :visible.sync="editgoodsdialogVisible"
            :before-close="editclose"
            width="30%">
            <div class="inpuheader">商品尺寸名称</div>
            <el-input v-model="editinput" placeholder="商品尺寸名称"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editinput = ''">重置</el-button>
                <el-button type="primary" @click="editsize">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>
<script>
import {allsize, addsizes, deletesizes, updatesizes} from '@/api/size'
export default {
    data() {
      return {
        tableData: [],
        addgoodsdialogVisible: false,
        editgoodsdialogVisible: false,
        goodsinput:'',
        editinput: '',
        currentPage: 0,
        pageSize: 10,
        totalpage: 0,
        sizeId: 0,
      };
    },
    methods: {
      addgoodssize(){
          //添加请求
          addsizes(this.goodsinput).then((res)=>{
            if(res.code == 200) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
              this.getall(this.currentPage, this.pageSize)
            }
          })
          this.goodsinput = ''
          this.addgoodsdialogVisible = false
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getall(this.currentPage, this.pageSize)
      },
      goodsclose(done) {
        this.goodsinput = ''
        done()
      },
      editclose(done) {
        this.editinput = ''
        done()
      },
      formedit(row) {
        this.editgoodsdialogVisible = true
        this.editinput = row.sizeName
        this.sizeId = row.sizeId
      },
      editsize(){
        //编辑接口
        updatesizes(this.sizeId, this.editinput).then((res)=>{
          if(res.code == 200) {
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
          deletesizes(row.sizeId).then((res)=>{
            if(res.code == 200) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
            }
            this.getall(this.currentPage, this.pageSize)
          })
      },
      getall(currentPage, pageSize){
        allsize(currentPage, pageSize).then((res)=>{
          if(res.code == 200) {
            this.tableData = res.data.list
            this.totalpage = res.data.total
          }
        })
      }
    },
    created() {
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