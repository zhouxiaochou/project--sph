import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from '@/api/index'
const state = {
      cartList: []
}
const mutations = {
      GETCARTLIST(state, cartList) {
            state.cartList = cartList
      }
}
const actions = {
      //获取购物车列表数据
      async getCartList({ commit }) {
            let result = await reqCartList()
            // 
            if (result.code == 200) {
                  commit("GETCARTLIST", result.data)
            }
      },
      // 删除购物车某一个产品
      async deleteCartListBySkuId({ commit }, skuId) {
            let result = await reqDeleteCartById(skuId)
            if (result.code == 200) {
                  return 'ok'
            } else {
                  return Promise.reject(new Error('faile'))
            }
      },
      // 修改购物车某个产品的选中状态
      async updateChecked({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckedByid(skuId, isChecked)
            if (result.code == 200) {
                  return 'ok'
            } else {
                  return Promise.reject(new Error('faile'))
            }
      },
      // 删除购物车所有勾选中的产品
      deleteAllCheckedCart({ dispatch, getters }) {
            // context:小仓库，有commits【提交mutation修改state】 getters【计算属性】  dispatch【派发action】  state【当前仓库数据】
            // 获取购物车中所有的产品(是一个数组)
            let PromiseAll = []
            getters.cartList.cartInfoList.forEach(item => {
                  let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
                  //   将每次返回的promise都添加到PromiseAll数组中
                  PromiseAll.push(promise)
            });
            // 如果数组中所有的元素都成功，返回的结果即为成功
            // 如果有一个失败，返回的即为失败结果
            return Promise.all(PromiseAll)
      },
      // 修改全部产品的选中状态
      updateAllCartChecked({ dispatch, state }, isChecked) {
            let promiseAll = []
            state.cartList[0].cartInfoList.forEach(item => {
                  // 
                  let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked })
                  promiseAll.push(promise)
            });
            return Promise.all(promiseAll)
      }
}
const getters = {
      cartList(state) {
            return state.cartList[0] || {}
      },

}
export default {
      state, mutations, actions, getters
}