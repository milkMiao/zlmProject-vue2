import { requestService } from './request'
import qs from 'qs'

//1. 获取表格字段
export function getTablefield(tablename: string, otherParams = {}) {
  return requestService({
    url: '/api/service/tablefield',
    method: 'get',
    params: {
      tablename,
      ...otherParams
    }
  })
}

//2.查询表格元数据
export function queryTableMeta(tablename: string, otherParams = {}) {
  return requestService({
    url: '/api/query',
    method: 'get',
    params: {
      tablename,
      ...otherParams
    }
  })
}

//3.空间查询
export function extentSearch(tablename: string, otherParams = {}) {
  return requestService({
    url: '/api/spatial_query',
    method: 'get',
    params: {
      tablename,
      ...otherParams
    }
  })
}

//4. 文件上传 TODO:
export function uploadFile(file: File) {
  return requestService({
    url: '/api/upload',
    method: 'get',
    data: {
      file
    }
  })
}

//5. 空间表查询
export function querySpatialTable(tablename?: string) {
  const params = tablename ? { tablename } : {}
  return requestService({
    url: '/api/service/spatial_table',
    method: 'get',
    params
  })
}

//6.表获取
export function queryTables() {
  return requestService({
    url: '/api/service/table',
    method: 'get'
  })
}

//7.图标获取
export function queryICON() {
  return requestService({
    url: '/api/service/img',
    method: 'get'
  })
}

//8.资源获取
export function queryResource() {
  return requestService({
    url: '/api/service/resource',
    method: 'get'
  })
}

//9.支持fme服务调用
export function excuteFMEService(tablename: string) {
  //http://47.100.229.195:8090/fmedatastreaming/service/job_service.fmw?job_timestamp=20220319&table_name=loc0319
  return requestService({
    url: `/fme/fmedatastreaming/service/job_service.fmw?job_timestamp=${new Date().getTime()}&table_name=${tablename}`,
    method: 'get'
  })
}

export function qureyLocFiles() {
  return requestService({
    url: '/api/service/loc',
    method: 'get'
  })
}

/**
 *
 * @param locfilename loc文件名称
 * @param loctablename 方案名称
 * @returns
 */
export function registerLocFile(locfilename: string, loctablename: string) {
  return requestService({
    url: `/api/loc`,
    method: 'get',
    params: {
      locfilename,
      loctablename
    }
  })
}

// shp文件解压缩
export function unzipShp(zipfilename: string) {
  return requestService({
    url: `/api/shp`,
    method: 'get',
    params: {
      zipfilename
    }
  })
}
// shp文件解压入库
export function shpImportDB(shp_path: string, table_name: string) {
  const tmp = {
    shp_path,
    table_name
  }
  let params = qs.stringify(tmp, { indices: false })
  params = decodeURIComponent(params)
  return requestService({
    url: `/fme/fmedatastreaming/service/read_shp_to_pg.fmw?` + params,
    method: 'get'
  })
}
export function queryTableField(tablename: string, fieldname: string) {
  return requestService({
    url: `api/service/field_detail`,
    method: 'get',
    params: {
      tablename,
      fieldname
    }
  })
}
