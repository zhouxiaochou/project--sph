import { v4 as uuidv4 } from 'uuid';
// 要生成一个随机的字符串作为id，且每次执行不能发生变化，而且游客身份的id要持久储存
export const getUUID=()=>{
      // 先从本地存储获取uuid（看一下本地存储里面是否有）
      let uuid_token=localStorage.getItem('UUIDTOKEN');

      // 如果没有就生成
      if(!uuid_token){
            // 生成游客临时身份
            uuid_token=uuidv4();
            // 本地存储存储一次
            localStorage.setItem('UUIDTOKEN',uuid_token)
      }
      return uuid_token
}