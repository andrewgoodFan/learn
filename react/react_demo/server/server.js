const Koa = require('koa');
const db = require('./db.js');
const server = new Koa();
const bodyParser = require('koa-bodyparser');
const {JsonError, PageError} = require('./libs/error');
const catchError = require('./middlewares/catcherror')

server.use(catchError) //一定要放在第一个中间件
// bodyparser
server.use(bodyParser());
// 错误处理
// server.use(async (ctx, next) => {
//     try {
//       await next();
//     } catch(e) {
//       let status = e.status || 500;
//       let message = e.message || '服务器错误';
//       ctx.response.status = e.statusCode || e.status || 500;
//       if (e instanceof JsonError) { // 错误是 json 错误
//         ctx.body = {
//           'status': status,
//           'message': message
//         };
//         if (status == 500) { 
//           // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
//           ctx.app.emit('error', e, this);
//         }
//         return;
//       }
      
//       ctx.status = status;
//       // 根据 status 渲染不同的页面
//       if (status == 403) {
//         ctx.body = await ctx.render('403.html', {'err': e});
//       }
//       if (status == 404) {
//         ctx.body = await ctx.render('404.html', {'err': e});
//       }
//       if (status == 500) {
//         ctx.body = await ctx.render('500.html', {'err': e});
//         // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
//         ctx.app.emit('error', e, this);
//       }
//     }
//   })
  // use this.throw(403, new PageError('没有权限访问'));
// 路由模块化
const router = require('./routes/index.js');
server.use(router.routes(), router.allowedMethods())
server.listen(8080);