import Vue from 'vue'
import App from './App.vue'

// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav/TypeNav'
// 注册轮播图全局组件
import Carousel from "@/components/Carousel/Carousel"
// 注册分页器全局组件
import Pagination from "@/components/Pagination/Pagination"
// 引入element-ui样式
import { Button,MessageBox } from 'element-ui';





// 第一个参数：全剧组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name,Pagination)
// 注册全局组件
Vue.component(Button.name,Button)
// element -ui另一种注册方法，挂载在原型上
Vue.prototype.$msgBox=MessageBox
Vue.prototype.$alert=MessageBox.alert;



// 引入mockServe.js---mock虚拟数据
import '@/mock/mockServe.js'

// 引入swiper样式
import "swiper/css/swiper.css"

// 引入路由
import router from '@/router'
// 引入vuex仓库
import store from '@/store/index.js'
// 统一接收api文件里全部请求函数
import * as API from '@/api/index'
//引入懒加载默认图片
import pcy from '@/assets/1.gif'
// 引入lazy-load插件
import VueLazyload from 'vue-lazyload'
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading: pcy
})

// 引入表单校验插件
import  '@/plugins/validate';

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API;
  },
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
