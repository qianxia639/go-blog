<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col>
          <b-card no-body style="margin-top: 5vh">
            <b-card-text>
              <ol class="js-toc"></ol>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col style="margin-top: 5vh" md="10">
          <b-card-group deck>
            <b-card no-body header-tag="header" footer-tag="footer">
              <!-- 头部 -->
              <template v-slot:header>
                <small>
                  <b-link disabled class="card-link">
                    <b-img
                      :src="blogs.avatar"
                      fluid
                      rounded="circle"
                      alt=""
                    ></b-img>
                  </b-link>
                  <b-link disabled class="card-link">{{
                    blogs.username
                  }}</b-link>
                  <b-link disabled class="card-link">
                    <b-icon icon="clock"></b-icon>&nbsp;更新于:
                    {{ blogs.updatedAt }}
                  </b-link>
                  <b-link disabled class="card-link">
                    <b-icon icon="eye"></b-icon>&nbsp;{{ blogs.views }}
                  </b-link>
                </small>
              </template>

              <!-- 中间内容 -->
              <b-list-group-item>
                <div>
                  <h3 class="d-flex justify-content-center">
                    {{ blogs.title }}
                  </h3>
                  <div class="d-flex justify-content-end">
                    <b-button
                      disabled
                      variant="outline-info"
                      class="flag-size"
                      >{{ blogs.flag }}</b-button
                    >
                  </div>
                </div>

                <br />

                <div class="typo selection js-toc-content">
                  <VueMarkdown
                    :source="blogs.content"
                    v-highlight
                  ></VueMarkdown>
                </div>
                <small class="text-muted" style="margin-top: 5vh">
                  <b-icon icon="tag-fill"></b-icon>
                  &nbsp;<span v-for="row in blogs.tagNames" :key="row.index">{{
                    row.tagName + "  "
                  }}</span>
                </small>
              </b-list-group-item>

              <b-card-body>
                <h3>评论</h3>
                <hr />
                <b-media>
                  <template v-slot:aside>
                    <b-img
                      src="https://picsum.photos/30/30/?image=41"
                      fluid
                      rounded="circle"
                    ></b-img>
                  </template>

                  <h5 class="mt-0">Alice <small>2020</small></h5>
                  <p>this is a comment</p>
                  <small>
                    <a
                      href="#"
                      data-commentid="1"
                      data-commentusername="0"
                      @click="replay($event)"
                      >回复</a
                    >
                  </small>

                  <b-media>
                    <template v-slot:aside>
                      <b-img
                        src="https://picsum.photos/30/30/?image=41"
                        fluid
                        rounded="circle"
                      ></b-img>
                    </template>

                    <h5 class="mt-0">Bob</h5>
                    <p class="mb-0">hello man!</p>
                    <small>回复</small>
                  </b-media>
                </b-media>

                <b-media>
                  <template v-slot:aside>
                    <b-img
                      src="https://picsum.photos/30/30/?image=41"
                      fluid
                      rounded="circle"
                    ></b-img>
                  </template>
                  <h5 class="mt-0">Jang</h5>
                  <p class="mb-0">Hi</p>
                  <small>回复</small>
                </b-media>
              </b-card-body>

              <!-- 底部 -->
              <template v-slot:footer>
                <b-form-input
                  id="blog-id"
                  hidden
                  :value="blogs.id"
                ></b-form-input>
                <b-form-input hidden id="parent-id" value="0"></b-form-input>
                <!-- 评论列表 -->
                <b-form-textarea
                  id="content"
                  v-model="content"
                  placeholder="请输入评论信息..."
                ></b-form-textarea>
                <b-row style="margin-top: 1vh">
                  <b-col sm="5">
                    <b-form-input
                      v-model="username"
                      placeholder="请输入名称"
                    ></b-form-input>
                  </b-col>
                  <b-col>
                    <b-button variant="info" @click="save">发布</b-button>
                  </b-col>
                </b-row>
              </template>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>

      <div class="m-padding m-fixed m-right-bottom">
        <b-button-group vertical>
          <b-button variant="info">
            <b-icon icon="list"></b-icon>
          </b-button>
          <a href="#" class="btn btn-secondary"
            ><b-icon icon="chevron-up"></b-icon
          ></a>
        </b-button-group>
      </div>
    </b-container>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown";
// import "github-markdown-css/github-markdown-dark.css";

import "@/assets/css/typo.css";
// import "tocbot/static/css/tocbot.css"
// import "tocbot/dist/tocbot.css"
import tocbot from "tocbot";
// markdown-body
import storageApi from "@/api/system/storageApi";
import { save } from "@/api/system/commentApi";
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      blogs: "",
      username: "",
      content: "",
    };
  },
  methods: {
    replay(e) {
      // 获取自定义的属性值
      let commentId = e.target.getAttribute("data-commentid");
      let commentUsername = e.target.getAttribute("data-commentusername");
      // 修改placeholder的值并获取焦点
      document
        .getElementById("content")
        .setAttribute("placeholder", "@" + commentUsername);
      document.getElementById("content").focus();
      // 给隐藏域赋值
      document.getElementById("parent-id").value = commentId;
    },
    save() {
      const options = {
        // params: {
        blog_id: document.getElementById("blog-id").value,
        parent_id: document.getElementById("parent-id").value,
        username: this.username,
        content: this.content,
        // }
      };
      save(options).then((res) => {
        if (res.data.state) {
          alert("success");
          // console.log(this.comment)
        } else {
          alert("error");
        }
      });
    },
  },
  created() {
    this.blogs = JSON.parse(storageApi.get("blogs"));
  },
  mounted() {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: ".js-toc",
      // Where to grab the headings to build the table of contents.
      contentSelector: ".js-toc-content",
      // Which headings to grab inside of the contentSelector element.
      headingSelector: "h1, h2, h3",
      // For headings inside relative or absolute positioned containers within content.
      hasInnerContainers: true,
    });
  },
};
</script>

<style lang="scss">
@import "tocbot/src/scss/tocbot";
a.disabled {
  pointer-events: none;
  color: rgb(134, 133, 133);
}
.flag-size {
  padding: 0;
  font-size: 0.9rem;
  width: 40px;
  height: 25px;
  margin-right: 0;
  margin-bottom: 0rem;
}
.ds {
  width: 50px;
  height: 30px;
}
.m-fixed {
  position: fixed;
}
.m-right-bottom {
  bottom: 0;
  right: 0;
}
.m-left-bottom {
  bottom: 100;
  left: 100;
}
.m-padding {
  padding: 1.5em;
}
.footer-button {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}
</style>