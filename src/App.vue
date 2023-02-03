<template>
  <div>
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!--Footer在Home,Search显示，在登录，注册页面隐藏  -->
    <Footer v-show="$route.meta.show" />
    </div>
</template>

<script>
// 引入
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer.vue'
export default {
  name: 'app',
  components:{
    Header,Footer
  },
  mounted(){
    // 通知vuex发请求，获取数据，存储在仓库当中
    // 派发action，获取商品分类的三级列表的数据
    this.$store.dispatch("getcategoryList");
  }
}
</script>

<style>

</style>