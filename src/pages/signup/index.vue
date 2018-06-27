<template>
<el-container style="background: #2c3e50;height: 100vh">
  <div class="login-form">
    <el-form :model="signup" status-icon :rules="signupRole" ref="signupForm" label-width="60px">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="signup.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" @keyup.enter.native="submitForm('signupForm')" v-model="signup.password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div class="submit-btn">
      <el-button type="primary" @click="submitForm('signupForm')">注册</el-button>
    </div>
  </div>
</el-container>
</template>

<script>
export default {
  name: 'signup',
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
      signup: {
        username: '',
        password: ''
      },
      signupRole: {
        password: [
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
          this.$store.dispatch('SignUpUser', this.signup).then(res => {
            if (res.success === true) {
              this.$message({
                showClose: true,
                message: res.message,
                type: 'success'
              })
              localStorage.token = res.token
              localStorage.username = res.username
              setTimeout(this.$router.push({ path: '/login' }), 300)
            }
          })
        } else {
          this.$message({
            message: '请填写账号密码',
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
