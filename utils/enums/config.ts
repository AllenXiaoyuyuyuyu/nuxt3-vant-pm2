declare type IOption = {
  [key: string]: any
}
// 生产环境
enum productionUrl {
  baseURL = 'xxxx',
}
// 开发环境
enum developmentUrl {
  baseURL = 'xxxxx',
}



const configUrl: IOption = {
  production: productionUrl,
  development: developmentUrl,
}

export default configUrl[String(import.meta.env.VITE_USER_NODE_ENV) as keyof typeof configUrl];
//export default configUrl