<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <!-- 左边的博客列表 -->
        <b-col style="margin-top: 5vh" offset-md="1" md="10">
          <b-card-group deck>
            <b-card no-body header-text-variant="info" header-tag="header">
              <template v-slot:header>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">归档</h5>
                  <h5>共 {{ total }} 篇</h5>
                </div>
              </template>
            </b-card>
          </b-card-group>
          <div v-for="(value, key) in archiveList" :key="key">
            <h3 style="margin-top: 5vh" class="archives-text-center">
              {{ key }}
            </h3>
            <b-card-group deck style="margin-top: 5vh">
              <b-card no-body class="row pre-scrollable">
                <b-list-group flush>
                  <b-list-group-item
                    @click="getBlog(val.id)"
                    href="#"
                    v-for="val in value"
                    :key="val.id"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">
                        {{ val.title }}
                        <b-button disabled size="sm" variant="outline-info">{{
                          timestampToTime(val.updatedAt, "MM-DD")
                        }}</b-button>
                      </h5>
                      <b-button disabled size="sm" variant="outline-info">{{
                        val.flag
                      }}</b-button>
                    </div>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </b-card-group>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { getArchiveList } from "@/api/example/archiveApi";
import { getBlog } from "@/api/example/blogApi";
import storageApi from "@/api/system/storageApi";
import Moment from "moment";
export default {
  data() {
    return {
      archiveList: {},
      total: "",
    };
  },
  methods: {
    // 归档列表
    getList() {
      getArchiveList().then((res) => {
        this.archiveList = res.data.data.archiveList;
        this.total = res.data.data.total;
      });
    },
    timestampToTime(timestamp, str) {
      const stamp = new Date(timestamp * 1000);
      return Moment(stamp).format(str);
    },
    // 点击博客标题跳转博客详情页
    getBlog(id) {
      getBlog({ id: id }).then((res) => {
        if (res.data.state) {
          storageApi.set("blogs", JSON.stringify(res.data.data.blogs));
          this.$router.push({ name: "Blog" });
        }
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
/* .btn {
  padding: 0;
  font-size: 0.9rem;
} */
.archives-text-center {
  text-align: center;
  color: #17a2b8 !important;
}
</style>