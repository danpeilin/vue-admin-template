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
              <el-input v-model="formInline.goodsname" placeholder="商品名称"></el-input>
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
        <el-popconfirm
            title="这是一段内容确定删除吗？"
            @onConfirm="alldelete"
        >
        <el-button type="primary" slot="reference" :disabled="deleteallbtn">批量删除</el-button>
        </el-popconfirm>


        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="selectchange">
            <el-table-column
            type="selection">
            </el-table-column>
            <el-table-column
            label="#"
            width="50"
            prop="goodsId">
            </el-table-column>
            <el-table-column
            prop="goodsName"
            width="300"
            label="商品名称">
            </el-table-column>
            <el-table-column
            label="商品图片"
            width="100">
            <template slot-scope="scope">
                <div style="width: 50px">
                    <img class="img" :src="scope.row.goodsPic" />
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="goodsPrice"
            label="商品价格">
            </el-table-column>
            <el-table-column
            prop="goodsDiscount"
            label="商品折后价格">
            </el-table-column>
            <el-table-column
            prop="goodsStock"
            label="商品库存">
            </el-table-column>
            <el-table-column
            prop="goodsMaterial"
            label="商品材质"
            width="300">
            </el-table-column>
            <el-table-column
            prop="goodsPostalfee"
            label="商品运费">
            </el-table-column>
            <el-table-column
            prop="goodsSales"
            label="商品销量">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
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
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="totalpage">
          </el-pagination>
        </div>


        <el-drawer
          title="修改商品信息"
          :visible.sync="editdrawer"
          :before-close="editClose">
          <el-form 
          v-loading="loading" ref="form" label-width="80px">
            <el-form-item label="所属类别">
                <el-select v-model="form.cateId" placeholder="请选择">
                  <el-option
                    v-for="item in editoptions"
                    :key="item.cateId"
                    :label="item.cateName"
                    :value="item.cateId">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
               <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8002/fileoss"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.goodsPic" :src="form.goodsPic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.goodsDisc"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input-number v-model="form.goodsPrice" size="mini" :min="0" :max="999" label="商品价格"></el-input-number>
            </el-form-item>
            <el-form-item label="折后价格">
              <el-input-number v-model="form.goodsDiscount" size="mini" :min="0" :max="999" label="折后价格"></el-input-number>
            </el-form-item>
            <el-form-item label="商品库存">
              <el-input-number v-model="form.goodsStock" size="mini" :min="0" :max="999" label="商品库存"></el-input-number>
            </el-form-item>
            <el-form-item label="商品材质">
                <el-input v-model="form.goodsMaterial"></el-input>
            </el-form-item>
            <el-form-item label="商品运费">
              <el-input-number v-model="form.goodsPostalfee" size="mini" :min="0" :max="999" label="商品运费"></el-input-number>
            </el-form-item>
            <el-form-item label="商品销量">
              <el-input-number v-model="form.goodsSales" size="mini" :min="0" :max="999" label="商品销量"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="toeidt">立即修改</el-button>
                <el-button @click="editdrawer = false">取消</el-button>
            </el-form-item>
            </el-form>
        </el-drawer>
    </div>
</template>

<script>
import {getallgoods, getallcate, getgoodsbyid, updateGoods, deletegoods, deleteallgoods} from '@/api/goods'
export default {
    data() {
      return {
        formInline: {
          cateId: '',
          goodsName: '',
          startprice: '',
          endprice: ''
        },
        editoptions: [],
        options: [],
        sorticon: 'el-icon-caret-bottom',
        tableData: [],
        form: {
            cateId: '',
            goodsName: '',
            goodsPic: '',
            goodsDisc:'',
            goodsPrice: '',
            goodsDiscount: '',
            goodsStock: '',
            goodsMaterial: '',
            goodsPostalfee: '',
            goodsSales: '',
        },
        tablechecked:[],
        checked:[],
        deleteallbtn: true,
        editdrawer: false,
        currentPage: 0,
        pagesize: 10,
        totalpage: 0,
        sort: 'asc',
        loading: false
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
      selectchange(val) { 
        this.tablechecked = val
        if (this.tablechecked.length != 0) {
            this.deleteallbtn = false
        } else {
            this.deleteallbtn = true

        }
      },
      alldelete() {
       this.tablechecked.forEach((item) => {
           this.checked.push(parseInt(item.goodsId))
       })
       deleteallgoods(this.checked).then((res)=>{
          if(res.code == 200) {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
            this.getall(this.currentPage, this.pagesize)
          }
       })
        this.tablechecked = []
        this.checked = []
      },
      formdelete(row){
        deletegoods(row.goodsId).then((res)=>{
          if(res.code == 200) {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
            this.getall(this.currentPage, this.pagesize)
          }
        })
      },
      editClose(done) {
          this.form = {}
          done()
      },
      formedit(row){
        getallcate().then((res) => {
          if(res.code == 200) {
            this.editoptions = res.data.cates
          }
        })
        getgoodsbyid(row.goodsId).then((res) => {
          if(res.code == 200) {
            this.form = res.data.goods
          }
        })
        this.editdrawer = true
      },
      toeidt() {
          //请求编辑
          updateGoods(this.form).then((res)=>{
            if(res.code == 200) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
              this.getall(this.currentPage, this.pagesize)
            }
          })
          this.editdrawer = false
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
    handleAvatarSuccess(res, file) {
        this.form.goodsPic = res.data.url;
        this.loading = false
    },
    beforeAvatarUpload(file) {
        //const isJPG = file.type === 'image/jpeg';
        this.loading = true
        const isLt2M = file.size / 1024 / 1024 < 10;

        // if (!isJPG) {
        // this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        //return isJPG && isLt2M;
        return isLt2M;
    },
    getallcates() {
      getallcate().then((res) => {
        if(res.code == 200) {
          this.options = res.data.cates
        }
      })
    },
  },
  created(){
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
.avatar-uploader .el-icon-plus {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-icon-plus:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .painblock {
    text-align: center;
    margin-top: 20px;
  }
</style>