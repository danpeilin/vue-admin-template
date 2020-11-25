<template>
    <div class="mybody">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品类别">
                <el-select v-model="formInline.cateId" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.cateId"
                    :label="item.cateName"
                    :value="item.cateId">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input v-model="formInline.goodsName" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-col :span="11">
                <el-input v-model="formInline.startprice" placeholder="起始价格"></el-input>
              </el-col>
              <el-col class="line" style="margin-left:10px" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.endprice" placeholder="终止价格"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

            <el-form-item style="margin-left:250px">
                <el-button @click="onsort" :icon="sorticon">排序</el-button>
            </el-form-item>
        </el-form>
        <div class="myheader">商品信息列表</div>
        <el-divider></el-divider>



         <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            label="#"
            width="50"
            prop="goodsId">
            </el-table-column>
            <el-table-column
            prop="goodsName"
            width="500"
            label="商品名称">
            </el-table-column>
            <el-table-column
            label="商品图片"
            width="200">
            <template slot-scope="scope">
                <div style="width: 50px">
                    <img class="img" :src="scope.row.goodsPic" />
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="goodsPrice"
            label="商品价格"
            width="200">
            </el-table-column>
            <el-table-column
            prop="goodsDiscount"
            label="商品折后价格"
            width="200">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="picedit(scope.row)" type="primary" size="small">管理商品展示图片</el-button>
            </template>
            </el-table-column>
        </el-table>

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

        <el-drawer
            title="管理商品展示图片"
            :visible.sync="drawer"
            :before-close="beforeclose">
            <div class="demo-drawer__content">
                    <el-upload
                        class="upload-demo"
                        action="http://localhost:8002/fileoss"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                </div>
            </div>
        </el-drawer>




    </div>
</template>
<script>
import {getallgoods, getallcate} from '@/api/goods'
import {getallpicbyid, deletepic, savepic} from '@/api/pic'
export default {
    data() {
        return {
            formInline: {
                cateId: '',
                goodsName: '',
                startprice: '',
                endprice: ''
            },
            options: [],
            sorticon: 'el-icon-caret-bottom',
            tableData: [],
        drawer: false,
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        currentPage: 0,
        pagesize: 10,
        totalpage: 0,
        sort: 'asc',
        goodsId: '',
        }
    },
    methods: {
        onSubmit() {
            this.getall(this.currentPage, this.pagesize)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getall(this.currentPage, this.pagesize)
        },
        onsort() {
            if (this.sorticon == 'el-icon-caret-bottom') {
                this.sorticon = 'el-icon-caret-top'
                this.sort = 'desc'
                this.getall(this.currentPage, this.pagesize)
            } else {
                this.sorticon = 'el-icon-caret-bottom'
                this.sort = 'asc'
                this.getall(this.currentPage, this.pagesize)
        }
      },
        picedit(row) {
            getallpicbyid(row.goodsId).then((res)=>{
                res.data.pics.forEach((item,index)=>{
                    this.goodsId = item.goodsId
                    index = {
                        name: item.picName,
                        url: item.picUrl,
                        picId: item.picId,
                        goodsId: item.goodsId
                    }
                    this.fileList.push(index)
                });
            })
            this.drawer = true
        },
        beforeclose(done){
            this.fileList=[]
            done()
        },
        cancelForm() {
            this.fileList=[]
            this.drawer = false;
        },
        handleRemove(file, fileList) {
            deletepic(file.picId).then((res)=>{
                
            })
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
            savepic(res.data.url, file.name, this.goodsId).then((res)=>{
                if(res.code == 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                }
            })
        },
        getall(currentPage, pageSize) {
            let data = {
            currentPage: currentPage,
            pageSize: pageSize,
            cateId: this.formInline.cateId,
            goodsName: this.formInline.goodsName,
            startprice: this.formInline.startprice,
            endprice: this.formInline.endprice,
            sort: this.sort
            }
            getallgoods(data).then((res) => {
            if(res.code == 200) {
                this.tableData = res.data.list
                this.totalpage = res.data.total
            }
            })
        },
        getallcates() {
            getallcate().then((res) => {
                if(res.code == 200) {
                this.options = res.data.cates
                }
            })
        },
    },
    created() {
        this.getallcates()
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
.demo-drawer__content {
    padding: 0 20px;
}
.demo-drawer__footer {
    margin-top: 20px;
}
.painblock {
    text-align: center;
    margin-top: 20px;
}
</style>