class HttpException extends Error{
    constructor (msg='服务器异常',errorCode=10000,code=400){
            super()
            this.msg = msg
            this.code = code
            this.errorCode = errorCode
    }
}
module.exports = HttpException