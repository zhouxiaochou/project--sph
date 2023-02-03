// 引入路由组件
// import Home from '@/pages/Home/Home.vue'
// import Search from '@/pages/Search/Search.vue'
import Login from '@/pages/Login/Login.vue'
import Register from '@/pages/Register/Register.vue'
import Detail from '@/pages/Detail/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/pages/ShopCart/ShopCart.vue'
import Trade from '@/pages/Trade/Trade.vue'
import Pay from '@/pages/Pay/Pay.vue'
import PaySuccess from '@/pages/PaySuccess/paySuccess.vue'
import Center from '@/pages/Center/Center.vue'
// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder/myOrder'
import groupOrder from '@/pages/Center/groupOrder/groupOrder'

/*
  路由懒加载
  当打包构建应用时，JavaScript包会变的非常大，影响页面加载
  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
*/ 



// 配置路由信息
export default
      [
            {
                  path: "/home",
                  // 路由懒加载
                  component: () => import("@/pages/Home/Home.vue"),
                  meta: { show: true }
            },
            // meta:{show:true} footer组件的显示与隐藏
            {
                  path: "/search/:keyword?",
                  component: () => import("@/pages/Search/Search.vue"),
                  meta: { show: true },
                  name: "search",
                  // 路由组件能不能传递props数据
                  // 方式一：布尔值
                  // props:true
                  // 对象写法：额外的给路由组件传递一些props
                  // props:{a:1,b:2}
                  // 方式三：函数写法
                  props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
            },
            {
                  path: "/login",
                  component: Login,
                  meta: { show: false }
            },
            {
                  path: "/register",
                  component: Register,
                  meta: { show: false }
            },
            {
                  path: '/detail/:skuid',
                  component: Detail,
                  meta: { show: true }
            },
            {
                  path: "/addcartsuccess",
                  component: AddCartSuccess,
                  name: 'addcartsuccess',
                  meta: { show: true }
            },
            {
                  path: "/shopcart",
                  component: ShopCart,
                  meta: { show: true }
            },
            {
                  // 
                  path: "/trade",
                  component: Trade,
                  meta: { show: true },
                  // 路由独享守卫
                  beforeEnter: (to, from, next) => {
                        console.log(from)
                        // 去交易页面必须是从购物车跳转的
                        if (from.path == "/shopcart") {
                              next()
                        } else {
                              // 其他的路由组件跳转到trade停留在当前路由
                              // 中断当前导航，回到from对应的地址（从哪来回哪去）
                              next(false)
                        }
                  }
            },
            {
                  path: "/pay",
                  component: Pay,
                  meta: { show: true },
                  // 路由独享守卫
                  beforeEnter: (to, from, next) => {
                        // 去支付页面必须是从trade跳转的
                        if (from.path == '/trade') {
                              next()
                        } else {
                              // 其他的路由组件来的，停留在当前路由
                              // 中断当前导航，回到from对应的地址（从哪来回哪去）
                              next(false)
                        }
                  }
            },
            {
                  path: "/paysuccess",
                  component: PaySuccess,
                  meta: { show: true }
            },
            {
                  path: "/center",
                  component: Center,
                  meta: { show: true },
                  // 子路由（二级路由）
                  children: [
                        {
                              path: 'myorder',
                              component: myOrder,
                        },
                        {
                              path: 'grouporder',
                              component: groupOrder
                        },
                        {
                              path: '/center',
                              redirect: '/center/myorder'
                        }
                  ]
            },
            // 重定向，在项目跑起来的时候，访问/的时候，立马让它定向到首页
            {
                  path: '*',
                  redirect: "/home"
            }

      ]
