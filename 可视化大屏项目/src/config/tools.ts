import { defineAsyncComponent } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const tools: MenuItem[] = [
  {
    key: "0",
    name: "搜索",
    icon: SearchOutlined,
    viewConfig: {
      component: "",
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "1",
    name: "属性",
    icon: "icon-attribute",
    viewConfig: {
      component: defineAsyncComponent(
        () => import("@/components/bi-components/MapSymbol.vue")
      ),
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "2",
    name: "筛选",
    icon: "icon-shape_filter",
    viewConfig: {
      component: "",
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "3",
    name: "底图",
    icon: "icon-map",
    viewConfig: {
      component: defineAsyncComponent(
        () => import("@/components/bi-components/BaseMapToggle.vue")
      ),
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "4",
    name: "测量",
    icon: "icon-measure",
    viewConfig: {
      component: defineAsyncComponent(
        () => import("@/components/bi-components/Measure.vue")
      ),
      props: {
        width: "0px",
      },
    },
  },
  {
    key: "5",
    name: "时态",
    icon: "icon-time_change",
    viewConfig: {
      component: "",
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "6",
    name: "分屏",
    icon: "icon-split_screen",
    viewConfig: {
      component: "",
      props: {
        width: "300px",
      },
    },
  },
  {
    key: "7",
    name: "卷帘",
    icon: "icon-rolling_screen",
    viewConfig: {
      component: defineAsyncComponent(
        () => import("@/components/bi-components/RollScreen.vue")
      ),
      props: {
        width: "0",
      },
    },
  },
  {
    key: "8",
    name: "导出",
    icon: "icon-export",
    viewConfig: {
      component: defineAsyncComponent(
        () => import("@/components/bi-components/ImageExport.vue")
      ),
      props: {
        width: "0",
      },
    },
  },
];

export default tools;
