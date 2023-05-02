import { defineAsyncComponent } from 'vue'

const menu: MenuItem[] = [
  {
    key: '0',
    name: '选择模型',
    icon: 'icon-model_choose',
    viewConfig: {
      title: '',
      component: defineAsyncComponent(() => import('@/components/jiaxing/left.vue')),
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '1',
    name: '时间设置',
    icon: 'icon-time_choose',
    viewConfig: {
      title: '',
      component: defineAsyncComponent(() => import('@/components/model-manager/TimeSetting.vue')),
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '2',
    name: '预报降水',
    icon: 'icon-rainfall',
    viewConfig: {
      title: '',
      component: defineAsyncComponent(() => import('@/components/model-manager/RainForecast.vue')),
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '3',
    name: '工程调度',
    icon: 'icon-project_scheduling',
    viewConfig: {
      title: '',
      component: '',
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '4',
    name: '启动计算',
    icon: 'icon-calculate',
    viewConfig: {
      title: '',
      component: '',
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '5',
    name: '调度方案图层',
    icon: 'icon-library',
    viewConfig: {
      title: '',
      component: defineAsyncComponent(() => import('@/components/model-manager/DispatchLibrary.vue')),
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '6',
    name: '调度预案',
    icon: 'icon-plan',
    viewConfig: {
      title: '调度预案',
      type: 'modal',
      component: defineAsyncComponent(() => import('@/components/model-manager/DispatchSchedule.vue')),
      props: {
        width: '600px'
      }
    }
  },
  {
    key: '7',
    name: '方案对比',
    icon: 'icon-contrast',
    viewConfig: {
      title: '',
      component: '',
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  },
  {
    key: '8',
    name: '风险统计',
    icon: 'icon-risk_statistics',
    viewConfig: {
      title: '',
      component: defineAsyncComponent(() => import('@/components/model-manager/RiskStatistic.vue')),
      props: {
        width: '300px',
        collapsedWidth: '0'
      }
    }
  }
]

export default menu
