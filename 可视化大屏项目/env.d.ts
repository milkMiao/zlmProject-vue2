/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const Component: DefineComponent<{}, {}, any>
  export default Component
}
declare module 'cesium-print'
