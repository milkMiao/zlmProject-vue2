<template>
  <div class="table-container" v-if="columns && columns.length">
    <Table size="small" :columns="tableColumn" :scroll="{ x: 'max-content', ...scroll }" :loading="loading" :dataSource="dataSource" v-bind="$attrs" @resizeColumn="handleResizeColumn" bordered>
      <template #title>
        <DownloadExcel v-if="!!name" :tablename="otherProps.tablename" :filename="name" />
      </template>
      <template #customFilterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }">
        <div style="padding: 8px">
          <Input :placeholder="`搜索 ${column.title}`" :value="selectedKeys[0]" style="width: 188px; margin-bottom: 8px; display: block" @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            " @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)" />
          <Button type="primary" size="small" style="width: 90px; margin-right: 8px" @click="handleSearch(selectedKeys, confirm, column.dataIndex)">
            <template #icon>
              <SearchOutlined />
            </template>
            查询
          </Button>
          <Button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            重置
          </Button>
        </div>
      </template>
      <template #customFilterIcon="{ filtered }">
        <SearchOutlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <Space v-if="editableData[record.key]">
              <a-typography-link @click="save(record.key)">保存</a-typography-link>
              <a-popconfirm title="确定取消?" @confirm="cancel(record.key)">
                <a>取消</a>
              </a-popconfirm>
            </Space>
            <Space v-else>
              <a @click="edit(record.key)">编辑</a>
            </Space>
          </div>
        </template>
        <span v-else-if="searchText && searchedColumn === column.dataIndex">
          <template v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
            <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">
              {{ getBodyCellText(fragment, column.valueType) }}
            </mark>
            <template v-else>
              {{ getBodyCellText(fragment, column.valueType) }}
            </template>
          </template>
        </span>
        <span v-else>
          <AInput v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
          <template v-else>
            {{ getBodyCellText(text, column.valueType) }}
          </template>
        </span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { Table, Input, Space } from "ant-design-vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, reactive, watch, onMounted, watchEffect } from "vue";
import { cloneDeep } from "lodash";
import { getData } from "@/request/interceptor";
import DownloadExcel from "./DownloadExcel.vue";

const props = defineProps({
  name: String,
  scroll: {
    type: Object,
    default: () => {
      return { y: 280 };
    },
  },
  columns: Object,
  otherProps: Object,
});

const dataSource = ref([]);
const loading = ref(false);
const tableColumn = ref([]);

const searchText = ref("");
const searchedColumn = ref("");
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

const edit = (key: string) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.key)[0]
  );
};

const save = (key: string) => {
  Object.assign(
    dataSource.value.filter((item) => key === item.key)[0],
    editableData[key]
  );
  delete editableData[key];
};

const cancel = (key: string) => {
  delete editableData[key];
};

const getBodyCellText = (value: any, valueType: string) => {
  return valueType === "double" ? Number(value).toFixed(2) : value;
};

const updateDataSource = () => {
  if (!props.otherProps.tablename) {
    return;
  }
  loading.value = true;
  //TODO:默认取所有数据暂不支持分页
  getData(props.otherProps.tablename, 999999, props.otherProps.sort)
    .then((newDataSource) => {
      dataSource.value = newDataSource;
    })
    .catch(() => {
      dataSource.value = [];
    })
    .finally(() => {
      loading.value = false;
    });
};

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  searchText.value = selectedKeys[0];
  searchedColumn.value = dataIndex;
};

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true });
  searchText.value = "";
};
function handleResizeColumn(w, col) {
  col.width = w;
}

//TODO:可以对过滤的列添加该函数自动获取焦点
// onFilterDropdownVisibleChange: visible => {
//       if (visible) {
//         setTimeout(() => {
//           searchInput.value.focus();
//         }, 100);
//       }
//     },

onMounted(updateDataSource);

watch(
  () => props.name,
  () => {
    if (props.otherProps) {
      updateDataSource();
    }
  }
);
watch(() => props.columns, (data) => {
  if (data?.length) {
    data.forEach(element => {
      element.minWidth = 100
      element.maxWidth = 300
      element.width = 100
      element.resizable = true
    });
  }
}, {
  deep: true,
  immediate: true
})

watchEffect(() => {
  const newColumns = [...(props.columns ?? [])];
  if (props.otherProps?.editable) {
    newColumns.push({
      title: "操作",
      dataIndex: "operation",
      align: "center",
      width: 120,
    });
  }
  tableColumn.value = newColumns;
});
</script>

<style scoped lang="scss">
.table-container {
  ::v-deep .ant-table-title {
    text-align: right;
  }

  .highlight {
    background-color: rgb(255, 192, 105);
    padding: 0px;
  }
}
</style>
