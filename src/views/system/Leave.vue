<template>
  <div>
    <b-row>
      <b-col md="8">
        <b-form-input
          v-model="leave.name"
          class="top"
          placeholder="留言者..."
        ></b-form-input>
        <b-form-textarea
          v-model="leave.content"
          class="top"
          size="sm"
          no-resize
          placeholder="留言..."
        ></b-form-textarea>
        <b-button variant="info" style="margin-top: 1vh" @click="saveLeave"
          >确定</b-button
        >
        <ul class="list-unstyled">
          <b-card class="top" v-for="(item, index) in leaves" :key="index">
            <b-media tag="li">
              <h6 class="mt-0 mb-1">{{ item.name }}</h6>
              <p class="mb-0">{{ item.content }}</p>
              <b-button @click="deleteLeave(item.id)">删除</b-button>
            </b-media>
          </b-card>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { list, save, remove } from "@/api/system/leaveApi";
export default {
  data() {
    return {
      leaves: [],
      leave: {
        name: "",
        content: "",
      },
    };
  },
  methods: {
    leaveList() {
      list().then((res) => {
        this.leaves = res.data.data.leave;
      });
    },
    saveLeave() {
      save(this.leave)
        .then((res) => {
          if (res.data.state) {
            alert("发布成功");
            this.leave.name = "";
            this.leave.content = "";
          }
        })
        .catch((err) => {
          this.$message({ message: err.response.data.msg, type: "error" });
        });
    },
    deleteLeave(id) {
      if (confirm("是否要删除?")) {
        remove(id).then((res) => {
          if (res.data.state) {
            alert("删除成功");
          }
        });
      }
    },
  },
  created() {
    this.leaveList();
  },
};
</script>

<style>
.top {
  margin-top: 2vh;
}
</style>