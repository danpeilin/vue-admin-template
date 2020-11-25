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
                <el-button @click="picedit(scope.row)" type="primary" size="small">编辑商品尺寸和颜色</el-button>
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
            size='50%'
            :visible.sync="drawer">
            <div class="demo-drawer__content">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="管理商品尺寸" name="first">
                        <el-transfer
                            v-model="sizeyesData"
                            :props="{key: 'sizeId',label: 'sizeName'}"
                            :titles="['所有尺寸', '已有尺寸']"
                            @change="handleChange"
                            :data="sizenoData"
                        ></el-transfer>
                    </el-tab-pane>
                    <el-tab-pane label="管理商品颜色" name="second">
                        <el-transfer
                            v-model="coloryesData"
                            :props="{key: 'colorId',label: 'colorName'}"
                            :titles="['所有颜色', '已有颜色']"
                            @change="handle"
                            :data="colornoData"
                        ></el-transfer>
                    </el-tab-pane>
                </el-tabs>
                <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                </div>
            </div>
        </el-drawer>




    </div>
</template>
<script>
import {getallgoods, getallcate} from '@/api/goods'
import {getallsize, getsizebyid, deletesize, addsize} from '@/api/size'
import {getallcolor, getcolorbyid, deletecolor, addcolor} from '@/api/color'
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
            dialogImageUrl: '',
            dialogVisible: false,
            activeName: 'first',
            sizenoData: [],
            sizeyesData: [],
            coloryesData:[],
            colornoData:[],
            currentPage: 0,
            pagesize: 10,
            totalpage: 0,
            sort: 'asc',
            goodsId: ''
        }
    
    },
    methods: {
        onSubmit() {
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
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.getall(this.currentPage, this.pagesize)
        },
        picedit(row) {
            this.goodsId = row.goodsId
            this.getallcolors()
            this.getllsizes()
            getsizebyid(row.goodsId).then((res)=>{
                if(res.code == 200) {
                    this.sizeyesData = res.data.list
                }
            })
            getcolorbyid(row.goodsId).then((res)=>{
                if(res.code == 200) {
                    this.coloryesData = res.data.list
                }
            })
            this.drawer = true
        },
        toedit() {

        },
        cancelForm() {
            this.drawer = false;
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
        getallcolors() {
            getallcolor().then((res)=>{
                this.colornoData = res.data.list
            })
        },
        getllsizes(){
            getallsize().then((res)=>{
                this.sizenoData = res.data.list
            })
        },
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
             //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
             if(direction === "right") {
                 let data = {
                     ids: movedKeys,
                     goodsId: this.goodsId 
                 }
                addsize(data).then((res)=>{})
             }
             if(direction === "left") {
                 let data = {
                     ids: movedKeys,
                     goodsId: this.goodsId 
                 }
                deletesize(data).then((res)=>{})
             }
                
        },
        handle(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
             //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
             if(direction === "right") {
                 let data = {
                     ids: movedKeys,
                     goodsId: this.goodsId 
                 }
                addcolor(data).then((res)=>{})
             }
             if(direction === "left") {
                 let data = {
                     ids: movedKeys,
                     goodsId: this.goodsId 
                 }
                deletecolor(data).then((res)=>{})
             }
                
        }

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