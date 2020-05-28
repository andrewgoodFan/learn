const router = require('koa-router')();
const db = require('../db');
const HttpException = require('../libs/exception')
const md5 = require('../libs/md5');
const token = require('../libs/token');
router.post('/', async(ctx, next) => {
    let {username, password} = ctx.request.body;
    if (username && password) {
        let query = `select password from user_table where username='${username}'`;
        try {
            let result = await db(query);
            if (result[0].password && md5(password) === result[0].password) {
                const jwt = token({username, password});
                ctx.body = {
                    code: 0,
                    data: {
                        message: '登录成功',
                        token: jwt
                    }
                }
            } else {
                throw new HttpException('用户名或密码错误', 2, 500)
            }
        } catch (err) {
            throw new HttpException(err.msg, err.errorCode, err.code)
        }
    } else {
        throw new HttpException('请输入账号和密码')
    }
})
router.get('/', async (ctx, next) => {
    ctx.body = 'login'
})

module.exports = router;