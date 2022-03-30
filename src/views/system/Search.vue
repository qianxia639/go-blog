<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col style="margin-top: 5vh" md="10">
          <b-card-group deck>
            <b-card no-body header-text-variant="info" header-tag="header">
              <template v-slot:header>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">搜索结果</h5>
                  <h5>共 {{ total }} 篇</h5>
                </div>
              </template>
              <ul class="list-unstyled">
                <span v-if="blogList == null" class="text-center"
                  >查无结果</span
                >
                <b-card
                  style="margin-top: 1vh"
                  tag="li"
                  v-for="(item, index) in blogList"
                  :key="index"
                >
                  <b-media no-body tag="li">
                    <b-media-body class="ml-3">
                      <!-- 标题 -->
                      <h5 class="mb-1" style="margin-top: 2vh">
                        <b-link
                          @click="getBlog(item.id)"
                          class="card-link"
                          target="_blank"
                          >{{ item.title }}</b-link
                        >
                      </h5>

                      <!-- 内容 -->
                      <p class="text-justify" style="max-width: 320px">
                        {{ item.description }}
                      </p>

                      <!-- 头像 -->
                      <b-link href="#" class="card-link">
                        <b-img
                          src="https://picsum.photos/25/25/?image=41"
                          fluid
                          rounded="circle"
                          alt=""
                        ></b-img>
                      </b-link>

                      <!-- 用户名 -->
                      <b-link to="/account/login" class="card-link">{{
                        item.username
                      }}</b-link>

                      <!-- 更新时间 -->
                      <b-link disabled class="card-link">{{
                        item.updatedAt
                      }}</b-link>

                      <br />

                      <!-- 标签 -->
                      <div class="d-flex justify-content-between">
                        <small class="text-muted">
                          <b-icon icon="tag-fill"></b-icon>
                          &nbsp;<span
                            v-for="row in item.Tags"
                            :key="row.index"
                            >{{ row.tagName + "\、" }}</span
                          >
                        </small>
                        <!-- 分类 -->
                        <small class="text-muted">
                          <b-button
                            variant="outline-info"
                            style="margin-right: 15px"
                            size="sm"
                            disabled
                            >{{ item.typeName }}</b-button
                          >
                        </small>
                      </div>
                    </b-media-body>
                    <b-media-aside vertical-align="center">
                      <b-img
                        src="https://picsum.photos/220/150/?image=25"
                      ></b-img>
                    </b-media-aside>
                  </b-media>
                </b-card>
              </ul>
              <b-card-footer> </b-card-footer>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getBlog } from "@/api/example/blogApi";
import storageService from "@/api/system/storageApi";
export default {
  data() {
    return {
      blogList: "",
      total: 0,
    };
  },
  methods: {
    // 点击博客标题跳转博客详情页
    getBlog(id) {
      getBlog({ id: id }).then((res) => {
        if (res.data.state) {
          storageService.set("blogs", JSON.stringify(res.data.data.blogs));
          let url = this.$router.resolve({ name: "Blog" });
          window.open(url.href, "_blank");
        }
      });
    },
  },
  created() {
    this.total = sessionStorage.getItem("total");
    this.blogList = JSON.parse(sessionStorage.getItem("searchList"));
  },
};
</script>

<style>
</style>