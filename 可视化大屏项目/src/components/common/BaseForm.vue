<template>
  <a-form ref="formModelRef" class="form" layout="inline" :labelAlign="labelAlign" :rules="rules" :model="model" v-bind="itemLayout">
    <a-form-item v-for="item in form" :colon="item.colon === false ? false : true" :key="item.key" :title="item.disabled ? model[item.key] : ''" :class="layout" :help="item.help" :name="item.key" :style="comFormItemStyle(item)" :label="item.label" @click="setCurrentItem(item)">
      <template v-if="item.type === 'text'">
        <span>{{ model[item.key] }}</span>
      </template>
      <template v-if="item.type === 'input' || item.type === 'password'">
        <a-input :value="comValue(item)" size="small" :autoSize="item.autosize" :type="item.type" :maxLength="item.maxLength" :disabled="item.disabled" :placeholder="item.placeholder" @update:value="updateVal" />
        <span v-if="item.maxLength" style="position: absolute; right: 30px">{{
          comInputLength(item)
        }}</span>
      </template>
      <template v-if="item.type === 'textarea'">
        <a-textarea v-model:value="model[item.key]" size="small" :autoSize="item.autosize" :type="item.type" allowClear :maxLength="item.maxLength" :disabled="item.disabled" :placeholder="item.placeholder" />
        <span v-if="item.maxLength" style="position: absolute; right: 30px">{{
          comInputLength(item)
        }}</span>
      </template>
      <template v-else-if="item.type === 'select'">
        <a-select v-model:value="model[item.key]" size="small" :mode="item.mode" :filterOption="item.filterOption" :showSearch="item.showSearch" :disabled="item.disabled" allowClear @search="handleSelChange(item, $event)">
          <a-select-option v-for="opt in item.options" :key="opt.key">
            {{ opt.label }}
          </a-select-option>
        </a-select>
      </template>
      <template v-else-if="item.type === 'date'">
        <a-date-picker v-model:value="model[item.key]" size="small" show-time style="width: 100%" allowClear :valueFormat="item.valueFormat" :disabled="item.disabled" :mode="item.mode" :placeholder="item.placeholder" />
      </template>
      <template v-else-if="item.type === 'radio'">
        <a-radio-group v-model:value="model[item.key]" size="small" :disabled="item.disabled">
          <a-radio v-for="opt in item.options" :key="opt.key" :disabled="opt.disabled" :value="opt.key">
            {{ opt.label }}
          </a-radio>
        </a-radio-group>
      </template>
      <template v-else-if="item.type === 'checkbox'">
        <a-checkbox-group v-model:value="model[item.key]" size="small" :disabled="item.disabled">
          <a-checkbox v-for="opt in item.options" :key="opt.key" :value="opt.key">
            {{ opt.label }}
          </a-checkbox>
        </a-checkbox-group>
      </template>
      <template v-else-if="item.type === 'search'">
        <a-input-search v-model="model[item.key]" size="small" :disabled="item.disabled" :placeholder="item.placeholder" allowClear :enter-button="item.searchText" @search="item.searchFn" />
      </template>
      <template v-else-if="item.type === 'switch'">
        <a-switch v-model:checked="model[item.key]" :disabled="item.disabled" />
      </template>
      <!-- <template v-else-if="item.type==='codeMirror'">
        <base-code-mirror v-model:value="model[item.key]" height="200px" />
      </template> -->
      <template v-else-if="item.type === 'upload'">
        <a-upload :accept="item.accept" :remove="fileRemove" :beforeUpload="beforeUpload" :name="item.name" :multiple="item.multiple || false" :fileList="model[item.key] || []" @change="fileChange($event, item)">
          <a-button>选择文件</a-button>
        </a-upload>
        <slot name="uploadSlot" />
      </template>
      <template v-else-if="item.type === 'slot'">
        <slot :name="item.key" />
      </template>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { message, Modal } from "ant-design-vue";
import { computed, nextTick, Ref, ref } from "vue";
import { arrObjRemoveEle } from "@/utils";
// interface Props {
//   layout: string
//   colNum: number
//   itemLayout: object
//   model: Object
//   form: Array<any>
//   rules: Object
// }
// // const props = defineProps<Props>
// const props =withDefaults(defineProps<Props>(), {
//   layout: 'horizontal',
//   colNum: 1,
//   itemLayout: () => {
//     return {
//       labelCol: { span: 4 },
//       wrapperCol: { span: 14 }
//     }
//   },
//   rules: ()=>{
//     return {}
//   }
// })
const formModelRef = ref();
defineExpose({
  validate: validate,
  resetFields: resetFields,
  customReset: customReset,
});
const emit = defineEmits<{
  (event: "handleSelChange", data: any, value: string): void;
  (event: "beforeUpload", data: Array<any>): void;
}>();
const props = defineProps({
  labelAlign: {
    type: String,
    default: () => "right",
  },
  layout: {
    type: String,
    default: () => "horizontal",
  },
  colNum: {
    type: Number,
    default: 1,
  },
  model: {
    type: Object,
    default: () => { },
  },
  form: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => { },
  },
  itemLayout: {
    type: Object,
    default: () => {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    },
  },
});
// console.log(props, '================')
const comValue = computed(() => {
  return (item) => {
    if (item?.key) {
      const arr = item.key.split(".");
      if (arr.length > 1) {
        return props.model[arr[0]][arr[1]];
      } else {
        return props.model[arr[0]];
      }
    }
    return "";
  };
});
const currentItem: Ref<any> = ref({});
let timer: any = null;
const comFormItemStyle = computed(() => {
  return (item) => {
    const style: any = {};
    if (item.width) {
      style.width = item.width;
    } else {
      const itemWidth = `calc(${100 / props.colNum}% - ${16 * (props.colNum - 1)
        }px)`;
      style.width = itemWidth;
    }
    return style;
  };
});
const comInputLength = computed(() => {
  return (data) => {
    const val = props.model[data.key];
    let str = `0/${data.maxLength}`;
    if (val) {
      str = val.length + "/" + data.maxLength;
    }
    return str;
  };
});
function updateVal(data) {
  const item = currentItem.value;
  const arr = item.key.split(".");
  if (arr.length > 1) {
    props.model[arr[0]][arr[1]] = data;
  } else {
    props.model[arr[0]] = data;
  }
}
function customReset(model: any, data: any, type: string) {
  if (type === "reset") {
    for (const key in model) {
      if (Object.prototype.toString.call(model[key]) === "[object String]") {
        model[key] = "";
      } else if (
        Object.prototype.toString.call(model[key]) === "[object Array]"
      ) {
        model[key] = [];
      } else if (
        Object.prototype.toString.call(model[key]) === "[object Object]"
      ) {
        model[key] = {};
      }
    }
    nextTick(() => {
      formModelRef.value.clearValidate();
    });
  } else {
    for (const key in model) {
      model[key] = data[key];
    }
  }
}
function setCurrentItem(data) {
  currentItem.value = data;
}
function handleSelChange(data, value) {
  if (data.showSearch) {
    emit("handleSelChange", data, value);
  }
}
function validate() {
  return formModelRef.value
    .validate()
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}
function resetFields() {
  formModelRef.value.resetFields();
}
function fileRemove(file: File) {
  const filelist = props.model[currentItem.value.key];
  arrObjRemoveEle(filelist, "uid", file.uid);
}
function beforeUpload(file, fileList) {
  if (timer) {
    clearTimeout(timer);
    timer = null;
    return false;
  }
  timer = setTimeout(() => {
    props.model[currentItem.value.key] = [];
    if (currentItem.value.accept) {
      const arr = currentItem.value.accept.split(",");
      fileList.forEach((element) => {
        if (arr.includes(element.type)) {
          props.model[currentItem.value.key].push(element);
        } else {
          message.warn(element.name + "文件格式不正确，请重新选择！");
        }
      });
    } else {
      props.model[currentItem.value.key] = fileList;
    }
    emit("beforeUpload", props.model[currentItem.value.key]);
    clearTimeout(timer);
    timer = null;
  }, 1000);
  return false;
}
function fileChange(params: any, item: any) {
  // console.log(2)
  // console.log('=====change====', params)
  // if (item.accept) {
  //   const arr = item.accept.split(',')
  //   if (arr.includes(params.file.type)) {
  //     props.model[item.key].push(params.file)
  //   }else{
  //     message.warn('文件格式不正确，请重新选择！')
  //   }
  // } else {
  //   props.model[item.key] = params.fileList
  // }
}
</script>

<style scoped lang="scss">
.form {
  overflow-x: hidden;
}
.form :deep(.ant-form-item) {
  // margin-bottom: 12px;
  .ant-form-item-label {
    flex: 1;
    > label {
      color: white;
    }
  }

  .ant-input-textarea-clear-icon {
    margin: 8px 10px 0 0;
  }
}
.form :deep(.ant-form-item-with-help) {
  margin-bottom: 12px;
}
.vertical {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
}
.vertical :deep(.ant-form-item-label) {
  text-align: left;
}
</style>
