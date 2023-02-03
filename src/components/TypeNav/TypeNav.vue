<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件的委派，将鼠标移出事件委托给一个父元素 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件的委派实现路由跳转+传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- .silce(0,16)只渲染前16个数据 -->
              <!-- 一级分类菜单 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{c1.categoryName}}</router-link> -->
                </h3>
                <!-- 二三级分类菜单 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{c2.categoryName}}</router-link> -->
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// lodash全部功能都引入
// import _ from 'lodash

// 按需引入lodash功能函数
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储鼠标移动到哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    
    // 当组件挂载完毕，让show属性变为false(只要一挂载，说明切换了页面所以让三级联动不显示)
    // 如果不是home路由组件，将三级联动隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标进入，修改响应式数据currentIndex
    // throttle回调函数别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      // index:鼠标移上某一个一级分类的元素的索引值
      //  由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有一些大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    }, 20),

    // 进行路由跳转的方法（点击三级联动进行路由跳转）
    goSearch(event) {
      // 最好的解决方案是：编程式导航+事件委派
      // 因为事件委派是委派给父元素的，所以无法确定点击的一定是a标签，点击父元素的任何一个子节点都能触发事件委派
      // 1.需要确定点击的一定是a标签再进行路由跳转   2.获取参数（1,2,3级分类的产品的名字、id）
      // this.$router.push('/search')
      // 给a标签添加一个自定义属性data-categoryName，其余的子节点没有这个自定义属性
      let node = event.target;
      // 获取到当前触发这个事件的节点【h3,a,dt,dl】，只有a标签带有data-categoryName属性
      let { categoryname, category1id, category2id, category3id } =
        node.dataset;
      //如果标签身上拥有categoryname一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 区分一级分类，二级分类，三级分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断：如果路由跳转的时候带有params参数，需要一起和query参数传递过去
        if(this.$route.params){
          // 
          location.params=this.$route.params
          //动态给location配置对象添加query属性
        location.query = query;
        // 路由跳转
        this.$router.push(location);
        }
        
      }
    },

    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 当鼠标移出的时候，让商品分类列表进行隐藏
    leaveShow() {
      this.currentIndex = -1;
      // 如果是search路由组件才会进行商品列表的隐藏与显示
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    // 过渡动画结束状态（进入结束）
    .sort-enter-to{
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>