/*
 * @Author: guoxinwen
 * @Date: 2022-06-21 16:59:42
 * @LastEditors: guoxinwen
 * @LastEditTime: 2022-06-24 18:04:07
 * @Description: 首页内容中的一些请求体
 */
import request from '../utils/fetch';

/**
 * @Author: guoxinwen
 * @description: 首页信息的请求
 * @return {*}
 */

export function indexInfo() {
    return request('/ussa/project/explore/info')
}

/**
 * @Author: guoxinwen
 * @description: project explorer 模块的数据
 * @return {*}
 */

export type projectExplorerParam = {
    param: string
    platform: string,
    page_num: number,
    page_size: number
}
export function projectExplorerList(params: projectExplorerParam) {
    return request('/ussa/project/explore/list', { params, method: 'POST' })
}

/**
 * @Author: guoxinwen
 * @description: security news 模块
 * @return {*}
 */
 export type securityNewsParam = {
    project_id: number | string,
    page_num: number,
    page_size: number
}
export function securityNewsList(params: securityNewsParam) {
    return request('/ussa/opinion/list', { params, method: 'POST' })
}
