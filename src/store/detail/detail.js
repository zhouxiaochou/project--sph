import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api/index"
// 封装游客身份模块uuid--->生成一个随机字符串（不能改变）
import{getUUID} from '@/utils/uuid_token'
const state = {
      goodInfo: {},
      // 游客的临时身份
      uuid_token:getUUID()
}
const mutations = {
      GETGOODINFO(state, goodInfo) {
            state.goodInfo = goodInfo
      }
}
const actions = {
      // 获取产品信息的action
      async getGoodInfo({ commit }, skuId) {
            let result = await reqGoodsInfo(skuId)
            if (result.code == 200) {
                  commit('GETGOODINFO', result.data)
            }
      },
      // 加入购物车的action||修改某一个产品的参数
      async addUpdateShopCart({ commit }, { skuId, skuNum }) {
            // 发请求
            let result = await reqAddOrUpdateShopCart(skuId, skuNum);
            // 加入购物车以后（发请求），将前台参数带给服务器
            // 服务器写入成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
            // 因为服务器没有返回其余数据，因此不需要三连环存储数据
            // 代表服务器加入购物车成功
            // console.log(result);
            if (result.code == 200) {
            // 代表服务器加入购物车成功
                  return "ok"
            } else {
            // 失败
                  return Promise.reject(new Error('faile'))
            }
      }
}
const getters = {
      // 路径导航简化的数据
      categoryView(state) {
            // state.goofInfo初始状态是一个空对象，空对象categoryView属性值是undefined
            // 当前计算出的categoryView属性值至少是一个空对象，就不会出现虚假报错
            return state.goodInfo.categoryView || {}
      },
      // 简化产品信息的数据
      skuInfo(state) {
            return state.goodInfo.skuInfo || {}
      },
      // 产品的售卖属性的简化
      spuSaleAttrList(state) {
            //综合排序第一个手机spuSaleAttrList没有数据
            return state.goodInfo.spuSaleAttrList || []
      },

}

export default {
      state, mutations, actions, getters
}