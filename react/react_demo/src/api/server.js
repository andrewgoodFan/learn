import axios from 'axios';
import config from '@/config';
const baseUrl = config.baseUrl[process.env.NODE_ENV]|| '';
const proxyUrl = process.env.NODE_ENV === 'development' ? '/api' : '';
axios.defaults.withCredentials = true;

class HttpRequest {
   
    interceptors(instance, url) {
        // 请求拦截
        this.requestInterceptor(instance, url)
        // 响应拦截
        this.responseInterceptor(instance, url)
    }

    request(method, url, data) {
        let options = {
            method,
            url,
            baseUrl: baseUrl,
            timeout: 30000,
            params: null,
            data: data,
            headers: null,
            withCredentials: true,  //是否携带cookie发起请求
            validateStatus: (status)=> {
              return status >= 200 && status < 300
            },
          }
        const instance = axios.create()
        options = Object.assign({}, options, {method, url: proxyUrl + url, data})
        this.interceptors(instance, options.url)
        return instance(options)
    }


    /**
     * @description 请求拦截
     * @param instance
     * @param url
     */
    requestInterceptor(instance, url) {
        instance.interceptors.request.use(config => {
            return config;
        }, error => {
            return Promise.reject(error);
        })
    }

    /**
     * @description 响应拦截
     * @param instance
     * @param url
     */
    responseInterceptor(instance, url) {
        instance.interceptors.response.use(res => {
            console.log('response', res);
            if (res.data.code === 0) {
                return res.data;
            } else {
                console.log(res);
                alert(res.msg);
                return Promise.reject(res)
            }
        }, error => {
            console.log(JSON.stringify(error.response));
            alert(error.response.data.msg);
            return Promise.reject(error)
        })
    }
}

export default HttpRequest