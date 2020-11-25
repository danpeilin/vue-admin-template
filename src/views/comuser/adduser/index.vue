<template>
  <div class="mybody">
    <div class="myheader">添加用户</div>
    <el-divider></el-divider>
    <el-card class="container">

   
      <el-form ref="form" :model="form" label-width="100px" label-position="top">
        <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
         <el-form-item label="用户昵称">
            <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="密码确认">
            <el-input v-model="form.repassword" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="toadd">立即添加</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
     </el-card>
  </div>
</template>

<script>
import {adduser} from '@/api/usercom'
export default {
  data(){
    return {
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
      form: {
        username:'',
        nickname: '',
        password: '',
        repassword: '',
        sex: '',
        email: ''
      },
    }
  },
  methods: {
    toadd(){
      adduser(this.form).then((res) => {
        if(res.code = 200) {
          this.$notify({
              title: '成功',
              message: res.data.msg,
              type: 'success'
          });
        } else {
          this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'error'
          });
        }
      })
    },
    resetForm() {
        this.form.username = ''
        this.form.nickname = '',
        this.form.password = ''
        this.form.repassword = ''
        this.form.sex = ''
        this.form.email = ''
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
.container {
  width: 50%;
  margin: 0 auto;
}
</style>