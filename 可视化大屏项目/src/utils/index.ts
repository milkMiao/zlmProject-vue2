import qs from 'qs'
import { querySpatialTable } from '@/request/services'
import { valueTypeEnum } from '@/dictionary'

interface StyleConfig {
  value?: string
  linewidth?: string
  linedash?: string
  transparent?: string
  fillcolor?: string
  strokecolor?: string
  iconname?: string
  iconsize?: string
  radius?: string
  offset_x?: string
  offset_y?: string
}

interface LabelConfig {
  value: string
  offset_x: string
  size: string
  offset_y: string
  position: string
  color: string
  zoommin: string
  zoommax: string
}

interface OtherParams {
  coor?: '4326' | '3857'
  geofield?: string
  savepng?: 'yes' | 'no'
  dir?: string
  begintime?: string
  where?: string
  labelfield?: string
  lablefieldtype?: 'string' | 'number'
  labletype?: 'one' | 'multi'
  stylefield?: string
  stylefieldtype?: 'string' | 'number'
  styletype?: 'one' | 'multi'
  icontype?: 'img' | 'circle' | 'square'
}

interface Params extends OtherParams {
  tablename: string
  geomtype: GeomType
  x: string
  y: string
  z: string
  dir: string
  styleconfig?: string
  labelconfig?: string
}

//TODO: 生成切片样式调整
function lightServerTileStyle(style: any) {
  if (Array.isArray(style)) {
    //TODO:分类暂时不做
  } else {
    //颜色或图标
    if (style.type === 'color') {
      const values = getRGBAFromString(style.symbol.color) as any[]
      const fillColorArr = [values[0], values[1], values[2]]

      const transparent = values[3] ?? 1

      return {
        fillcolor: fillColorArr.join('-'),
        transparent
      }
    } else {
      return {
        iconname: style.symbol.file_name
      }
    }
  }
}

function getLightMapServer(tablename: string, geomtype: GeomType, otherParams: OtherParams = {}, styleconfig: Array<StyleConfig> = [], labelconfig: Array<LabelConfig> = []) {
  const params: Params = {
    tablename,
    x: '{x}',
    y: '{y}',
    z: '{z}',
    dir: tablename,
    geomtype,
    savepng: 'yes',
    coor: '4326',
    geofield: 'geom',
    ...otherParams
  }

  if (styleconfig.length) {
    params.styleconfig = styleconfig.join('|')
  }

  if (labelconfig.length) {
    params.labelconfig = labelconfig.join('|')
  }

  return `/tile/?${qs.stringify(params)}`
}

//根据表名获取LightMapServer地址
async function getLightMapServerUriByTableName(tablename: string) {
  const data = await querySpatialTable(tablename)

  return data.map(singleTable => {
    const { f_table_name: tablename, f_geom_column: geomfield, srid: coor, geomtype } = singleTable
    return {
      key: getUUID(),
      show: true,
      name: tablename,
      tablename,
      url: getLightMapServer(tablename, geomtype, {
        coor,
        geomfield,
        dir: tablename
      })
    }
  })
}

function getUUID() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i: number = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  const uuid = s.join('')
  return uuid
}

/**
 * @description: 文件下载
 * @param {*}
 * @return {*}
 */
function createDownloadExcelUrlByTableName(
  tablename: string,
  fieldsArr: any[] = [], //string类型
  filename: string = ''
) {
  const fields = fieldsArr.length > 0 ? fieldsArr.join(',') : '*'

  return `/api/service/download/excel?${qs.stringify({
    tablename,
    fields,
    filename: filename ?? tablename
  })}`
}

function downloadFile(url: string) {
  let linkDOM = document.createElement('a')
  linkDOM.style.display = 'none'
  linkDOM.href = url
  document.body.appendChild(linkDOM)
  linkDOM.click()
  document.body.removeChild(linkDOM)
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
export function getQueryVariable(variable: string, url: string = window.location.href) {
  var query = url.split('?')
  if (query.length >= 2) {
    const search = query[1]
    var vars = search.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
  }
  return ''
}

function getTableColCompareFunc(dataIndex: string, type: string): Function {
  if (valueTypeEnum[type] === 'text') {
    return (x, y) => {
      return x[dataIndex].localeCompare(y[dataIndex])
    }
  } else {
    return (x, y) => {
      return x[dataIndex] - y[dataIndex]
    }
  }
}

function getTableColFilterFunc(dataIndex: string) {
  return (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
}

function getRGBAFromString(rgba: string): RegExpMatchArray | null {
  let values = rgba.match(/(\d(\.\d+)?)+/g)
  return values
}

export { getUUID, getLightMapServer, lightServerTileStyle, downloadFile, createDownloadExcelUrlByTableName, getLightMapServerUriByTableName, getTableColCompareFunc, getTableColFilterFunc, getRGBAFromString }
