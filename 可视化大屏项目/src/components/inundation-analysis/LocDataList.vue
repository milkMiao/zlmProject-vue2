<template>
  <div class="loc-data-list">
    <List itemLayout="horizontal" :dataSource="locList">
      <template #renderItem="{ item }">
        <ListItem :style="
            innuBzStore.checkedLoc && innuBzStore.checkedLoc.name === item.name
              ? { 'background-color': 'rgb(35 96 152)' }
              : {}
          ">
          <ListItemMeta :description="`创建时间：${item.createTime}`">
            <template #title>
              <a @click="() => handleCheckedLocFile(item)">{{ item.name }}</a>
            </template>
            <template #avatar>
              <Avatar :style="{
                  'background-color':
                    item.status === '已完成' ? '#87d068' : '#f56a00',
                }">
                {{ item.status }}
              </Avatar>
            </template>
          </ListItemMeta>
        </ListItem>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineExpose, watch } from "vue";
import { Avatar, List, ListItem, ListItemMeta } from "ant-design-vue";
import { getLocFileList } from "./services";
import { useInundationStore } from "./stores";
// import { useBzStore as useModelBzStore } from '@/components/model-manager/stores'
import moment from 'moment'
import mitter from '@/utils/bus'
import { arrObjRemoveEle } from '@/utils/global'

const locList = ref<any[]>([]);
const innuBzStore = useInundationStore();
// const modelBzStore = useModelBzStore()
mitter.on('selectModelLibrary', (e: any) => {
  const { currentData, isCheck } = e
  currentData.createTime = currentData.createTime ?? moment().format("yyyy-MM-DD HH:mm")
  currentData.name = currentData.name ?? 'loc' + moment().format('yyyyMMDDHHmmss')
  currentData.status = currentData.status ?? '未完成'
  currentData.id = currentData.id || currentData.key
  if (isCheck) {
    locList.value.push(currentData)
  } else {
    arrObjRemoveEle(locList.value, 'id', currentData.id)
  }
  // data.forEach((element: any) => {
  //   element.createTime = element.createTime ?? moment().format("yyyy-MM-DD HH:mm")
  //   element.name = element.name ?? 'loc' + moment().format('yyyyMMDDHHmmss')
  //   element.id = element.id || element.key
  //   const item = locList.value.some(ele => ele.id === element.id)
  //   if (!item) {
  //     locList.value.push(element)
  //   }
  // });
})
// watch(() => modelBzStore.selectModelLibrary, (data) => {
//   data.forEach((element: any) => {
//     element.createTime = element.createTime ?? moment().format("yyyy-MM-DD HH:mm")
//     element.name = element.name ?? 'loc' + moment().format('yyyyMMDDHHmmss')
//     element.id = element.id || element.key
//     const item = locList.value.some(ele => ele.id === element.id)
//     if (!item) {
//       locList.value.push(element)
//     }
//   });
// })
function handleCheckedLocFile(checkedItem: any) {
  innuBzStore.updateCheckedLoc(checkedItem);
}

function updateLocList() {
  return getLocFileList().then((value: any[]) => {
    locList.value = value;
  });
}

onMounted(updateLocList);

defineExpose({
  updateLocList,
});
</script>

<style lang="scss" scoped>
.loc-data-list {
  cursor: pointer;
  padding: 0px 10px;

  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;

  .ant-list-item-meta {
    align-items: center;
  }

  .ant-list-item {
    padding: 8px 12px;
    text-align: left;
    :deep(.ant-list-item-meta-title) {
      color: #fff;

      a {
        color: #fff;
      }
    }

    :deep(.ant-list-item-meta-description) {
      color: #fff;
    }
  }
}
</style>
