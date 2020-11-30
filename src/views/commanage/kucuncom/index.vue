<template>
    <div class="mybody">
        <div class="myheader">管理商品库存</div>
        <el-divider></el-divider>
        <el-card class="box-card">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="stockId"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="sizeName"
                    label="商品尺寸">
                </el-table-column>
                <el-table-column
                    prop="colorName"
                    label="商品颜色">
                </el-table-column>
                <el-table-column
                    prop="stockNum"
                    label="商品库存">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)" type="text" size="small">修改库存</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog
                title="修改库存"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <span>库存</span>
                <el-input-number v-model="changekucun" size="mini" :min="1" :max="99" label="描述文字"></el-input-number>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toedit">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>

        <div class="painblock">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="totalpage">
            </el-pagination>
        </div>



    </div>
</template>

<script>
import {getallstock, updatekucun} from '@/api/stock'
export default {
    data() {
        return {
        formInline: {
          cateId: '',
          goodsName: '',
          startprice: '',
          endprice: ''
        },
          tableData: [],
            dialogVisible: false,
            changekucun: '',
            currentPage: 0,
            pagesize: 10,
            totalpage: 0,
            sort: 'asc',
            stockId: ''
        }
    },
    methods: {
        edit(row) {
            this.changekucun = row.stockNum
            this.stockId = row.stockId
            this.dialogVisible = true
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getall(this.currentPage, this.pagesize)
        },
        toedit() {
            updatekucun(this.stockId, this.changekucun).then((res) => {
                this.$notify({
                    title: '成功',
                    message: res.data.msg,
                    type: 'success'
                });
                this.getall(this.currentPage, this.pagesize)
                this.dialogVisible = false
            })
        },
        getall(currentPage, pageSize) {
            getallstock(currentPage, pageSize).then((res) => {
            if(res.code == 200) {
                this.tableData = res.data.list
                this.totalpage = res.data.totalpage
            }
            })
        },
        handleClose(done) {
            done()
        }
    },
    created(){
        this.getall(this.currentPage, this.pagesize)
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
.box-card {
    width: 60%;
    margin: 0 auto;
}
.painblock {
    text-align: center;
    margin-top: 20px;
}
</style>