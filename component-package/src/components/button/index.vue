<template>
  <button
    @click="change"
    class="a-button"
    :disabled="disabled || loading || load"
    :class="[theme, isBorder, isRound, sizes, blockCss]"
    :style="minWidthCss"
  >
    <span>
      <i v-if="loading || load" class="iconfont icon-perfix icon-jiazai1"></i>
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
    beforeChange: Function
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
    return {
        load: false
    };
  },
  methods: {
    //事件回调--调用父组件的click事件
    change(){
        console.log("change---子组件", typeof this.beforeChange, )
        if(typeof this.beforeChange === "function") {
            this.load = true
            this.beforeChange().then(response =>{
                this.load = false
                console.log("成功", response)
            }).catch(()=>{
                this.load = false
                console.log("失败")
            })
        }
        this.$emit('click');
    }
  },
};
</script>

<style lang="scss" scoped>
@import './button.scss';
</style>