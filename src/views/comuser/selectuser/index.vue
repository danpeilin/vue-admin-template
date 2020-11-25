<template>
    <div class="mybody" v-loading="loading">
        
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
              <el-input v-model="formInline.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="formInline.sex" placeholder="请选择">
                  <el-option
                    v-for="item in sexoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

            <el-form-item style="margin-left:250px">
                <el-button @click="onsort" :icon="sorticon">排序</el-button>
            </el-form-item>
        </el-form>
        <div class="myheader">用户信息列表</div>
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
            prop="userId">
            </el-table-column>
            <el-table-column
            prop="userUsername"
            label="用户名称">
            </el-table-column>
            <el-table-column
            prop="userNickname"
            label="用户昵称">
            </el-table-column>
            <el-table-column
            label="用户性别"
            prop="userSex"
            :formatter="sexformatter">
            </el-table-column>
            <el-table-column
            prop="userEmail"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            prop="role"
            label="用户角色"
            :formatter="roleformatter">
            </el-table-column>
            <el-table-column
            prop="enabled"
            label="账户状态"
            :formatter="enabledformatter">
            </el-table-column>
            <el-table-column
            prop="gmtCreate"
            label="创建日期"
            :formatter="timeformatter">
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
          title="修改用户信息"
          :visible.sync="editdrawer"
          :before-close="editClose">
          <div style="padding: 20px">
              <el-form ref="form" label-width="80px" >
                <el-form-item label="用户昵称">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="form.sex">
                    <el-radio :label="0">男</el-radio>
                    <el-radio :label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select v-model="form.role" :disabled="roledisabled" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.namezh"
                        :value="item.name">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否禁用">
                   <el-switch
                    v-model="form.isban"
                    active-color="#ff4949"
                    inactive-color="#13ce66">
                  </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="toeidt">立即修改</el-button>
                    <el-button @click="editdrawer = false">取消</el-button>
                </el-form-item>
                </el-form>
          </div>
          
        </el-drawer>
    </div>
</template>

<script>
import {getuserbypage, getuserbyid, getrolebytoken, edituserinfo, deleteuser, deleteall} from '@/api/usercom'
export default {
    data() {
      return {
        formInline: {
          username: '',
          sex: '',
        },
        options: [],
        sorticon: 'el-icon-caret-bottom',
        tableData: [],
        form: {
            id: '',
            username: '',
            role: '',
            sex: '',
            email: '',
            isban: true,
        },
        sexoptions: [
          {
            value: '0',
            label: '男'
          }, {
            value: '1',
            label: '女'
          },
          {
            value: '',
            label: '请选择'
          }
        ],
        tablechecked:[],
        checked:[],
        deleteallbtn: true,
        editdrawer: false,
        currentPage: 1,
        totalpage: 0,
        pagesize: 10,
        roledisabled: false,
        sort: 'asc',
        loading: true
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
        this.getall(val, this.pagesize)
      },
      onsort() {
        if (this.sorticon == 'el-icon-caret-bottom') {
          this.sort = 'desc'
          this.getall(this.currentPage, this.pagesize)
          this.sorticon = 'el-icon-caret-top'
        } else {
          this.sort = 'asc'
          this.getall(this.currentPage, this.pagesize)
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
           this.checked.push(parseInt(item.userId))
       })

       deleteall(this.checked).then((res) => {
         if(res.code == 200) {
            this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
            });
            this.tablechecked = []
            this.checked = []
            this.getall(this.currentPage, this.pagesize)
          }
       })
        
      },
      formdelete(row){
        if(this.$store.state.user.username == row.userUsername) {
          this.$notify.error({
            title: '错误',
            message: '不能删除当前登录用户'
          });
        } else {
          deleteuser(row.userId).then((res) => {
            if(res.code == 200) {
              this.$notify({
                title: '成功',
                message: res.data.msg,
                type: 'success'
              });
              this.getall(this.currentPage, this.pagesize)
            }
          })
        }
      },
      editClose(done) {
          this.form.id = ''
          this.form.username = ''
          this.form.role = ''
          this.form.sex = ''
          this.form.email = ''
          this.form.isban = ''
          done()
      },
      formedit(row){
          this.editdrawer = true
           getuserbyid(row.userId).then((res)=>{
             if (res.code == 200) {
              
               this.form.id = res.data.user.userId
               this.form.username = res.data.user.userNickname
               this.form.role = res.data.user.role[0]
               this.form.sex = res.data.user.userSex
               this.form.email = res.data.user.userEmail
               this.form.isban = res.data.user.enabled
             }
           })
      },
      toeidt() {
          //请求编辑
          edituserinfo(this.form).then((res) => {
              if(res.code == 200) {
                this.$notify({
                  title: '成功',
                  message: res.data.msg,
                  type: 'success'
                });
                this.getall(this.currentPage, this.pagesize)
              }else {
                this.$notify.error({
                  title: '错误',
                  message: res.data.msg
                });
              }
          })
          this.editdrawer = false
          
      },
      getall(currentPage, pagesize) {
        var data = {
          currentPage: currentPage,
          pagesize: pagesize,
          username : this.formInline.username,
          sex : this.formInline.sex,
          sort : this.sort
        }
        getuserbypage(data).then((res) => {
          if(res.code = 200) {
            this.totalpage = res.data.total
            this.tableData = res.data.userlist
          }
          this.loading = false
        })
      },
      sexformatter(row, column) {
        return row.userSex == 0?'男':'女'
      },
      enabledformatter(row, column) {
        if(row.enabled == false) {
          return '正常'
        } else {
          return '封禁'
        }
      },
      timeformatter(row, column) {
         // 获取单元格数据
        let data = row[column.property]
        if (data ==='') {
            return ''
        }else {
            let dt = new Date(data)
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
        }
      },
      roleformatter(row, column) {
        if(row.role == 'admin') {
          return '管理员'
        } else if (row.role == 'superadmin') {
          return '超级管理员'
        } else {
          return '普通用户'
        }
        
      },
      permission() {
        getrolebytoken(this.$store.state.user.token).then((res)=>{
          if(res.code == 200) {
            if(res.data.role == 'superadmin') {
              this.roledisabled = false
            } else {
              this.roledisabled = true
            }
            this.options = res.data.list
          }
        })
        
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
  },
  created() {
    this.getall(this.currentPage, this.pagesize)
    this.permission()
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