<template>
  <div>
    <b-container style="margin-top: 2vh">
      <div class="d-flex flex-row-reverse">
        <b-button-group>
          <b-button to="/blogs/blogInput" variant="outline-info">发布</b-button>
          <b-button to="/blogs/blogList" active variant="outline-info"
            >列表</b-button
          >
        </b-button-group>
      </div>
    </b-container>
    <b-container class="bv-example-row">
      <b-row>
        <b-col style="margin-top: 5vh" offset-md="1" md="10">
          <b-card no-body class="overflow-hidden" style="height: 75px">
            <b-row no-gutters>
              <b-col md="3" style="margin-top: 1em; margin-left: 1em">
                <b-form-input v-model="title" placeholder="标题"></b-form-input>
              </b-col>
              <b-col md="3" style="margin-top: 1em; margin-left: 1em">
                <b-form-input
                  v-model="startDate"
                  type="date"
                  placeholder="起始日期"
                ></b-form-input>
              </b-col>
              <b-col md="3" style="margin-top: 1em; margin-left: 1em">
                <b-form-input
                  v-model="endDate"
                  type="date"
                  placeholder="结束日期"
                ></b-form-input>
              </b-col>
              <b-button
                style="margin-top: 1em; margin-left: 1em"
                variant="outline-info"
                @click="searchBlog"
              >
                <small><b-icon icon="search"></b-icon></small> 搜索</b-button
              >
            </b-row>
          </b-card>

          <b-card style="margin-top: 1vh">
            <div style="margin-top: -2vh" class="d-flex justify-content-end">
              <b-button to="/blogs/blogInput" variant="outline-info"
                >新增</b-button
              >
            </div>

            <table
              id="my-table"
              style="margin-top: 1vh"
              class="table table-sm table-hover table-bordered"
            >
              <thead>
                <tr>
                  <th>标题</th>
                  <th>浏览次数</th>
                  <th>日期</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in blogList" :key="index">
                  <td>{{ item.title }}</td>
                  <td>{{ item.views }}</td>
                  <td>{{ timestampToTime(item.updatedAt, "YYYY-MM-DD") }}</td>
                  <td>
                    <b-button
                      v-b-modal.edit-blog-modal
                      @click="getUpdateBlog(item.id)"
                      variant="outline-info"
                      >编辑</b-button
                    >
                    <b-button @click="remove(item.id)" variant="outline-danger"
                      >删除</b-button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <b-pagination
              v-model="pages.pageNo"
              :total-rows="pages.total"
              :per-page="pages.pageSize"
              align="right"
            >
            </b-pagination>
            <!-- 编辑模态框 -->
            <b-modal
              id="edit-blog-modal"
              no-close-on-esc
              no-close-on-backdrop
              centered
              hide-backdrop
              title="博客编辑"
              size="lg"
              ref="close-edit-modal"
            >
              <b-form>
                <!-- 描述 -->
                <b-input-group>
                  <b-form-textarea
                    v-model="$v.blog.description.$model"
                    autofocus
                    placeholder="请输入描述内容"
                    no-resize
                    class="pre-scrollabl"
                    :state="validateState('description')"
                  >
                  </b-form-textarea>
                </b-input-group>
                <!-- 标题 -->
                <b-input-group>
                  <b-form-input
                    v-model="$v.blog.title.$model"
                    style="margin-top: 1vh"
                    type="text"
                    placeholder="标题"
                    :state="validateState('title')"
                  >
                  </b-form-input>
                </b-input-group>
                <!-- markdown编辑器 -->
                <b-input-group style="margin-top: 1vh">
                  <!-- markdown编辑器 -->
                  <mavon-editor
                    v-model="blog.content"
                    :ishljs="true"
                    ref="md"
                  ></mavon-editor>
                </b-input-group>
                <!-- 标记 -->
                <b-input-group style="margin-top: 1vh">
                  <b-form-group label="请选择(单选):">
                    <b-form-radio-group v-model="$v.blog.flag.$model">
                      <b-form-radio :state="validateState('flag')" value="原创"
                        >原创</b-form-radio
                      >
                      <b-form-radio :state="validateState('flag')" value="转载"
                        >转载</b-form-radio
                      >
                      <b-form-radio :state="validateState('flag')" value="翻译"
                        >翻译</b-form-radio
                      >
                    </b-form-radio-group>
                  </b-form-group>
                </b-input-group>
              </b-form>
              <!-- 模态框页脚 -->
              <template v-slot:modal-footer="{ cancel }">
                <b-button size="sm" @click="cancel()">退出</b-button>
                <b-button
                  size="sm"
                  @click="update()"
                  data-dissmiss="modal"
                  variant="info"
                  >更新</b-button
                >
              </template>
            </b-modal>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { blogList, remove, getUpdateBlog, update } from "@/api/example/blogApi";
import { searchPriBlog } from "@/api/system/searchApi";
import Moment from "moment";

import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import "github-markdown-css/github-markdown.css";
export default {
  name: "Markdown",
  components: {
    mavonEditor,
  },
  data() {
    return {
      blogList: [],
      pages: {
        total: 0,
        pageSize: 10,
        pageNo: 1,
      },
      title: "",
      startDate: "",
      endDate: "",
      blog: {
        id: "",
        description: "",
        title: "",
        content: "",
        flag: "",
      },
    };
  },
  validations: {
    blog: {
      description: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(100),
      },
      title: {
        required,
        maxLength: maxLength(15),
      },
      flag: {
        required,
      },
    },
  },
  computed: {
    rows() {
      return this.pages.total;
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.blog[name];
      return $dirty ? !$error : null;
    },
    timestampToTime(timestamp, str) {
      const stamp = new Date(timestamp * 1000);
      return Moment(stamp).format(str);
    },
    // 获取博客列表
    getList() {
      const options = {
        params: {
          pageSize: this.pages.perPage,
          pageNo: this.pages.currentPage,
        },
      };
      blogList(options).then((resp) => {
         var res = resp.data.data

        this.pages.total = res.total;
        this.pages.pageSize = res.pageSize;
        this.pages.pageNo = res.pageNo;
        
        this.blogList = res.dataList;
      });
    },
    // 删除博客
    remove(id) {
      if (confirm("是否要删除?")) {
        remove({ id: id }).then((res) => {
          if (res.data.state) {
            // this.$bvToast.toast(res.data.msg, {
            //   variant: "success",
            //   solid: true,
            //   autoHideDelay: 3000,
            // });
            this.$message({ message: res.data.msg, type: "success" });
            location.reload();
          }
        });
      }
    },
    // 获取单条博客信息
    getUpdateBlog(id) {
      getUpdateBlog({ id: id }).then((res) => {
        if (res.data.state) {
          this.blog = res.data.data.blogs;
        }
      });
    },
    // 更新博客
    update() {
      // 验证数据
      this.$v.blog.$touch();
      if (this.$v.blog.$anyError) {
        return;
      }
      update(this.blog).then((res) => {
        if (res.data.state) {
          // this.$bvToast.toast(res.data.msg, {
          //   variant: "success",
          //   solid: true,
          //   autoHideDelay: 3000,
          // });
          this.$message({ message: res.data.msg, type: "success" });
          this.$refs["close-edit-modal"].hide();
        }
      });
    },
    // 博客搜索
    searchBlog() {
      const options = {
        params: {
          title: this.title,
          startDate: this.startDate,
          endDate: this.endDate,
          pageSize: this.pages.pageSize,
          pageNo: this.pages.pageNo,
        },
      };
      searchPriBlog(options).then((resp) => {
        var res = resp.data.data
        this.pages.total = res.total;
        this.pages.pageSize = res.pageSize;
        this.pages.pageNo = res.pageNo;
        this.blogList = res.dataList;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="scss">
.m-blog-list-button-margin {
  margin-left: 1rem;
}
.blogs-input-footer {
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}
</style>