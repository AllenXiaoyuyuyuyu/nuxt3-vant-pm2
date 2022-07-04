import Qs from 'qs'
import { Notify } from 'vant';
import CONFIG from './enums/config'
export enum ContentType {
  json = 'application/json;charset=UTF-8',
  form = 'application/x-www-form-urlencoded; charset=UTF-8',
}

export enum HttpMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE',
}

export interface IReqConfig {
  params?: any
  method?: string
  headers?: IHeader
  token?: string
  'Content-Type'?: string,
  noAlert?: boolean
}

export interface IHeader {
  'Content-Type'?: string
  'X-Requested-With'?: string
  token?: string

  [propName: string]: any
}

const request = async (
  url: string,
  config: IReqConfig = {
    params: {},
    method: 'GET',
    headers: {
      'Content-Type': ContentType.json,
      token: '',
    },
    token: '',
    'Content-Type': ContentType.json,
    noAlert: false
  },
  queryParams:boolean = false
) => {
  const { reqUrl, headers } = interceptorsRequest(url, config)
  const promise: Response = await sendRequest(reqUrl, headers, config,queryParams)
  return handleRes(promise, config)
}

/**
 * 请求拦截,这里你可以坐一些操作
 */
function interceptorsRequest(url: string, config: IReqConfig) {
  const contentType: string = setContentType(config)
  const reqUrl = setRequestUrl(url)
  const headers: Headers = setHeader(contentType, config)
  return {
    contentType,
    reqUrl,
    headers,
  }
}

/**
 * 设置contentType
 * @param config
 */
const setContentType = (config?: IReqConfig): string => {
  if (config && config['Content-Type'] !== undefined) {
    return config['Content-Type']
  } else if (config && config.method === HttpMethod.post) {
    // return ContentType.form
    return ContentType.json
  } else {
    return ContentType.json
  }
}
/**
 * 设置请求 url
 * @param url
 */
const setRequestUrl = (url: string): string => {
  if(import.meta.env.MODE == 'production' && url.indexOf('/api/') >= 0){
    return CONFIG.baseURL + url.replace('/api/', '/')
  }
  if (import.meta.env.MODE == 'development' || url.indexOf('http') == 0) {
    return url.replace('//', '/')
  }

  return CONFIG.baseURL + url.replace('//', '/')

}
/**
 * 设置请求头
 * @param contentType
 * @param config
 */
const setHeader = (contentType: string, config?: IReqConfig): Headers => {
  const token = !config || config.token === undefined ? 'sessionStorage.token' : config.token
  return new Headers({
    // 如果实例配置没传token过来的话，直接使用保存在sessionStorage的token
    // 这里假设后端直接读头文件的token字段，我直接用token当字段了，Authorization也同理
    'Content-Type': contentType,
  } as IHeader)
}

/**
 * 发送请求
 */
async function sendRequest(url: string, headers: Headers, config: IReqConfig,queryParams:boolean) {
  if (!config.method || config.method === HttpMethod.get) {
    const reqUrl = `${url}?${Qs.stringify(config.params)}` //设置参数
    const res = await fetch(reqUrl, {
      headers,
    })
    return res
  } else if (config.method === HttpMethod.post && queryParams === false) {
    const res = await fetch(url, {
      body: JSON.stringify(config.params), //设置参数
      headers,
      method: HttpMethod.post,
    })
    return res
  } else if (config.method === HttpMethod.post && queryParams === true) {
    // 某些接口是post，但是数据传参确实 query string，这里特殊处理
    const reqUrl = `${url}?${Qs.stringify(config.params)}` //设置参数
    const res = await fetch(reqUrl, {
      headers,
      method: HttpMethod.post,
    })
    return res
  }{
    const res = await fetch(url, {
      body: JSON.stringify(config.params),
      headers,
      method: config.method,
    })
    return res
  }
}

const handleRes = async (res: Response, config: IReqConfig) => {
  const parsedRes = await parseRes(res)
  // 如果res.ok，则请求成功
  if ((res.ok && parsedRes.code === '0000') || parsedRes.code === 200) {
    return parsedRes.data
  }
  // 请求失败，返回解析之后的失败的数据
  if (!config.noAlert) {
    Notify(parsedRes.msg || parsedRes.message || 'network error')
  }

  throw parsedRes
}

const parseRes = async (res: Response) => {
  const contentType = res.headers.get('Content-Type')
  let resVal
  // 判定返回的内容类型，做不同的处理
  if (contentType) {
    if (contentType.indexOf('json') > -1) {
      resVal = await res.json()
    }
    if (contentType.indexOf('text') > -1) {
      resVal = await res.text()
    }
    if (contentType.indexOf('form') > -1) {
      resVal = await res.formData()
    }
    if (contentType.indexOf('video') > -1) {
      resVal = await res.blob()
    }
  } else {
    resVal = await res.text()
  }
  return resVal
}

export default request

/*async function getMethod() {
  const getUrl: string = 'XXXX'
  try {
    const res: any = await $req(getUrl)
  } catch(e) {
    // 处理异常
  }
}*/
