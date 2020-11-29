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
              <el-input v-model="formInline.orderCode" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formInline.userID" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="下单日期">
              <el-col :span="11">
                <el-input type="date" v-model="formInline.startDate" placeholder="起始日期"></el-input>
              </el-col>
              <el-col class="line" style="margin-left:10px" :span="1">-</el-col>
              <el-col :span="11">
                <el-input  type="date" v-model="formInline.endDate" placeholder="终止日期"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
        </el-form>

        <div class="myheader">订单信息列表</div>
        <el-divider></el-divider>

        <div class="mybutton">
          <el-popconfirm title="确定要删除选中的所有订单吗？" @onConfirm="alldelete">
            <el-button type="primary" slot="reference" :disabled="deleteallbtn">批量删除</el-button>
          </el-popconfirm>
          <span style="margin-left:10px">
            <el-button @click="onSort" :icon="sorticon">排序</el-button>
          </span>
        </div>

        <el-table ref="multipleTable" :data="tableDate"
            tooltip-effect="dark" style="width: 100%" 
            @selection-change="selectchange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="#" width="120" prop="orderId" sortable="true"></el-table-column>
            <el-table-column prop="orderCode" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="orderStatus" label="订单状态" show-overflow-tooltip :formatter="statusForma"></el-table-column>
            <el-table-column prop="orderPostalfee" label="运费"></el-table-column>
            <el-table-column prop="orderDate" label="下单日期" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-popconfirm title="您确定要执行此操作吗？" @onConfirm="formdelete(scope.row)">
                  <el-button slot="reference" type="text" size="small">{{statusForma(scope.row,"btnText")}}</el-button>
                </el-popconfirm>
            </template>
            </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
    </div>
</template>

<script>
import { orderList,deleteOrder } from '@/api/order';
export default {
    data() {
        return {
          //批量删除按钮
          deleteallbtn: true,
          tablechecked:[],
          checked:[],
          //顶部下拉选框数据
          options: [
            {value: '',label: '请选择'},
            {value: '1',label: '申请退款中'},
            {value: '2',label: '等待付款中'},
            {value: '3',label: '交易关闭'}, 
            {value: '4',label: '待发货'}, 
            {value: '5',label: '已完成'}
          ],
          //顶部搜索栏数据
          formInline: {
            status:'',
            orderCode: '',
            userID: '',
            startDate: '',
            endDate: ''
          },
          //排序按钮
          sorticon: 'el-icon-caret-top',
          //订单列表数据
          tableDate:[],
          //页码
          currentPage: 0,
          total: 0,
          pagesize: 10,
          //排序
          sort:"asc",
        }
    },
    methods: {
        //提交搜索
        onSubmit() {
            this.getTableList(this.currentPage,this.pagesize);
        },
        //排序
        onSort() {
            if (this.sorticon == 'el-icon-caret-bottom') {
            this.sorticon = 'el-icon-caret-top'
            this.sort = "asc";
            } else {
            this.sorticon = 'el-icon-caret-bottom'
            this.sort = "desc";
            }
            this.getTableList(this.currentPage,this.pagesize);
        },
        //多选按钮是否禁用
        selectchange(val) { 
          this.tablechecked = val
          if (this.tablechecked.length != 0) {
              this.deleteallbtn = false
          } else {
              this.deleteallbtn = true
          }
        },
        //删除多选选定订单
        alldelete() {
          this.tablechecked.forEach((item) => {
            this.checked.push(item.orderCode)
          })
          this.deletelist(this.checked);
          this.tablechecked = []
          this.checked = []
        },
        //操作方式
        formdelete(row){
          switch(row.orderStatus){
            case 1: console.log("已同意退款"+row.orderCode);break;
            case 2: console.log("已取消订单"+row.orderCode);break;
            case 3: this.deletelist([row.orderCode]);break;
            case 4: console.log("正在发货"+row.orderCode);break;
            case 5: console.log("正在结算"+row.orderCode);break;
            default:console.log(row.orderCode);
          }
        },
        //分页切换
        handleCurrentChange(val) {
          this.currentpage = val;
          this.getTableList(this.currentpage,this.pagesize);
        },
        // 获取订单列表
        getTableList(curr,size){
          var data = {
            status: this.formInline.status,
            orderCode: this.formInline.orderCode,
            userID: this.formInline.userID,
            startDate: this.formInline.startDate,
            endDate: this.formInline.endDate,
            sort: this.sort,
            currentpage: curr,
            pagesize: size
          }
          orderList(data).then((res)=>{
            if(res.code == 200){
              this.tableDate = res.data.tableDate;
              this.total = res.data.total;
            }
          })
        },
        //数据格式化为文本
        statusForma(row,type){
          var statusText;
          var btuText;
          switch(row.orderStatus){
            case 1: statusText = "申请退款中";btuText = "去退款"; break;
            case 2: statusText = "等待付款中";btuText = "取消订单"; break;
            case 3: statusText = "交易关闭";btuText = "删除订单"; break;
            case 4: statusText = "待发货";btuText = "去发货"; break;
            case 5: statusText = "已完成";btuText = "去结算"; break;
          }
          if(type == "btnText"){
            return btuText;
          }else{
            return statusText;
          }
        },
        //删除订单数据
        deletelist(code){
          deleteOrder(code).then((res) =>{
            if(res.code == 200){
              this.getTableList(this.currentPage,this.pagesize);
            }
          }).catch((res)=>{
            console.log(res)
          }
          );
        }
    },
    created(){
      this.getTableList(this.currentPage,this.pagesize);
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
.block{
  margin-top: 20px;
  text-align: center;
}
</style>