# webpack development config

difference between webpack-dev-server and webpack-dev-middleware

1.webpack-dev-server is simple express for static server, it used webpack-dev-middleware internal

2.wepack-dev-middleware used in real express server, which serve static file in publicPath

the common feather is both of them serve static file from memory

hot module replacement

mode webpack-dev-server
webpack.config.js
1.devServer add hot: true
```
devServer: {
  contentBase: './dist',
  hot: true,
}```

2.plugins add new webpack.HotModuleReplacementPlugin()

```
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],
```

index.js 
1. module.hot.accept('index.js')
```
if (module.hot) {
  module.hot.accept('./print.js', function() {
    console.log('accept the updated printMe module');
    // reload code
  })
}
```

mode express webpack-hot-middleware
webpack.config.js
1.entry point
entry: {
  app: ['./src/index.js', 'webpack-hot-middleware/client'],
},

2.plugins add new webpack.HotModuleReplacementPlugin()

```
plugins: [
  new webpack.HotModuleReplacementPlugin(),
],
```

3.server side add webpack-hot-middleware
`app.use(webpackHotMiddleware(compiler));`


difference between webpack-dev-server mode and webpack-hot-middleware is
webpack-dev-server use websokect between client and server
webpack-hot-middle use eventstream to pull update changes