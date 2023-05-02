import { requestService } from '@/request/request'
import moment from 'moment'

export function getModelTokenApi() {
  return requestService({
    url: `/model_api/model/ylmodel/getToken`,
    method: 'get'
  })
}
export function returnTokenApi() {
  return requestService({
    url: `/model_api/model/ylmodel/returnToken`,
    method: 'get'
  })
}

export function getModelLatestTmApi() {
  return requestService({
    url: `/model_api/model/ylmodel/getModelLatestTm`,
    method: 'get'
  })
}
export function getResultTimeListApi() {
  return requestService({
    url: `/model_api/model/ylmodel/getResultTimeList`,
    method: 'get'
  })
}
export function hisResultExtractApi(params: any) {
  return requestService({
    url: `/model_api/model/ylmodel/downLoadLoc`,
    method: 'get',
    params
  })
}
