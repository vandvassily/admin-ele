<template>
  <el-container style="background: #2c3e50;height: 100vh">
    <div class="login-form">
      <el-form :model="signup" status-icon :rules="signupRole" ref="signupForm" label-width="60px">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="signup.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="signup.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="signup.newPassword" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="submit-btn">
        <el-button type="primary" @click="submitForm('signupForm')">修改</el-button>
      </div>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'passwordReset',
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
        callback(new Error('请输入旧密码'))
      } else {
        callback()
      }
    }

    var validateNewPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    return {
      signup: {
        username: '',
        password: '',
        newPassword: ''
      },
      signupRole: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { validator: validateNewPass, trigger: 'blur' }
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
          this.$http.post('api/password-reset', {username: this.signup.username, password: this.signup.password, newPassword: this.signup.newPassword}).then((res) => {
            this.$message({
              showClose: true,
              message: res.message,
              type: res.success ? 'success' : 'error'
            })
            if (res.success === true) {
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
.submit-btn {
  text-align: center;
}
</style>
