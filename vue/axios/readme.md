# axios 使用时的一些记录
## 请求拦截

```
// http request 拦截器
let loading = null
axios.interceptors.request.use(
  config => {
    if (config.params && config.params.notLoading) {

    } else {
      loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      })
    }
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    const token = store.state.token
    token && (config.headers.Authorization = 'JWT ' + token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
```

## 响应拦截

```
axios.interceptors.response.use(
  response => {
    if (loading) {
      loading.close()
      loading = null
    }
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    console.log('response=======', response)
    if (Number(response.status) < 400) {
      requestNum = 0
      return Promise.resolve(response.data)
    } else {
      console.log('server-reject', response)
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (loading) {
      loading.close()
      loading = null
    }
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          Message.error({
            message: JSON.stringify(error.response.data),
            duration: 1000
          })
          break
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          localStorage.clear()
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error({
            message: '用户名或密码错误',
            duration: 1000
          })
          break
        // 404请求不存在
        case 404:
          Message.error({
            message: '网络请求不存在',
            duration: 1000
          })
          break
        case 502:
          Message.error({
            message: '网络请求超时,请重新请求!'
          })
          break
        // 其他错误，直接抛出错误提示
        default:
            Message.error({
              message: error.response.data.message || '网络请求超时,请重新请求!',
              duration: 1000
            })
      }
      return Promise.reject(error.response)
    }
  }
)
```

## 请求超时重复本次请求

```
if (requestNum <= 3) {
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, 1500)
  })
  return backoff.then(function () {
    return axios(Object.assign({}, error.response.config, {
      url: error.response.config.url.replace(axios.defaults.baseURL, '')
    }))
  })
}
requestNum += 1
```

## 封装请求

1. get请求
```
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
```
2. post请求

```
export function post (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
```
3. put请求

```
export function put (url, params) {
  return new Promise((resolve, reject) => {
    axios.put(url, qs.stringify(params)).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
```

4. delete请求

```
export function del (url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {data: qs.stringify(params)}).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}
```