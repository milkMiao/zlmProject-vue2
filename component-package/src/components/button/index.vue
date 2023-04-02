<template>
  <button
    class="a-button"
    :disabled="disabled || loading"
    :class="[theme, isBorder, isRound, sizes, blockCss]"
    :style="minWidthCss"
  >
    <span>
      <i v-if="loading" class="iconfont icon-perfix icon-jiazai1"></i>
      <i v-if="perfix" class="iconfont icon-perfix" :class="iconPerfix"></i>
      <slot></slot>
      <i v-if="suffix" class="iconfont icon-suffix" :class="iconSuffix"></i>
    </span>
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
    block: Boolean, //块级block
    loading: Boolean, //加载效果
    size: {
      // medium、small、mini
      //按钮大小
      type: String,
      default: "",
    },
    minWidth: {
      //弹性宽度
      type: String,
      default: "",
    },
    perfix: {
      //icon前缀图标
      type: String,
      default: "",
    },
    suffix: {
      //icon后缀图标
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
      if (!this.minWidth) return "";
      return { "min-width": this.minWidth };
    },
    iconPerfix() {
      return this.perfix ? `icon-${this.perfix}` : "";
    },
    iconSuffix() {
      return this.suffix ? `icon-${this.suffix}` : "";
    },
    blockCss() {
      return this.block ? "a-button-block" : "";
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
  + .a-button {
    margin-left: 10px;
  }
  > span {
    //弹性布局--使icon水平线一致
    display: flex;
    align-items: center;
    justify-content: center;
  }

  i {
    width: 14px;
    height: 14px;
  }
  .icon-perfix {
    margin-right: 10px;
  }
  .icon-suffix {
    margin-left: 10px;
  }
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
  .icon-perfix {
    margin-right: 5px;
  }
  .icon-suffix {
    margin-left: 5px;
  }
}
.a-button-mini {
  //size迷你型
  padding: 0 15px;
  height: 28px;
  font-size: 12px;
  .icon-perfix {
    margin-right: 5px;
  }
  .icon-suffix {
    margin-left: 5px;
  }
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

/*块级block*/
.a-button-block {
  display: block;
  width: 100%;
}

/*加载效果*/
.icon-jiazai1 {
    animation: rotate 2s infinite linear;
}
@keyframes rotate{
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>