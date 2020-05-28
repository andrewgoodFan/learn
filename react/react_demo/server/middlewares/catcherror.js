
const HttpException = require('../libs/exception')

const catchError = async (ctx,next)=>{
    try{
        await next()
    } catch(error){
        if(error instanceof HttpException){
            ctx.response.status = error.code || 500;
            return ctx.body = {
                msg: error.msg || '系统错误',
                errorCode: error.errorCode || '9000'
            }
        }
    }
}

module.exports = catchError;