<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物</div>
    </NavBar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <TabControl class="tab-control"  :titles="['流行', '新款', '精选']" @tabClick="tabClick"></TabControl>
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
      currentType: 'pop',
      isShowBackTop: false

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
    BackTop
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }

  },
  created() {

    this.getHomeMultidata()
//请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')


  },
  methods: {
    //事件监听
    tabClick(index){
      console.log(index)
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
    },
    //网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page +1;
      getHomeGoods(type, page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position){
        this.isShowBackTop = position.y < -436
    }


  }



}
</script>

<style scoped>
#home{
  padding-top: 44px;
  /*position: relative;*/
  height: 100vh;
  /*padding-bottom: 100px*/
}
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 9;
}
.tab-control{
  /*position: sticky;*/
  /*top: 44px;*/
  /*z-index: 9;*/
}
.content{
  /*height: 500px;*/
  height: calc(100vh - 93px);
  overflow: hidden;
  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
  /*left: 0;*/
  /*right: 0;*/
}
</style>
