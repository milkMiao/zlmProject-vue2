<template>
  <div ref="timeLineRef" class="time-line">
    <div class="control">
      <base-icon icon="icon-next" @click="pre"></base-icon> <!-- 名称反了 -->
      <base-icon :icon="playIcon" @click="playerFn"></base-icon>
      <base-icon icon="icon-pre" @click="next"></base-icon> <!-- 名称反了 -->
    </div>
    <a-slider v-model:value="currentValue" :tipFormatter="tipFormatter" :step="step" :marks="marks" :max="max" :min="min">
      <template #mark="{ label, point }">
        <template v-if="point === 100">
          <strong>{{ label }}</strong>
        </template>
        <template v-else>{{ label }}</template>
      </template>
    </a-slider>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, Ref, ref, watch, onActivated } from 'vue'
import moment, { MomentInput } from 'moment'
const emits = defineEmits<{
  (event: 'change', value: Number): void
}>()
const props = defineProps({
  format: {
    type: String,
    default: () => 'MM-DD HH'
    // default: () => 20
  },
  max: {
    type: Number,
    default: () => new Date().getTime() + 24 * 60 * 60 * 1000
    // default: () => 20
  },
  min: {
    type: Number,
    default: () => new Date().getTime() - 24 * 60 * 60 * 1000
    // default: 0
  },
  step: {
    type: Number,
    default: 60 * 60 * 1000
    // default: 2
  },
  value: {
    type: Number,
    // default: 10
    default: () => new Date().getTime()
  }
})
const timeLineRef = ref()
const playIcon = ref('')
const isPlay = ref(false)
const currentValue = ref(props.value)
const marks: Ref<any> = ref({})
let timer = null as any
getMarks()
watch(isPlay, (data) => {
  if (data) {
    playIcon.value = 'icon-pause'
  } else {
    playIcon.value = 'icon-play'
  }
}, {
  immediate: true
})
watch(currentValue, () => {
  change(currentValue.value)
})
onMounted(() => {
  (document.getElementById('cesium-container') as any).appendChild(timeLineRef.value);
})
onActivated(() => {
  (document.getElementById('cesium-container') as any).appendChild(timeLineRef.value);
})
function pre() {
  if (currentValue.value <= props.min) {
    currentValue.value = props.min
  } else {
    currentValue.value -= props.step
  }
}
function next() {
  if (currentValue.value >= props.max) {
    currentValue.value = props.max
  } else {
    currentValue.value += props.step
  }
}
function playerFn() {
  isPlay.value = !isPlay.value
  if (isPlay.value) {
    clearTimer()
    next()
    timer = setInterval(() => {
      next()
      if (currentValue.value >= props.max) {
        clearTimer()
        playerFn()
      }
    }, 2000)
  } else {
    clearTimer()
  }
}
function clearTimer() {
  clearInterval(timer)
  timer = null
}
function change(val: Number) {
  emits('change', val)
}
function tipFormatter(val: MomentInput) {
  return moment(val).format(props.format)
}
function getMarks() {
  let val = props.min
  while (val < (props.max)) {
    marks.value[val] = moment(val).format(props.format)
    val = val + 5 * props.step
  }
}
</script>

<style scoped lang='scss'>
@import '../../assets/base.scss';

.time-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  height: 70px;
  bottom: 20px;
  width: 80%;
  left: 10%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0 10px;
  .control {
    // display: inline-block;
    width: 90px;
    display: flex;
    justify-content: space-between;
    :deep(.base-icon) {
      font-size: 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: all 0.3s;
      color: rgba(0, 0, 0, 0.6);
      .icon-pause {
        font-size: 28px;
      }
      .icon-play {
        font-size: 24px;
      }
      &:hover {
        color: $activeColor;
      }
    }
  }
  :deep(.ant-slider) {
    // position: absolute;
    // bottom: 20px;
    // right: 10px;
    width: calc(100% - 120px);
    .ant-slider-dot {
      height: 10px;
      width: 2px;
      margin-left: -1px;
      top: -10px;
      background: $activeColor;
      border-radius: 0;
      border: none;
      &:first-child {
        margin-left: 1px;
      }
    }
    .ant-slider-mark-text {
      white-space: nowrap;
    }
  }
}
</style>