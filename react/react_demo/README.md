## React 初探

### 启动项目
1. 生成项目 

```
/**
    脚手架生成项目
 */
npx create-react-app react_demo(your own project)


```
2. 初始配置

```
/**
    暴露配置文件(config)和运行文件(scripts)
    npm run eject
    tips: 首先需要将代码提交本地 (git add . -> git commit -m 'react项目初始化')
*/
```
3. 配置项目目录

```
    src 
        components       组件
        views            页面
        assets           静态资源
        api              接口请求文件
        utils            工具
        store            react-redux
        router           路由
        config           自定义全局配置
        index.js         入口文件
```

### 开始项目

#### 路由配置

引用的是react-router 4.x版本
```
tips: 网页端引入 react-router-dom, APP引入 react-router-native
```
使用了异步引入函数,和keep-alive组件 (keep-alive和asyncComponent貌似有些冲突, 我现在的做法是tab组件需要keep-alvie的同步引入,其他的组件异步引入)

#### 使用jsx

jsx是js + xml, 是document.createElement 的语法糖,本质是书写js的虚拟dom

#### 函数组件和类组件

1. 函数组件

看了官方文档和一些资料之后,我的理解是, 部分是用来做展示组件,只依赖prop来显示的无状态组件, 可用作复用组件
tips: 看更新文档,大有代替类组件的意思, 增加了hook可以在函数组件中管理和使用state

2. 类组件

主要是具体的业务逻辑组件, 可继承, 难复用

#### request

网页端使用axios封装即可

配置跨域代理: 
```
// webpackDevServer.config.js
...
proxy: {
    '/api': {
        target: config.host[process.env.NODE_ENV],
        changeOrigin: true,
        pathRewrite: {'^/api': '/api'}
    },
},
...
```

#### 表单

1. 受控表单

受控组件的值由props或state传入，用户在元素上交互或输入内容会引起应用state的改变。在state改变之后重新渲染组件，我们才能在页面中看到元素中值的变化，假如组件没有绑定事件处理函数改变state，用户的输入是不会起到任何效果的

```
<label htmlFor="">
    用户名: <input onChange={ (e) => getUser(e)} value={username} type="text"/>
</label>
```

2. 非受控组件

使用ref和onChange接收输入框的值

```
 <label htmlFor="">
    用户名: <input
    defaultValue=''
    placeholder="请输入用户名"
    ref={(userInput) => setUserRef(userInput)}
    onChange={getUser2} type="text"/>
</label>
```
