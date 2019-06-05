# webpack development config

difference between webpack-dev-server and webpack-dev-middleware

1.webpack-dev-server is simple express for static server, it used webpack-dev-middleware internal

2.wepack-dev-middleware used in real express server, which serve static file in publicPath

the common feather is both of them serve static file from memory

## hot module replacement

在开发模式下，使用代码代码热替换可以提高开发效率，使用 HMR 过程的总结如下：

### webpack 提供两种模式的使用方式：

- 一种是开启 **webpack-dev-server** 的 **hot module replacement** 功能；
- 另一种是在 **nodejs** 中使用 **webpack-hot-middleware** 插件。

#### webpack-dev-server 模式
> webpack.config.js

1.设置 devServer
```
devServer: {
  contentBase: './dist',
  hot: true,
}
```

2.plugins 添加插件 webpack.HotModuleReplacementPlugin

```
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],
```

> index.js 添加 hot module replacement 浏览器端入口

```
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('accept the updated printMe module');
    // reload code
  })
}
```
配置完以上步骤后，启动 webpack-dev-server，改动某个文件，控制台即可看到效果

```
[HMR] Waiting for update signal from WDS...
[WDS] Hot Module Replacement enabled.
[WDS] Live Reloading enabled.
```

#### express webpack-hot-middleware 模式

> webpack.config.js

1.设置 entry point，添加 webpack-hot-middleware/client，这里很关键，否则启动没有任何效果。

```
entry: {
  app: ['./src/index.js', 'webpack-hot-middleware/client'],
},
```

2.plugins 插件中添加 webpack.HotModuleReplacementPlugin()，跟webpack-dev-server 模式相同。

```
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],
```

3.express 服务端添加 webpack-hot-middleware
```
app.use(webpackHotMiddleware(compiler));
```

4.index.js 添加 hot module replacement 浏览器端入口，跟webpack-dev-server 模式相同。

```
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('accept the updated printMe module');
    // reload code
  })
}
```

配置完成后，启动nodejs服务，改动客户端代码，即可发现浏览器更新了
```
[HMR] connected
[HMR] bundle rebuilding
[HMR] bundle rebuilt in 109ms
[HMR] Checking for updates on the server...
[HMR] Updated modules:
[HMR]  - ./src/print.js
[HMR] App is up to date.
```


#### 比较两种模式的异同
webpack-dev-server 中使用 websocket 在客户端和浏览器端建立长链接，实现代码同步；
webpack-hot-middle 使用 eventstream 事件流的方式拉去服务服务端最新的代码；

