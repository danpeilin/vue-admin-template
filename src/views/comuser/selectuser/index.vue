<template>
    <div class="mybody">
        
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户名">
              <el-input v-model="formInline.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="商品类别">
                <el-select v-model="formInline.sex" placeholder="请选择">
                  <el-option
                    v-for="item in options"
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
            prop="id">
            </el-table-column>
            <el-table-column
            prop="username"
            label="用户名称">
            </el-table-column>
            <el-table-column
            label="用户性别"
            prop="sex">
            </el-table-column>
            <el-table-column
            prop="email"
            label="用户邮箱">
            </el-table-column>
            <el-table-column
            prop="role"
            label="用户角色">
            </el-table-column>
            <el-table-column
            prop="isban"
            label="是否封禁">
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
          title="修改用户信息"
          :visible.sync="editdrawer"
          :before-close="editClose">
          <div style="padding: 20px">
              <el-form ref="form" label-width="80px" >
                <el-form-item label="用户名称">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                    <el-radio-group v-model="form.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input v-model="form.price"></el-input>
                </el-form-item>
                <el-form-item label="用户角色">
                    <el-select v-model="form.role" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否禁用">
                   <el-switch
                    v-model="isban"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
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
export default {
    data() {
      return {
        formInline: {
          username: '',
          sex: '',
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
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '2',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '3',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '4',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '5',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '6',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }, {
            id: '7',
            username: '测试',
            sex:1,
            role: '管理员',
            isban: '1',
            email: 240,
        }],
        form: {
            id: '',
            username: '',
            role: '',
            sex: '',
            email: '',
        },
        tablechecked:[],
        checked:[],
        deleteallbtn: true,
        editdrawer: false,
        isban: true
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