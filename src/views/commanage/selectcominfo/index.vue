<template>
    <div class="mybody">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="商品类别">
                <el-select v-model="formInline.selectvalue" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
            prop="id">
            </el-table-column>
            <el-table-column
            prop="name"
            width="300"
            label="商品名称">
            </el-table-column>
            <el-table-column
            label="商品图片"
            width="100">
            <template slot-scope="scope">
                <div style="width: 50px">
                    <img class="img" :src="scope.row.goodsimg" />
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="price"
            label="商品价格">
            </el-table-column>
            <el-table-column
            prop="countprice"
            label="商品折后价格">
            </el-table-column>
            <el-table-column
            prop="goodscount"
            label="商品库存">
            </el-table-column>
            <el-table-column
            prop="goodsmade"
            label="商品材质"
            width="300">
            </el-table-column>
            <el-table-column
            prop="goodsyunfei"
            label="商品运费">
            </el-table-column>
            <el-table-column
            prop="goodssale"
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


        <el-drawer
          title="修改商品信息"
          :visible.sync="editdrawer"
          :before-close="editClose">
          <el-form ref="form" label-width="80px">
            <el-form-item label="所属类别">
                <el-select v-model="form.class" placeholder="请选择">
                  <el-option
                    v-for="item in editoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
               <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="form.descripe"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="折后价格">
                <el-input v-model="form.countprice"></el-input>
            </el-form-item>
            <el-form-item label="商品库存">
                <el-input v-model="form.goodscount"></el-input>
            </el-form-item>
            <el-form-item label="商品材质">
                <el-input v-model="form.goodsmade"></el-input>
            </el-form-item>
            <el-form-item label="商品运费">
                <el-input v-model="form.goodsyunfei"></el-input>
            </el-form-item>
            <el-form-item label="商品销量">
                <el-input v-model="form.goodssale"></el-input>
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
export default {
    data() {
      return {
        formInline: {
          selectvalue: '',
          goodsname: '',
          startprice: '',
          endprice: ''
        },
        editoptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        sorticon: 'el-icon-caret-bottom',
        tableData: [{
            id: '1',
            name: '测试',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '2',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 140,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '3',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '4',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '5',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '6',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }, {
            id: '7',
            name: '女士内衣 新型收拢运动内衣',
            goodsimg: require('../../../assets/fenlei1.png'),
            price: 240,
            countprice: 120,
            goodscount: 20,
            goodsmade: '棉56% 聚酯纤维30%',
            goodsyunfei: 12,
            goodssale: 40,
        }],
        form: {
            class: '',
            name: '',
            imageUrl: '',
            price: '',
            countprice: '',
            goodscount: '',
            goodsmade: '',
            goodsyunfei: '',
            goodssale: '',
        },
        tablechecked:[],
        checked:[],
        deleteallbtn: true,
        editdrawer: false
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onsort() {
        if (this.sorticon == 'el-icon-caret-bottom') {
          this.sorticon = 'el-icon-caret-top'
        } else {
          this.sorticon = 'el-icon-caret-bottom'
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
           this.checked.push(parseInt(item.id))
       })
       
        console.log(this.checked)
        this.tablechecked = []
        this.checked = []
      },
      formdelete(row){
          console.log(row.id)
      },
      editClose(done) {
          this.form = []
          done()
      },
      formedit(row){
          this.editdrawer = true
          console.log(row.id)
      },
      toeidt() {
          //请求编辑
          this.editdrawer = false
      },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
</style>