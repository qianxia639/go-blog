<template>
  <div>
    <b-container style="margin-top: 2vh">
      <div class="d-flex flex-row-reverse">
        <b-button-group>
          <b-button to="/blogs/blogInput" active variant="outline-info"
            >发布</b-button
          >
          <b-button to="/blogs/blogList" variant="outline-info">列表</b-button>
        </b-button-group>
      </div>
    </b-container>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col style="margin-top: 5vh" offset-md="1" md="10">
          <b-card>
            <b-form>
              <!-- 描述 -->
              <b-input-group>
                <b-form-textarea
                  v-model.trim="$v.blog.description.$model"
                  autofocus
                  placeholder="请输入描述内容(100字以内)"
                  no-resize
                  class="pre-scrollabl"
                  :state="validateState('description')"
                >
                </b-form-textarea>
              </b-input-group>
              <!-- 标题 -->
              <b-input-group>
                <b-form-input
                  style="margin-top: 1vh"
                  v-model.trim="$v.blog.title.$model"
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
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"
                  @save="uploadImg"
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
              <!-- 分类 -->
              <span>选择分类:</span>
              <b-input-group>
                <b-form-select
                  v-model="$v.blog.typeId.$model"
                  :state="validateState('typeId')"
                >
                  <template v-slot:first>
                    <b-form-select-option value="" disabled
                      >-- 请选择分类 --</b-form-select-option
                    >
                  </template>
                  <b-form-select-option
                    v-for="(item, index) in typeOptions"
                    :key="index"
                    :label="item.typeName"
                    :value="item.id"
                    >{{ item.typeName }}</b-form-select-option
                  >
                </b-form-select>
              </b-input-group>
              <!-- 标签 -->
              <b-form-group
                label="使用下拉菜单选择标签:"
                description="该选项在博客提交之后将无法更改,请慎重选择"
              >
                <b-form-tags
                  v-model="$v.blog.tags.$model"
                  no-outer-focus
                  class="mb-2"
                  :state="validateState('tags')"
                >
                  <template v-slot="{ tags, disabled, addTag, removeTag }">
                    <ul
                      v-if="tags.length > 0"
                      class="list-inline d-inline-block mb-2"
                    >
                      <li
                        v-for="tag in tags"
                        :key="tag"
                        class="list-inline-item"
                      >
                        <b-form-tag
                          v-model="blog.tags"
                          @remove="removeTag(tag)"
                          :title="tag"
                          :disabled="disabled"
                          variant="info"
                          >{{ tag }}</b-form-tag
                        >
                      </li>
                    </ul>

                    <b-dropdown
                      size="sm"
                      variant="outline-secondary"
                      block
                      menu-class="w-100"
                    >
                      <template v-slot:button-content>
                        <b-icon icon="tag-fill"></b-icon> 选择标签
                      </template>
                      <b-dropdown-form @submit.stop.prevent="() => {}">
                        <b-form-group
                          label-for="tag-search-input"
                          label="标签搜索"
                          label-cols-md="auto"
                          class="mb-0"
                          label-size="sm"
                          :description="searchDesc"
                          :disabled="disabled"
                        >
                          <b-form-input
                            v-model="search"
                            id="tag-search-input"
                            type="search"
                            size="sm"
                            autocomplete="off"
                          ></b-form-input>
                        </b-form-group>
                      </b-dropdown-form>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item-button
                        v-for="option in availableOptions"
                        :key="option"
                        v-model="blog.tags"
                        @click="onOptionClick({ option, addTag })"
                      >
                        {{ option }}
                      </b-dropdown-item-button>
                      <b-dropdown-text v-if="availableOptions.length === 0">
                        没有可供选择的标签
                      </b-dropdown-text>
                    </b-dropdown>
                  </template>
                </b-form-tags>
              </b-form-group>

              <div style="margin-top: 1vh" class="footer-button">
                <b-button onclick="history.go(-1)">返回</b-button>
                <b-button
                  @click="saveBlog"
                  style="margin-left: 1rem"
                  variant="info"
                  >发布</b-button
                >
              </div>
            </b-form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { typeList } from "@/api/example/typeApi";
import { tagList } from "@/api/example/tagApi";
import { saveBlog } from "@/api/example/blogApi";
import { uploadFile } from "@/api/system/uploadApi";
import "github-markdown-css/github-markdown.css";
export default {
  name: "Markdown",
  components: {
    mavonEditor,
  },
  data() {
    return {
      typeOptions: [],
      blog: {
        description: "",
        title: "",
        content: "",
        flag: "",
        typeId: "",
        tags: [],
      },
      tagOptions: [],
      search: "",
      img_file: {},
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
        maxLength: maxLength(20),
      },
      flag: {
        required,
      },
      typeId: {
        required,
      },
      tags: {
        required,
      },
    },
  },
  computed: {
    criteria() {
      // 搜索条件
      return this.search.trim().toLowerCase();
    },
    availableOptions() {
      const criteria = this.criteria;
      // 过滤掉已选择的标签
      const options = this.tagOptions.filter(
        (opt) => this.blog.tags.indexOf(opt) === -1
      );
      if (criteria) {
        // 显示符合要求的标签
        return options.filter(
          (opt) => opt.toLowerCase().indexOf(criteria) > -1
        );
      }
      // 显示所有可选的标签
      return options;
    },
    searchDesc() {
      if (this.criteria && this.availableOptions.length === 0) {
        return "没有搜索到相符的标签";
      }
      return "";
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.blog[name];
      return $dirty ? !$error : null;
    },
    // 获取分类列表
    getTypeList() {
      typeList().then((res) => {
        this.typeOptions = res.data.data.type;
      });
    },
    // 获取标签列表
    getTagList() {
      tagList().then((res) => {
        this.tagOptions = res.data.data.tag;
      });
    },
    // 发布博客
    saveBlog() {
      // 验证数据
      this.$v.blog.$touch();
      if (this.$v.blog.$anyError) {
        return;
      }
      saveBlog(this.blog)
        .then((res) => {
          if (res.data.state) {
            this.uploadImg()
            // this.$router.replace({ name: "Index" });
            this.$message({ message: "发布成功", type: "success" });
          }
        })
        .catch((err) => {
          // this.$bvToast.toast(err.response.data.msg, {
          //   title: "数据验证错误",
          //   variant: "danger",
          //   solid: true,
          // });
          this.$message({ message: err.response.data.msg, type: "error" });
        });
    },
    onOptionClick({ option, addTag }) {
      addTag(option);
      this.search = "";
    },

    //
    $imgAdd(pos, $file) {
      // 缓存图片信息
      this.img_file[pos] = $file;
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    uploadImg(pos) {
      // 将图片上传到服务器
      let formData = new FormData();
      for (var _img in this.img_file) {
        formData.append(_img, this.img_file[_img]);
      }
      uploadFile(formData).then((res) => {
        for (var img in res.data.url) {
          this.$refs.md.$img2Url(pos,res.data.url[img]);
        }
      });
    },
    //图片上传
    // $imgAdd(pos, $file) {
    //   let formData = new FormData();
    //   formData.append("file", $file);
    //   uploadFile(formData).then((res) => {
    //     this.$refs.md.$img2Url(pos, res.data.url);
    //   });
    // },
  },
  created() {
    this.getTypeList();
    this.getTagList();
  },
};
</script>

<style lang="scss">
.footer-button {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
}
.tag-priority {
  z-index: 9 !important;
}
</style>