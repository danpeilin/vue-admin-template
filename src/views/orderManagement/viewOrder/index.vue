<template>
    <div class="mybody">
        <el-form :inline="true" :model="formInline" show-overflow-tooltip class="demo-form-inline">
            <el-form-item>
                <el-select v-model="formInline.status" placeholder="--所有状态--">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input v-model="formInline.orderID" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formInline.userName" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="下单日期">
              <el-col :span="11">
                <el-input v-model="formInline.startDate" placeholder="起始日期"></el-input>
              </el-col>
              <el-col class="line" style="margin-left:10px" :span="1">-</el-col>
              <el-col :span="11">
                <el-input v-model="formInline.endDate" placeholder="终止日期"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>

        <div class="myheader">商品信息列表</div>
        <el-divider></el-divider>

        <div class="mybutton">
          <el-popconfirm title="确定要删除选中的所有订单吗？" @onConfirm="alldelete">
            <el-button type="primary" slot="reference" :disabled="deleteallbtn">批量删除</el-button>
          </el-popconfirm>
          <span style="margin-left:10px">
            <el-button @click="onSort" :icon="sorticon">排序</el-button>
          </span>
        </div>

        <el-table ref="multipleTable" :data="tableData"
            tooltip-effect="dark" style="width: 100%"
            @selection-change="selectchange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="#" width="50" prop="id" sortable="true"></el-table-column>
            <el-table-column prop="orderID" label="订单号"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="freight" label="运费"></el-table-column>
            <el-table-column prop="orderDate" label="下单日期"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <el-popconfirm title="您确定要执行此操作吗？" @onConfirm="formdelete(scope.row)">
                  <el-button slot="reference" type="text" size="small">{{scope.row.execute}}</el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
          deleteallbtn: true,
          tablechecked:[],
          checked:[],
          options: [
            {value: '选项1',label: '交易关闭'},
            {value: '选项2',label: '等待付款'}, 
            {value: '选项3',label: '申请退款中'}
          ],
          formInline: {
            status:"",
            orderID: '',
            userName: '',
            startDate: '',
            endDate: ''
          },
          sorticon: 'el-icon-caret-bottom',
          tableData: [
            {id:"1",orderID:"112321",userName:"张三",orderStatus:"等待付款",freight:"12.0",orderDate:"2017",execute:"取消订单"},
            {id:"2",orderID:"231112",userName:"李四",orderStatus:"申请退款中",freight:"12.0",orderDate:"2018",execute:"同意退款"},
            {id:"3",orderID:"312312",userName:"王五",orderStatus:"交易关闭",freight:"10.0",orderDate:"2019",execute:"删除订单"},
            {id:"4",orderID:"341231",userName:"赵六",orderStatus:"退货成功",freight:"11.0",orderDate:"2020",execute:"去发货"}
          ]
        }
    },
    methods: {
        onSubmit() {
            console.log(this.formInline)
        },
        onSort() {
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
          switch(row.execute){
            case "取消订单": console.log("已取消订单"+row.orderID);break;
            case "同意退款": console.log("已同意退款订单"+row.orderID);break;
            case "删除订单": console.log("已删除订单"+row.orderID);break;
            default:console.log(row.orderID);
          }
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
  margin:0 0 20px 0px;
}
.mybutton{
  display: flex;
  justify-content: space-between;
}
</style>