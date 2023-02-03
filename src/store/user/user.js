import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo, reqLogout } from '@/api/index'
import { setToken,getToken,removeToken } from '@/utils/token.js'
// 登录与注册的模块
const state = {
      code: '',
      token: getToken(),
      userInfo: {}
}
const mutations = {
      GETCODE(state, code) {
            state.code = code
      },
      USERLOGIN(state, token) {
            state.token = token
      },
      GETUSERINFO(state, userInfo) {
            // 
            state.userInfo = userInfo
      },
      // 退出登录，清除本地数据
      CLEAR(state){
            // 将仓库中相关用户信息清空
            state.token='',
            state.userInfo={},
            // 本地存储清空
            removeToken()
      }
}
const actions = {
      // 获取验证码
      async getCode({ commit }, phone) {
            // 获取验证码这个接口，把验证码返回了，但是正常情况，后台把验证码发到用户手机上【省钱】
            let result = await reqGetCode(phone)
            if (result.code == 200) {
                  commit("GETCODE", result.data)
                  return 'ok'
            } else {
                  return Promise.reject(new Error('faile'))
            }
      },
      // 用户注册
      async userRegister({ commit }, user) {
            // 
            let result = await reqUserRegister(user)
            if (result.code == 200) {
                  return 'ok'
            } else {
                  return Promise.reject(new Error('faile'))
            }
      },
      // 登录业务【token】
      async userLogin({ commit }, data) {
            let result = await reqUserLogin(data)
            // 服务器下发的token，是用户唯一的标识符
            // 通过带token找服务器要用户的信息进行展示
            if (result.code == 200) {
                  // 
                  commit('USERLOGIN', result.data.token);
                  // 持久化存储token
                  setToken(result.data.token)
                  return 'ok'
            } else {
                  return Promise.reject(new Error('faile'))
            }
      },
      // 获取用户信息
      async getUserInfo({ commit }) {
            let result = await reqUserInfo()
            if (result.code == 200) {
                  // 提交用户信息
                  commit('GETUSERINFO', result.data)
                  return 'ok'
            }else{
                  return Promise.reject(new Error())
            }
      },
      // 退出登录
      async  userLogout({commit}){
            // 向服务器发起一次请求，通知服务器清除token
          let result= await reqLogout()
          if(result.code==200){
                commit("CLEAR")
                return 'ok'
          }else{
                return Promise.reject(new Error('faile'))
          }
      }


}
const getters = {}
export default {
      state, mutations, actions, getters
}