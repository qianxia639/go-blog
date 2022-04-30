<template>
  <b-navbar
    toggleable="lg"
    type="light"
    class="nav-color"
    variant="secondary"
    style="z-index: 2"
  >
    <!-- <b-container> -->
      <b-navbar-brand href="/index" style="color: #48a1ee; font-size: 24px"
        >LYY_BLOG</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- house -->
          <b-nav-item to="/index">
            <small><b-icon icon="house"></b-icon></small> 首页
          </b-nav-item>
          <!-- grid -->
          <b-nav-item to="/types">
            <small><b-icon icon="grid"></b-icon></small> 分类
          </b-nav-item>
          <!-- pencil -->
          <b-nav-item v-if="userInfo !== null" to="/blogs/blogList">
            <small><b-icon icon="pencil"></b-icon></small> 编辑
          </b-nav-item>
          <!-- stickies -->
          <b-nav-item to="/archives">
            <small><b-icon icon="stickies"></b-icon></small> 归档
          </b-nav-item>
          <!-- chat -->
          <b-nav-item to="/leave">
            <small><b-icon icon="chat"></b-icon></small>留言墙
          </b-nav-item>
          <!-- info -->
          <b-nav-item to="/about">
            <small><b-icon icon="info"></b-icon></small> 关于
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="!userInfo">
          <b-nav-item to="/account/login">登录</b-nav-item>
          <!-- <b-nav-item v-if="$route.name != 'Register'" to="/account/register"
            >注册</b-nav-item
          > -->
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item-dropdown right>
            <template v-slot:button-content>
              <b-img
                :src="userInfo.avatar"
                fluid
                rounded="circle"
                alt=""
              ></b-img
              >{{ userInfo.username }}
            </template>
            <b-dropdown-item v-b-modal.userInfo-modal
              ><b-icon icon="person"></b-icon>个人中心</b-dropdown-item
            >
            <b-dropdown-item @click="logout">
              <b-icon icon="box-arrow-right"></b-icon> 注销</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>

      <b-modal
        v-if="userInfo"
        id="userInfo-modal"
        hide-backdrop
        :hide-footer="true"
        title="个人信息"
      >
        <b-form-group
          label-cols-sm="2"
          label="用户名"
          label-align-sm="left"
          label-for="nested-username"
        >
          <b-form-input
            name="username"
            @change="update()"
            :value="userInfo.username"
            id="nested-username"
          ></b-form-input>
        </b-form-group>
      </b-modal>
    <!-- </b-container> -->
  </b-navbar>
</template>

<script>
import storageApi from "@/api/system/storageApi";
import { updateUsername, info } from "@/api/system/userApi";
export default {
  name: "Navbar",
  computed: {
    userInfo() {
      // return this.$store.state.userModule.userInfo
      return storageApi.get(storageApi.INFO)
        ? JSON.parse(storageApi.get(storageApi.INFO))
        : null;
    },
  },
  methods: {
    logout() {
      storageApi.clear();
      window.location.href = "/";
    },
    update(username) {
      var username = document.getElementById("nested-username").value;
      updateUsername({ username: username })
        .then((res) => {
          return info();
        })
        .then((resp) => {
          if (resp.data.state) {
            storageApi.set(
              storageApi.INFO,
              JSON.stringify(resp.data.data.user)
            );
            location.reload();
          }
        });
    },
  },
};
</script>

<style>
.text-center {
  display: grid;
  align-content: center;
}
/* #8fbfea */
.nav-color {
  background-color: #8fbfea;
  color: rgba(255, 255, 255, 0.8);
}
</style>