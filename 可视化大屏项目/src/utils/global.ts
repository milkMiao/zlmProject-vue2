export function getStyle(obj: any, attr: any) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return (document as any).defaultView.getComputedStyle(obj, null)[attr]
  }
}
export function getArrObjItem(source: Array<any>, key: string, val: string) {
  return source.find(v => v[key] === val)
}
export function getArrObjIndex(dataList: Array<any>, key: string, val: string) {
  return dataList.findIndex(item => item[key] === val)
}
// getArrObjLastIndex (dataList:Array<any>, key:string, val:string) {
//   return dataList.findLastIndex(item => item[key] === val)
// }
export function arrObjRemoveEle(arr: Array<any>, key: string, val: string) {
  const index = arr.findIndex(item => item[key] === val)
  if (index >= 0) {
    return arr.splice(index, 1)
  } else {
    return []
  }
}
// 节流
// export function throttle(fn: Function, delay: number, immediate: boolean) {
//   let timer, context, args
//   const run = () => {
//     timer = setTimeout(() => {
//       if (!immediate) {
//         fn.apply(context, args)
//       }
//       clearTimeout(timer)
//       timer = null
//     }, delay)
//   }
//   return function (...rest) {
//     context = this
//     args = rest
//     if (!timer) {
//       if (immediate) {
//         fn.apply(context, args)
//       }
//       run()
//     }
//   }
// }
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  延迟时间，也就是阈值，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“去弹跳”了的函数
 */
export function debounce(fn, delay, ...args) {
  // 定时器，用来 setTimeout
  let timer
  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
  return function () {
    debugger
    // 保存函数调用时的上下文和参数，传递给 fn
    const context = this
    // const args = arguments

    // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 fn
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}
