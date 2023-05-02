import { message } from 'ant-design-vue'
import { useBzStore } from '../stores/index'
import { useMenuStore } from '@/stores/menu'

const bzStore = useBzStore()
const menuStore = useMenuStore()
export function getModelToken() {
  const token = bzStore.modelToken
  if (!token) {
    message.warn('请选择模型之后获取模型token!')
    menuStore.changeSelectedKeys({ selectedKeys: ['0'] })
  }
}
