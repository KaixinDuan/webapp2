import request from '../utils/request'
export function addCase(params) {
    return request({
      url: '/api/qxcgrqr/Process?type=caseinfo&operation=add',
      method: 'post',
      data: params
    })
  }