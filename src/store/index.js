// vuex
import Vue from 'vue';
import Vuex from 'vuex'

// 使用插件
Vue.use(Vuex);

//引入vuex小仓库
import home from './home/home.js';
import search from './search/search.js';
import detail from './detail/detail.js';
import shopcart from './ShopCart/ShopCart.js'
import user from './user/user.js'
import trade from './trade/trade.js'

// 对外暴露store类的一个实例
export default new Vuex.Store({
      // 实现vuex仓库模块式开发存储数据
      modules:{
            home,
            search,
            detail,
            shopcart,
            user,
            trade
      }
})
