<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    list: {
      // 立即监听，不论数据有没有变化，都会立即监听
      // 为什么watch监听不到list：因为这个数据从来没有发生变化（数据是父亲（home）给的，父亲给的时候就是一个对象，对象里面有完整的数据）
      immediate: true,
      handler() {
        // 轮播图
        //只能监听到数据已经有了，但是v-for动态渲染结果还是不能确定，所以还是需要nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(
            // 主页轮播图放在mounted中不能动态渲染，但是floor轮播图可以渲染
            //第一次写轮播图的时候，是在当前组件内部发送异步请求，动态渲染结构，数据必须v-for循环之后才能获取到
            // 这次轮播图是在父组件里面派发action（父组件渲染完毕：父组件已经将数据给了子组件），数据是父组件通过props传递的
            this.$refs.cur,
            // document.querySelector(".swiper-container"),
            {
              loop: true,
              // autoplay: true,
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                // 点击分页器小球也切换页面
                clickable: true,
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>