<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物</div>
    </NavBar>
    <TabControl v-show="isTabFixed" class="tab-control" ref="tabControl1"   :titles="['流行', '新款', '精选']" @tabClick="tabClick"></TabControl>
    <Scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadingMore"
    >
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
<!--      class="tab-control"-->
      <TabControl ref="tabControl2"   :titles="['流行', '新款', '精选']" @tabClick="tabClick"></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from "@/common/utils";
import {itemImgLoadMiXin} from "@/common/mixin";


export default {
  name: "Home",
  data(){
    return {
      banners: [],//轮播图数据
      recommends: [],//推荐数据
      goods: {//商品数据
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',//当前显示物品类型
      isShowBackTop: false,//是否显示回顶部图标
      tabOffsetTop: 0,//内部小导航的offsetTop
      isTabFixed: false,//导航是否固定定位
      saveY: 0,//当前滚动条Y值
      // itemImgListener: null
    }
  },
  components: {
    NavBar,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  mixins: [itemImgLoadMiXin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }

  },
  activated() {
    // console.log('回来', this.saveY)
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)

  },
  deactivated() {
    this.saveY = this.$refs.scroll.getCurrentY()
    // console.log(this.saveY)

  //  离开home时取消home页面对scroll组件对image加载的全局监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {

    this.getHomeMultidata()
//请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')




  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500)
    //
    // //监听item中图片加载
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImgLoad', this.itemImgListener)
    // console.log('home')
    //给tabControl赋值
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  methods: {

    //事件监听
    //监听轮播图的加载
    swiperImgLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop)
      //图片加载后获得正确高度，给tabControl赋值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.tabOffsetTop)
    },
    //防抖,以封装到utils
    // debounce(func, delay){
    //   let timer = null
    //   return function (...args){
    //     if (timer) clearTimeout(timer)
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    //上拉加载
    loadingMore(){
      this.getHomeGoods(this.currentType)
      // this.$refs.scroll.refresh()
    },
    //选择不同导航
    tabClick(index){
      // console.log(index)
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    //回顶部
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    //监听滚动
    contentScroll(position){
      // 判断回到顶部的图标是否显示
      this.isShowBackTop = position.y < -436

    //  判断导航是否吸顶
      this.isTabFixed = position.y < -595


    },
    //网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1;
      getHomeGoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //实现多次上拉加载
        this.$refs.scroll.finishPullUp()
      //  create在监听
      })
    },



  }



}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  /*position: relative;*/
  height: 100vh;
  /*padding-bottom: 100px*/
}
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  /*position: fixed;*/
  /*left: 0;*/
  /*top: 0;*/
  /*right: 0;*/
  /*z-index: 9;*/
}

.content{
  /*height: 500px;*/
  /*height: calc(100vh - 93px);*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}
</style>
