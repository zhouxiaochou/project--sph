// 当前这个模块：API进行统一管理
import request from './request'
import mockRequests from './mockAjax'

// 三级联动的接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList  get请求  无参数
// 发请求
export const reqCategoryList=()=> request({url:'/product/getBaseCategoryList',method:'get'})


// 获取banner（home首页轮播图接口）
export const reqBannerList=()=>mockRequests.get('/banner')

// 获取floor轮播图数据
export const reqFloorList=()=>mockRequests.get('/floor')




// 获取search模块数据  地址：api/list  请求方式post  参数：需要带参数
// 当前这个函数需要接受外部传递参数
// 当前这个接口（获取搜索模块的数据），给服务器传递的默认参数【至少是一个空对象】
export const reqGetSearchInfo=(params)=>request({url:'/list',method:"post",data:params})

// 获取产品详情信息的接口  url：/api/item/{skuId}  请求方式GET
export const reqGoodsInfo = (skuId) => request({ url:`/item/${skuId}`,method:'get'})


// 将产品添加到购物车中（获取更新某一个产品的个数）
//api/cart/addToCart/{skuId}/{skuNum}  post请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({ url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})


// 获取购物车列表数据接口
// api/cart/cartList
export const reqCartList = () => request({ url:'/cart/cartList',method:'get'})

// 删除购物车商品的接口
// api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => request({ url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中的状态
// api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedByid = (skuId,isChecked) => request({ url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})


// 发送验证码
// /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => request({ url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册
// /api/user/passport/register
export const reqUserRegister = (data) => request({ url:`/user/passport/register`,data,method:'post'})

// 用户登录
// /api/user/passport/login
export const reqUserLogin = (data) => request({ url:`/user/passport/login`,data,method:'post'})


//home页面登录(获取用户信息，带着用户的token向服务器发请求，获取用户信息)
// api/user/passport/auth/getUserInfo  get
export const reqUserInfo = () => request({ url:`user/passport/auth/getUserInfo`,method:'get'})

//退出登录
// /api/user/passport/logout
export const reqLogout = () => request({ url:'/user/passport/logout',method:'get'})

//获取用户地址信息（结算页面）
// /api/user/userAddress/auth/findUserAddressList(接口失效) 
export const reqAddressInfo = () => mockRequests.get('/address')
// export const reqFloorList=()=>mockRequests.get('/floor')

//获取订单交易页信息
// /api/order/auth/trade
export const reqOrderInfo = () => request({ url:'/order/auth/trade',method:'get'})


// 提交订单支付
// /api/order/auth/submitOrder?tradeNo={tradeNo}   post
export const reqSubmitOrder = (tradeNo,data) => request({ url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息（金额，地址，收件人.....）
// /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => request({ url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 获取订单支付状态（成功，失败）
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => request({ url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心页面我的订单
// /api/order/auth/{page}/{limit}
export const reqMyOrderList = (page, limit) => request({ url:`/order/auth/${page}/${limit}`,method:'get'})