# 基于vue-cli的webpack打包优化--dll的运用
## 首先在build文件夹下新建webpack.dll.conf.js
### 配置dll文件
        var path = require('path')
        var webpack = require('webpack')
        var AssetsPlugin = require('assets-webpack-plugin')
        var CleanWebpackPlugin = require('clean-webpack-plugin')
        var ExtractTextPlugin = require('extract-text-webpack-plugin')
        module.exports = {
          entry: {
            // 需要打包的静态资源
            libs: [
              'vue',
              'vue-router'
            ]
          },
          output: {
            path: path.resolve(__dirname, '../libs'),
            filename: '[name].[chunkhash:7].js',
            library: '[name]_library'
          },
          plugins: [
            new webpack.DefinePlugin({
              'process.env': require('../config/prod.env')
            }),
            new webpack.DllPlugin({
              path: path.resolve(__dirname, '../libs/[name]-mainfest.json'),
              name: '[name]_library',
              context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
            }),
            new ExtractTextPlugin('[name].[contenthash:7].css'),
            new AssetsPlugin({
              filename: 'bundle-config.json',
              path: './libs'
            }),
            new CleanWebpackPlugin(['libs'], {
              root: path.join(__dirname, '../'), // 绝对路径
              verbose: true,
              dry: false
            })
          ]
        }
build文件夹下新建build-dll.js
### 配置 build-dll.js
        var path = require("path")
        var webpack = require("webpack")
        var dllConfig = require("./webpack.dll.conf")
        var chalk = require("chalk")
        var rm = require("rimraf")
        var ora = require("ora")

        var spinner = ora({
          color: "green",
          text: "building for Dll..."
        });
        spinner.start();
        rm(path.resolve(__dirname, "../libs"), err => {
          if (err) throw err;
          webpack(dllConfig, function(err, stats) {
            spinner.stop();
            if (err) throw err;
            process.stdout.write(
              stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
              }) + "\n\n"
            );
            console.log(chalk.cyan(" build dll succeed !.\n"));
          });
        });
### 修改webpack.prod.conf.js
#### 新增

        const bundleConfig = require("../libs/bundle-config.json") 
        const CleanWebpackPlugin = require('clean-webpack-plugin')
        plugins: [
          ...
          // 增加DllReferencePlugin配置
          new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../libs/libs-mainfest.json") // 指向生成的manifest.json
          }),
          // 每次打包删除dist目录
          new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '../'), // 绝对路径
            verbose: true,
            dry: false
          }),
          ...
        ]
#### HtmlWebpackPlugin中新增

        new HtmlWebpackPlugin({
          ...
          libJsName: bundleConfig.libs.js,
          libCssName: bundleConfig.libs.css,
          ...
        }),
        CopyWebpackPlugin中新增
        new CopyWebpackPlugin([
          ...
          {
            from: path.resolve(__dirname, "../libs"),
            to: config.build.assetsSubDirectory,
            ignore: ["*.json"]
          }
        ])
### 修改index.html
        <div id="app"></div>
        <!-- built files will be auto injected -->
        <% if (htmlWebpackPlugin.options.libCssName){ %>
          <link rel="stylesheet" href="./static/<%= htmlWebpackPlugin.options.libCssName %>">
        <% } %>

        <% if (htmlWebpackPlugin.options.libJsName){ %>
            <script src="./static/<%= htmlWebpackPlugin.options.libJsName %>"></script>
        <% } %>
### package.json中 新增命令
 "dll": "node build/build-dll.js"

 打包之前，先运行npm run dll 会在根目录生成libs文件夹，
 libs
 --bundle-config.json
 --libs-manifest.json
 --libs[hash].js
 运行 npm run build 搞定
 ...

 建议打包时将生成的文件路径改为相对路径
 config --index.js--build--assetsPublicPath:'./'
### 打包小问题记载
<br>1.打包时静态资源路径错误
<br>1.1 js/css路径错误： config -> index.js -> build -> assetsPublicPath: './', // 改为相对路径
<br>1.2 图片路径错误： build -> utils.js -> vue-style-loader 添加 publicPath: '../../' 
<br>1.3 兼容ie9:
<br>安装 cnpm install --save-dev babel-polyfill;
<br>在main.js 中 import 'babel-polyfill'
<br>在build -> webpack.baseconfig.js -> entry: {app: ['babel-polyfill', './src/main.js']}
### 安装插件问题
 1.在安装node-sass和sass-loader时，需要python: 使用cnpm安装