const router = require('koa-router')();
const db = require('../db');
const md5 = require('../libs/md5');
// const {JsonError, PageError} = require('../libs/error');
const HttpException = require('../libs/exception')
router.post('/', async (ctx, next) => {
    const {username, password} = ctx.request.body;
    if (username && password) {
        let md5Pass = md5(password);
        let query = `select username, password from user_table where username='${username}'`;
        let sql = `INSERT INTO user_table (username, password) VALUES ('${username}', '${md5Pass}')`;
        try {
            let queryRes = await db(query);
            if (queryRes[0].password) {
                throw new HttpException('该账号已存在',2,500);
            } else {
                try {
                    let res = await db(sql);
                    if (res) {
                        const obj = {
                            code: 0,
                            data: {
                                message: '注册成功'
                            }
                        }
                        ctx.body = obj;
                    } else {
                        throw new HttpException('注册失败',2,500);
                    }
                } catch (err) {
                    throw new HttpException(err.msg, err.errorCode, err.code);
                }
            }
        } catch (err) {
            throw new HttpException(err.msg, err.errorCode, err.code);
        }
      
    } else {
        const error = new HttpException('用户名或密码错误',10000,500)
        throw error;
    }
})

module.exports = router;