<template>
  <div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col style="margin-top: 5vh" md="8">
          <b-card-group deck>
            <b-card no-body>
              <ul class="list-unstyled">
                <b-card
                  style="margin-top: 1vh"
                  tag="li"
                  v-for="(item, index) in pageInfo"
                  :key="index"
                >
                  <b-media no-body tag="li">
                    <b-media-body class="ml-3">
                      <h5 class="mb-1" style="margin-top: 2vh">
                        <b-link @click="getBlog(item.id)" class="card-link">{{
                          item.title
                        }}</b-link>
                      </h5>

                      <p class="text-justify" style="max-width: 320px">
                        {{ item.description }}
                      </p>
                      <b-link href="#" class="card-link">
                        <b-img
                          src="https://picsum.photos/25/25/?image=41"
                          fluid
                          rounded="circle"
                          alt=""
                        ></b-img>
                      </b-link>
                      <b-link to="/account/login" class="card-link">{{
                        item.username
                      }}</b-link>
                      <b-link disabled class="card-link">{{
                        timestampToTime(item.updatedAt, "YYYY-MM-DD")
                      }}</b-link>

                      <br />
                      <div class="d-flex justify-content-between">
                        <small class="text-muted">
                          <b-icon icon="tag-fill"></b-icon>
                          &nbsp;<span
                            v-for="row in item.Tags"
                            :key="row.index"
                            >{{ row.tagName + "\、" }}</span
                          >
                        </small>
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
              <b-list-group-item> </b-list-group-item>
            </b-card>
          </b-card-group>
        </b-col>
        <!-- right type -->
        <b-col style="margin-top: 5vh" md="4">
          <b-card-group deck>
            <b-card no-body header-text-variant="info" header-tag="header">
              <template v-slot:header>
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">分类</h5>
                  <h5><b-icon
                      variant="info"
                      scale="1.5"
                      v-b-modal.insert-type-modal
                      icon="plus"
                    ></b-icon></h5>
                </div>
              </template>
              <b-list-group>
                <b-list-group-item>
                  <b-button
                    v-for="(item, index) in dataList"
                    :key="index"
                    pill
                    variant="outline-primary"
                    class="type-button"
                    @click="onClickType(item.id)"
                  >
                    {{ item.typeName }}
                    <b-badge variant="info">{{ item.amount }}</b-badge>
                  </b-button>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-card-group>
          <!-- 新增分类模态框 -->
          <b-modal
            id="insert-type-modal"
            hide-backdrop
            size="sm"
            title="新增分类"
            ref="close-insert-modal"
          >
            <b-form>
              <b-input-group>
                <b-form-input v-model="typeName" type="text" required>
                </b-form-input>
              </b-input-group>
            </b-form>
            <template v-slot:modal-footer>
              <b-button
                size="sm"
                @click="insertType"
                data-dissmiss="modal"
                variant="info"
                >添加</b-button
              >
            </template>
          </b-modal>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { typeList, typePageList, insertType } from "@/api/example/typeApi";
import { getBlog, pageList } from "@/api/example/blogApi";
import storageApi from "@/api/system/storageApi";
import Moment from "moment";

export default {
  data() {
    return {
      dataList: [],
      pageInfo: [],
      typeList: [],
      pages: {
        total: 0,
        pageSize: 6,
        pageNum: 1,
      },
      typeName: "",
    };
  },
  methods: {
    timestampToTime(timestamp, str) {
      const stamp = new Date(timestamp * 1000);
      return Moment(stamp).format(str);
    },
    // 显示分类
    getList() {
      typeList().then((res) => {
        this.dataList = res.data.data.type;
      });
    },
    // 博客
    getBlogList() {
      const options = {
        params: {
          pageSize: this.pages.pageSize,
          pageNum: this.pages.pageNum,
        },
      };
      pageList(options).then((res) => {
        this.pages.total = res.data.total;
        this.pages.pageSize = res.data.pageSize;
        this.pages.pageNum = res.data.pageNum;
        this.pageInfo = res.data.data.dataList;
      });
    },
    // 点击分类进行博客的展示
    onClickType(id) {
      const options = {
        params: {
          id: id,
          pageSize: this.pages.pageSize,
          pageNum: this.pages.pageNum,
        },
      };
      typePageList(options).then((res) => {
        this.pages.total = res.data.total;
        this.pages.pageSize = res.data.pageSize;
        this.pages.pageNum = res.data.pageNum;
        this.pageInfo = res.data.data.dataList;
      });
    },
    // 点击博客标题跳转博客详情页
    getBlog(id) {
      getBlog({ id: id }).then((res) => {
        if (res.data.state) {
          storageApi.set("blogs", JSON.stringify(res.data.data.blogs));
          this.$router.push({ path: "/blog" });
        }
      });
    },
    // 新增分类
    insertType() {
      insertType({ typeName: this.typeName })
        .then((res) => {
          if (res.data.state) {
            this.$message({ message: res.data.msg, type: "success" });
            this.$refs["close-insert-modal"].hide();
          }
        })
        .catch((err) => {
          this.$message({ message: err.response.data.msg, type: "error" });
        });
    },
  },
  created() {
    this.getList();
    this.getBlogList();
  },
};
</script>

<style>
.m-type-button-margin {
  margin-top: 0.5rem;
  margin-left: 1rem;
}
.card-link {
  color: rgb(29, 28, 28);
}
.type-button {
  margin-right: 1vh;
  margin-top: 1vh;
}
</style>