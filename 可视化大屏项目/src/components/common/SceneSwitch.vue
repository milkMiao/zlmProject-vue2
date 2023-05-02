<script setup lang="ts">
import { withDefaults, ref } from "vue";
import { mapController } from "@/controller";

const props = withDefaults(
  defineProps<{
    collapsed: boolean;
    defaultScene?: string;
  }>(),
  {
    defaultScene: "2D",
  }
);

const sceneMode = ref(props.defaultScene);

const changeSceneMode = () => {
  sceneMode.value = sceneMode.value === "3D" ? "2D" : "3D";
  mapController.changeSceneMode(sceneMode.value);
};
</script>

<template>
  <div class="scene-switch" @click="changeSceneMode">
    <span :class="['scene-mode-text', sceneMode === '3D' ? 'blink' : '']">
      <i :class="['icon', sceneMode === '3D' ? 'icon-d' : 'icon-dd']"></i>
    </span>
  </div>
</template>

<style scoped>
.scene-switch {
  height: 40px;
  cursor: pointer;
  color: #fff;
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-mode-text {
  font-size: 30px;
}

.blink {
  animation: twinkle 0.8s infinite alternate;
}

@keyframes twinkle {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
