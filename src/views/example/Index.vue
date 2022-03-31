<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <!-- 左边的博客列表 -->
        <b-col
          class="animate__animated animate__fadeInUp"
          style="margin-top: 5vh"
          md="8"
        >
          <b-card-group deck>
            <b-card
              no-body
              header="博客"
              header-text-variant="info"
              header-tag="h3"
            >
              <ul class="list-unstyled">
                <b-card
                  style="margin-top: 1vh"
                  tag="li"
                  v-for="(item, index) in pageInfo"
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
                            >{{ row.tagName + "  " }}</span
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
                        src="https://picsum.photos/200/150/?image=25"
                      ></b-img>
                    </b-media-aside>
                  </b-media>
                </b-card>
              </ul>
              <b-list-group-item>
                <b-pagination
                  v-model="pages.pageNum"
                  :total-rows="pages.total"
                  :per-page="pages.pageSize"
                  align="right"
                >
                </b-pagination>
              </b-list-group-item>
            </b-card>
          </b-card-group>
        </b-col>

        <!-- 右边的标签列表 -->
        <b-col
          class="animate__animated animate__fadeInDown"
          style="margin-top: 5vh"
          md="4"
        >
          <!-- 搜索框 -->
          <b-form-input
            size="sm"
            class="mb-2"
            type="text"
            required
            v-model="query"
            placeholder="按回车进行搜索"
            v-on:keyup.enter="searchBlog"
          ></b-form-input>
          <!-- 分类列表 -->
          <b-card-group deck>
            <b-card
              header="分类"
              header-text-variant="info"
              header-tag="header"
            >
              <b-list-group>
                <span hidden v-for="index in colors" :key="index"></span>
                <b-list-group-item
                  to="/types"
                  v-for="(item, index) in typeList"
                  :key="index"
                  href="#"
                  :variant="colors[index]"
                  class="d-flex justify-content-between align-items-center"
                >
                  {{ item.typeName }}
                  <b-badge variant="primary">{{ item.amount }}</b-badge>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-card-group>
          <!-- 最新推荐 -->
          <b-card-group style="margin-top: 3vh" deck>
            <b-card
              no-body
              header="最新推荐"
              header-text-variant="info"
              header-tag="header"
            >
              <b-list-group>
                <span hidden v-for="index in colors" :key="index"></span>
                <b-list-group-item
                  v-for="(item, index) in latestList"
                  :key="index"
                  @click="getBlog(item.id)"
                  :variant="colors[index]"
                  class="d-flex justify-content-between align-items-center"
                >
                  {{ item.title }}
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-card-group>
          <!-- 日历 -->
          <b-card-group style="margin-top: 3vh">
            <b-card no-body align="center">
              <b-list-group flush>
                <b-list-group-item>
                  <b-calendar style="margin-top: 3vh" locale="zh"> </b-calendar>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import storageService from "@/api/system/storageApi";
import { listOrder } from "@/api/example/typeApi";
import { pageList, latestList, getBlog } from "@/api/example/blogApi";
import { searchBlog } from "@/api/system/searchApi";
// import "animate.css";
export default {
  // name: "Navbar",
  // computed: {
  //   userInfo() {
  //     return storageService.get(storageService.USER_INFO)
  //       ? JSON.parse(storageService.get(storageService.USER_INFO))
  //       : null;
  //     // return this.$store.state.userModule.userInfo
  //   },
  // },
  data() {
    return {
      userInfo: storageService.get(storageService.USER_INFO)
        ? JSON.parse(storageService.get(storageService.USER_INFO))
        : null,
      typeList: [],
      pageInfo: [],
      latestList: [],
      colors: ["primary", "secondary", "success", "dark", "info"],
      pages: {
        total: 0,
        pageSize: 6,
        pageNum: 1,
      },
      query: "",
    };
  },
  methods: {
    // 分类
    getTypeList() {
      listOrder().then((res) => {
        this.typeList = res.data.data.type;
      });
    },
    // 博客展示及分页
    getBlogList() {
      const options = {
        params: {
          pageSize: this.pages.pageSize,
          pageNum: this.pages.pageNum,
        },
      };
      pageList(options).then((resp) => {
        var res = resp.data.data;

        this.pages.total = res.total;
        this.pages.pageSize = res.pageSize;
        this.pages.pageNum = res.pageNum;

        this.pageInfo = res.dataList;
      });
    },
    // 获取推荐列表
    getLatestList() {
      latestList().then((res) => {
        this.latestList = res.data.data.latestList;
      });
    },
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
    // 搜索
    searchBlog() {
      const options = {
        params: {
          query: this.query,
        },
      };
      searchBlog(options).then((res) => {
        if (res.data.state) {
          sessionStorage.setItem("total", res.data.data.total);
          sessionStorage.setItem(
            "searchList",
            JSON.stringify(res.data.data.dataList)
          );
          this.$router.push({
            name: "Search",
            // params: {
            //   total: res.data.data.total,
            //   searchBlogList: res.data.data.dataList
            // }
          });
        }
      });
    },
  },
  created() {
    this.getTypeList();
    this.getLatestList();
    this.getBlogList();
  },
};
</script>

<style lang="scss">
.align-items-center {
  align-items: center !important;
  display: flex;
}

a.disabled {
  pointer-events: none;
}
.card-link {
  color: rgb(29, 28, 28);
}
.img-center {
  text-align: center;
}
.type-a-font {
  font-size: 80%;
  font-weight: 400;
  color: #0056b3;
  text-align: right;
}
.my-badge {
  color: #007bff;
  background-color: transparent;
}
.pagination {
  display: flex;
  padding-left: 2;
  list-style: none;
  border-radius: 1rem;
}
</style>