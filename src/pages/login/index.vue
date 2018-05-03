<template>
<el-container style="background: #2c3e50;height: 100vh">
  <div class="login-form">
    <el-form :model="login" status-icon :rules="loginRule" ref="loginForm" label-width="60px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input type="password" v-model="login.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="login.pass" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div style="color: #999">账号密码随便输入哈</div>
    <div class="submit-btn">
      <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
    </div>
  </div>
</el-container>
</template>

<script>
export default {
  data () {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      login: {
        username: '',
        pass: ''
      },
      loginRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        username: [
          { validator: checkUsername, trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '成功',
            type: 'success'
          })
          setTimeout(this.$router.push({ path: '/' }), 300)
        } else {
          this.$message({
            message: '请输入正确的账号密码',
            type: 'error'
          })
          return false
        }
      })
    }
  }
}
</script>

<style>
.login-form {
  width: 380px;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
.submit-btn{
  text-align: center;
}
</style>
