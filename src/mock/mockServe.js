// 引入mockjs模块
import Mock from 'mockjs'

// 引入json数据格式[json数据格式没有对外暴露，但是可以引入]
// webpack 默认对外暴露的 （不需要export）：图片、json数据格式 
import banner from './banner.json'
import floor from './floor.json'
import address from './address.json'


// mock数据:第一个参数：请求地址    第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor});//
Mock.mock("/mock/address", { code: 200, data: address});//模拟订单结算列表用户地址

