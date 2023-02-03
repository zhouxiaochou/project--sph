<template>
  <div>
      <!-- 三级联动的全局组件：洒基联动已经注册为全局组件 -->
      <TypeNav/>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <!-- Floor这个组件：自己在组件内部是没有发送请求的，数据是父组件给的 -->
      <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
      <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import Recommend from '@/pages/Home/Recommend/Recommend.vue'
import Rank from '@/pages/Home/Rank/Rank.vue'
import Like from '@/pages/Home/Like/Like.vue'
import Floor from '@/pages/Home/Floor/Floor.vue'
import Brand from '@/pages/Home/Brand/Brand.vue'
import {mapState} from 'vuex'

export default {
  name:'Home',
  components: { ListContainer ,Recommend,Rank,Like,Floor,Brand},
  mounted(){
    // 派发floor的action获取floor组件的数据
    this.$store.dispatch('getFloorList');
  },
  computed:{
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped>

</style>