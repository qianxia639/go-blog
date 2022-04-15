<template>
  <div>
    <b-row class="login">
      <b-col md="8" offset-md="2" lg="5" offset-lg="3">
        <b-card>
          <b-card-title style="text-align: center">登录</b-card-title>
          <b-form>
            <!-- 用户名 -->
            <b-input-group class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="envelope"></b-icon>
              </b-input-group-prepend>
              <b-form-input
                autofocus
                v-model="$v.user.email.$model"
                type="email"
                placeholder="请输入账号"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('email')">
                账号不能为空
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
                @keyup.enter="login"
              ></b-form-input>
              <b-form-invalid-feedback :state="validateState('password')">
                密码必须包含数字与字母,且长度在6-15之间
              </b-form-invalid-feedback>
            </b-input-group>
            <b-button variant="outline-primary" @click="login" block
              >登录</b-button
            >
            <b-link to="/account/register">前往注册</b-link>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required,email } from "vuelidate/lib/validators";
import validator from "@/utils/validator";
import storageService from "@/api/system/storageApi";
import { login, info } from "@/api/system/userApi";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      password: {
        required,
        password: validator.passwordValidator,
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    login() {
      // 验证数据
      this.$v.user.$touch();
      if (this.$v.user.$anyError) {
        return;
      }
      // 请求
      login(this.user)
        .then((res) => {
          // 保存token
          storageService.set(storageService.TOKEN, res.data.data.token);
          //  window.location.href = "/";
          return info();
        })
        .then((resp) => {
          // 保存用户信息
          storageService.set(
            storageService.INFO,
            JSON.stringify(resp.data.data.user)
          );
          //跳转首页
          // this.$router.replace({ name: "Index" });
          window.location.href = "/index";
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
.login {
  padding: 1rem;
  margin-top: 25vh;
  color: #666;
}
</style>