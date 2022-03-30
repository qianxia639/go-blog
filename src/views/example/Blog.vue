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
            <!-- 头部 -->
            <b-card no-body header-tag="header">
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
                    <b-icon icon="calendar"></b-icon>&nbsp;更新于:
                    {{ blogs.updatedAt }}
                  </b-link>
                  <b-link disabled class="card-link">
                    <b-icon icon="eye"></b-icon>&nbsp;{{ blogs.views }}
                  </b-link>
                </small>
              </template>

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
                    row.tagName + "\、"
                  }}</span>
                </small>
              </b-list-group-item>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>

      <div class="m-padding m-fixed m-right-bottom">
        <b-button-group vertical>
          <b-button variant="info" href="#" tabindex="0" id="tocbot-button">
            <b-icon icon="list"></b-icon>
          </b-button>
          <a href="#" class="btn btn-secondary"
            ><b-icon icon="chevron-up"></b-icon
          ></a>
        </b-button-group>
      </div>
      <b-tooltip target="tocbot-button" placement="left" triggers="focus">
        <div>
          <ol class="js-toc"></ol>
        </div>
      </b-tooltip>
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
import storageService from "@/api/system/storageApi";
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      blogs: "",
    };
  },
  methods: {},
  created() {
    this.blogs = JSON.parse(storageService.get("blogs"));
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
  padding: 1em;
}
</style>