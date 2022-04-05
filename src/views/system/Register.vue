<template>
  <div>
    <b-row class="register">
      <b-col md="8" offset-md="2" lg="5" offset-lg="3">
        <b-card>
          <b-card-title style="text-align: center">注册</b-card-title>
          <b-form>
            <!-- 邮箱 -->
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                autofocus
                v-model="$v.user.email.$model"
                type="email"
                placeholder="请输入邮箱"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('email')">
                请输入正确的邮箱地址
              </b-form-invalid-feedback>
            </b-input-group>
            <!-- 密码 -->
            <b-input-group class="mb-2">
              
               <b-input-group-prepend is-text>
                <b-icon icon="lock"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="请输入密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须包含数字与字母,且长度在6-15之间
              </b-form-invalid-feedback>
            </b-input-group>
            <!-- 确认密码 -->
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                v-model="$v.user.checkPwd.$model"
                type="password"
                placeholder="请再次输入密码"
                :state="validateState('checkPwd')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('checkPwd')">
                两次密码必须要相同
              </b-form-invalid-feedback>
            </b-input-group>
            <b-button variant="outline-primary" @click="register" block
              >注册</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, sameAs, email } from "vuelidate/lib/validators";
import validator from "@/utils/validator";
import { register } from "@/api/system/userApi";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        checkPwd: "",
      },
    };
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
        password: validator.passwordValidator,
      },
      checkPwd: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求
      register(this.user)
        .then((res) => {
          if (res.data.state) {
            //跳转登录页
            this.$router.replace({ name: "Login" });
          }
        })
        .catch((err) => {
          // this.$bvToast.toast(err.response.data.msg, {
          //   title: "数据验证错误",
          //   variant: "danger",
          //   solid: true,
          // });
          this.$message({message: err.response.data.msg, type: 'error'})
        });
    },
  },
};
</script>

<style>
.register {
  padding: 1rem;
  margin-top: 25vh;
  color: #666;
}
</style>