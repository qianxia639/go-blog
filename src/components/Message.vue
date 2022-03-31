<template>
  <transition name="msgbox-fade" @after-leave="handleAfterLeave">
    <div
      :class="[
        'message_wrapper',
        { success: type === 'success' },
        { warning: type === 'warning' },
        { error: type === 'error' },
        { info: type === 'info' },
      ]"
      v-show="visible"
      :style="{ top: styleTop + 'px' }"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      // 提示消息文本
      message: "", // 类型
      type: "", // 显示/隐藏
      visible: false, // 定位高度
      styleTop: 20,
    };
  },
  methods: {
    /**
     * @description: message显示
     */
    messageShow() {
      this.visible = true;
    },
    /**
     * @description: message隐藏
     */ messageHide() {
      this.visible = false;
    },
    /**
     * @description: 销毁组件
     */ handleAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>



<style scoped lang="scss">
.message_wrapper {
  position: fixed;
  min-width: 380px;
  left: 50%;
  z-index: 99999;
  color: #fff;
  padding: 15px 15px 15px 20px;
  font-size: 14px;
  border-radius: 4px;
  top: 20px;
  transform: translateX(-50%);
  background: #fff;
  color: #909399;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  line-height: 1;
  &.success {
    background: mix(#ffffff, #67c23a, 90%);
    color: #67c23a;
  }
  &.warning {
    background: mix(#ffffff, #e6a23c, 90%);
    color: #e6a23c;
  }
  &.error {
    background: mix(#ffffff, #f56c6c, 90%);
    color: #f56c6c;
  }
  &.info {
    background: mix(#ffffff, #909399, 90%);
    color: #909399;
  }
  i {
    margin-right: 4px;
  }
}
.msgbox-fade-enter-active {
  -webkit-animation: msgbox-fade-in 0.3s;
  animation: msgbox-fade-in 0.3s;
}
.msgbox-fade-leave-active {
  -webkit-animation: msgbox-fade-out 0.3s;
  animation: msgbox-fade-out 0.3s;
}
@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(-50%, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }
}
@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(-50%, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(-50%, -20px, 0);
    opacity: 0;
  }
}
</style>
