<template>
    <div class="mybody">
        <div class="myheader">管理商品库存</div>
        <el-divider></el-divider>
        <el-card class="box-card">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="#"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goodssize"
                    label="商品尺寸">
                </el-table-column>
                <el-table-column
                    prop="goodscolor"
                    label="商品颜色">
                </el-table-column>
                <el-table-column
                    prop="goodskucun"
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
                <el-input v-model="changekucun" placeholder="请输入内容"></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="toedit">确 定</el-button>
                </span>
            </el-dialog>

        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
          tableData: [{
            id: '1',
            name: '测试',
            goodssize: '女式 xl',
            goodscolor: '红色',
            goodskucun:23,
          }, {
            id: '2',
            name: '王小虎',
            goodssize: '女式 xxxxxxl',
            goodscolor: '蓝色',
            goodskucun:23,
          }, {
            id: '3',
            name: '测试',
            goodssize: '女式 xxxxxxl',
            goodscolor: '紫色',
            goodskucun:23,
          }, {
            id: '4',
            name: '王小虎',
            goodssize: '女式 xxxxxxl',
            goodscolor: '红色',
            goodskucun:23,
          }],
            dialogVisible: false,
            changekucun: '',
        }
    },
    methods: {
        edit(row) {
            console.log(row.id)
            this.changekucun = row.goodskucun
            this.dialogVisible = true
        },
        toedit() {

        },
        handleClose(done) {
            done()
        }
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
</style>