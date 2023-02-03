import {reqGetSearchInfo} from '@/api'
// search模块的vuex小仓库
const state={
      // 仓库初始化状态
      searchList:{}
};
const mutations={
      GETSEARCHLIST(state,searchList){
            state.searchList=searchList
      }
};
const actions={
      // 获取search模块数据
      async getSearchList({commit},params={}){
            // reqGetSearchInfo在调用获取服务器数据的时候，至少传递一个空对象
            // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
           let result=await reqGetSearchInfo(params)
           if(result.code==200){
                 commit('GETSEARCHLIST',result.data)
           }
      }
}
// 计算属性
// 项目当中getters主要的作用是:简化仓库中的数据(为简化数据而生)
const getters={
      // 当前形参state,当前仓库中的state，并非大仓库中的state
      goodsList(state){
            // 如果服务器数据回来了，就是一个数组
            // 如果网络断开|网络很慢state.searchList.goodsList就会返回undefined
            // 计算新的属性的属性值至少给人家来一个数组
            return state.searchList.goodsList;
      },
      trademarkList(state){
            return state.searchList.trademarkList
      },
      attrsList(state){
            return state.searchList.attrsList
      }
}

export default{
      state,
      mutations,
      actions,
      getters
}