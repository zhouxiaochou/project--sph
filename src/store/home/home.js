// 
import { reqCategoryList, reqBannerList,reqFloorList } from '@/api/index.js'
// home模块的vuex小仓库
const state = {
      // state中的数据不可以乱写，服务器返回什么类型的数据，state中就初始化什么
      // 三级菜单的数据
      categoryList: [],
      // 轮播图的数据
      bannerList:[],
      // floor轮播图的数据
      floorList:[]
};
const mutations = {
      GETCATEGORYLIST(state, categoryList) {
            state.categoryList = categoryList
      },
      GETBANNERLIST(state,bannerList){
            state.bannerList=bannerList
      },
      GETFLOORLIST(state,floorList){
            state.floorList=floorList
      }
};
const actions = {
      // 通过api里面的接口函数调用,向服务器发请求，获取服务器的数据
      async getcategoryList({ commit }) {
            let result = await reqCategoryList()
            if (result.code == 200) {
                  commit("GETCATEGORYLIST", result.data)
            }
      },

      // 获取首页轮播图的数据
      async getBannerList({commit}) {
            let result = await reqBannerList()
            if(result.code==200){
                  commit('GETBANNERLIST',result.data)
            }

      },
      // 获取floor数据
     async  getFloorList({commit}){
         let result= await reqFloorList();
         if(result.code==200){
            //提交mutation
            commit('GETFLOORLIST',result.data)
         }
      }
}
// 计算属性
const getters = {}

export default {
      state,
      mutations,
      actions,
      getters
}