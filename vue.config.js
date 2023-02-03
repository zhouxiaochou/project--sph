const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  lintOnSave: false,//关闭语法检查
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        //  pathRewrite:{'^/api':''},
      }
    }
  }
})


