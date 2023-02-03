// 配置路由的地方
import Vue from 'vue'
// 引入vue-router路由插件
import VueRouter, { RouterLink } from 'vue-router'
import routes from './routes.js'
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from '@/store/index.js'



// 配置路由
const router = new VueRouter({
      // 配置路由
      routes,
      // 滚动条滚动行为
      scrollBehavior(to, from, savedPosition) {
            // 返回的y=0代表滚动条在最上方
            return { y: 0 }
      }
})

// 重写push和replace
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
      return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
      return originalReplace.call(this, location).catch(err => err)
}

// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
      // to:可以获取到你要跳转到哪个路由信息
      // from:可以获取到你从哪个路由而来的信息
      // next：放行函数   next()放行  next(path)放行到指定路由   next(false)
      // 用户登录了才会有token，未登录一定不会有token
      let token = store.state.user.token;
      // 用户信息
      let name = store.state.user.userInfo.name
      // 用户已经登录了
      if (token) {
            // 用户已经登录了，还想去login（不行,只能停留在首页）
            if (to.path == '/login'||to.path=='/register') {
                  next('/home')
            } else {
                  // 登录了，但是去的不是login
                  // 如果用户名已经有了
                  if (name) {
                        next()
                  } else {
                        // 没有用户信息
                        // 派发action，让仓库存储用户信息再跳转
                        try {
                              // 获取用户信息成功
                              await store.dispatch('getUserInfo')
                              // 放行
                              next()
                        } catch (error) {
                              // token失效了获取不到用户信息，重新登录
                              // 清除token
                            await  store.dispatch('userLogout')
                            next('/login')

                        }

                  }

            }

      } else {
            // 未登录
            // 未登录不能去交易相关的页面，也不能去支付相关的【pay|paysuccess】，不能去购物中心
            // 未登录去不能去的路由，跳转到登录页面，去的是未登录可以去的页面（放行）
            let toPath=to.path
            // console.log(toPath);
            // indexOf()不包含就返回-1
            if (toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
                  // 把未登录的术后想去而没有去成的信息，存储于地址栏中【路由】
                  next('/login?redirect='+toPath)
            }else{
                  // 去的是未登录可以去的路由，放行
                  next()
            }
      }
})
export default router