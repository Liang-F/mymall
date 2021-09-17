<template>
  <div id="home">
    <NavBar class="home-nav"></NavBar>
<!--    <swiper>-->
<!--      <swiper-item v-for="item in banners">-->
<!--        <a :href="item.link">-->
<!--          <img :src="item.image" alt="">-->
<!--        </a>-->
<!--      </swiper-item>-->
<!--    </swiper>-->
    <HomeSwiper :banners="banners"></HomeSwiper>
    <RecommendView :recommends="recommends"></RecommendView>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";

import {getHomeMultidata} from "@/network/home";
// import Swiper  from '@/components/common/swiper/Swiper';
// import SwiperItem from "@/components/common/swiper/SwiperItem";
// import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: "Home",
  data(){
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    // Swiper,
    // SwiperItem
    HomeSwiper,
    RecommendView
  },
  created() {
    getHomeMultidata().then(res => {
      console.log(res)
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
