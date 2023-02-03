import { reqAddressInfo, reqOrderInfo} from '@/api/index.js'

const state={
      address:[],
      orderInfo:{}
}
const mutations={
      GETUSERADDRESS(state,address){
            state.address=address
      },
      GETORDERINFO(state,orderInfo){
            state.orderInfo = orderInfo;
      }
      }
const actions={
      // 获取用户地址信息
      async getUserAddress({commit}){
            // 
          let result=await  reqAddressInfo()
          if(result.code==200){
                commit('GETUSERADDRESS',result.data)
            //     console.log(result);
          }
      },
      // 获取订单交易商品清单
      async getOrderInfo({commit}){
        let result = await  reqOrderInfo()
        if(result.code==200){
              commit("GETORDERINFO",result.data)
        }
      }
}
const getters={}

export default{
      state,mutations,actions,getters
}