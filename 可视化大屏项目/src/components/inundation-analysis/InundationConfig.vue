<template>
  <dv-border-box-13 v-show="visible" ref="innundationRef" class="custom-modal">
    <div dv-bg>
      <div class="inundation-config">
        <Form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off">
          <CustomFormItems :showDivider="true" :formState="formState" :groups="inundationAnalysisFormConfig" />
        </Form>
        <div style="text-align:center;">
          <Button style="margin-top:20px;" type="primary" shape="round" ghost @click="cancelModal" :loading="loading">
            取消
          </Button>
          <Button style="margin-top:20px;margin-left:20px;" type="primary" shape="round" ghost @click="submit" :loading="loading">
            确认
          </Button>
        </div>
      </div>
    </div>
  </dv-border-box-13>
</template>
<script lang="ts" setup>
import { ref, defineExpose, defineProps, watch, onMounted, getCurrentInstance, toRaw } from "vue";
import { Select, Input, Divider, Form, FormItem, Switch, Button } from "ant-design-vue";
import { inundationAnalysisFormConfig } from "./config";
import CustomFormItems from "./components/CustomFormItems.vue";

const spinning = ref(false);
defineExpose({
  submit,
});
const props = defineProps<{
  checkedLoc: any,
  visible: boolean
}>();
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
}>()


const ins = getCurrentInstance()
const useForm = Form.useForm;
const formState = ref<any>({
  deleteGrade: true,
  name: props?.checkedLoc?.name ?? "",
});
const innundationRef = ref()

watch(
  () => props.checkedLoc,
  () => {
    formState.value.name = props.checkedLoc.name;
  }
);

const { resetFields, validate, validateInfos } = useForm(
  formState,
  {},
  {
    onValidate: (...args) => console.log(...args),
  }
);
onMounted(() => {
  document.querySelector('#app')?.appendChild(innundationRef.value.$el)
})
function submit() {
  validate()
    .then(() => {
      ins?.parent?.setupState.analysis(formState)
    })
    .catch((err) => {
      console.log("error", err);
    });
}
function cancelModal() {
  emit('update:visible', false)
}
function handleOk() {
  ins?.parent?.setupState.handleOk()
  // innundationRef.value.handleOk()
}

</script>

<style lang="scss" scoped>
.custom-modal {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  top: 100px;
  height: auto;
  color: white !important;
  padding: 20px;
}
</style>
