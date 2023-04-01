<template>
  <button
    class="a-button"
    :disabled="disabled"
    :class="[theme, isBorder, isRound, sizes]"
    :style="minWidthCss"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Abutton",
  props: {
    type: {
      //主题色
      type: String,
      default: "",
    },
    border: Boolean, //是否需要边框,默认false
    round: Boolean, //是否圆角,默认false
    disabled: Boolean, //是否禁用,默认false
    size: {
      //按钮大小
      type: String,
      default: "",
    },
    minWidth: {//弹性宽度
      //按钮大小
      type: String,
      default: "",
    },
  },
  computed: {
    theme() {
      console.log(this.type);
      return this.type ? `a-button-${this.type}` : "";
    },
    isBorder() {
      return this.border ? "is-border" : "";
    },
    isRound() {
      return this.round ? "is-round" : "";
    },
    sizes() {
      return this.size ? `a-button-${this.size}` : "";
    },
    minWidthCss() {
      if(!this.minWidth) return ""
      return {'min-width': this.minWidth}
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.a-button {
  //默认样式
  padding: 0 20px;
  border-width: 1px;
  border-style: solid;
  border-color: #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  font-size: 14px;
  color: #606266;
  height: 40px;
}
.a-button-medium {
  //size中型
  height: 36px;
}
.a-button-small {
  //size小型
  padding: 0 15px;
  height: 32px;
  font-size: 12px;
}
.a-button-mini {
  //size迷你型
  padding: 0 15px;
  height: 28px;
  font-size: 12px;
}
.a-button[disabled] {
  //禁用样式
  opacity: 0.5;
  cursor: not-allowed;
}
.a-button-primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  &.is-border {
    //边框样式
    background-color: transparent;
    color: #409eff;
  }
}
.a-button-success {
  background-color: #00d100;
  border-color: #00d100;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #00d100;
  }
}
.a-button-warning {
  background-color: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #e6a23c;
  }
}
.a-button-danger {
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
  &.is-border {
    background-color: transparent;
    color: #f56c6c;
  }
}

/**圆角*/
.is-round {
  //圆角样式
  border-radius: 100px;
}
</style>