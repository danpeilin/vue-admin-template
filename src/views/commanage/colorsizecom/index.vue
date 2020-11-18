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



         <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
            label="#"
            width="50"
            prop="id">
            </el-table-column>
            <el-table-column
            prop="name"
            width="500"
            label="商品名称">
            </el-table-column>
            <el-table-column
            label="商品图片"
            width="200">
            <template slot-scope="scope">
                <div style="width: 50px">
                    <img class="img" :src="scope.row.goodsimg" />
                </div>
            </template>
            </el-table-column>
            <el-table-column
            prop="price"
            label="商品价格"
            width="200">
            </el-table-column>
            <el-table-column
            prop="countprice"
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

        <el-drawer
            title="管理商品展示图片"
            size='50%'
            :visible.sync="drawer">
            <div class="demo-drawer__content">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="管理商品尺寸" name="first">
                        <el-transfer
                            v-model="sizeyesData"
                            :props="{key: 'id',label: 'name'}"
                            :titles="['未关联', '已关联']"
                            @change="handleChange"
                            :data="sizenoData"
                        ></el-transfer>
                    </el-tab-pane>
                    <el-tab-pane label="管理商品颜色" name="second">
                        <el-transfer
                            v-model="coloryesData"
                            :props="{key: 'id',label: 'name'}"
                            :titles="['未关联', '已关联']"
                            @change="handleChange"
                            :data="colornoData"
                        ></el-transfer>
                    </el-tab-pane>
                </el-tabs>
                <div class="demo-drawer__footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="toedit" >确定</el-button>
                </div>
            </div>
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
            sizenoData: [{id:1,name:'测试1'},{id:2,name:'测试2'},{id:3,name:'测试3'}],
            sizeyesData: [1,3],
            coloryesData:[],
            colornoData:[]
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
        picedit(row) {
            console.log(row.id)
            this.drawer = true
        },
        toedit() {

        },
        cancelForm() {
            this.drawer = false;
        },
        handleChange(value, direction, movedKeys) {
            console.log(value, direction, movedKeys);
             //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
             if(direction === "right") {
                
             }
             if(direction === "left") {
                
             }
                
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
.demo-drawer__content {
    padding: 0 20px;
}
.demo-drawer__footer {
    margin-top: 20px;
}
</style>