<template>
  <div id="detail">
<!--    <div v-for="item in this.$store.state.cartList">{{item.count}}</div>-->
    <DetailNavBar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></DetailNavBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo>
      <DetailParamInfo :param-info="paramInfo" ref="param"></DetailParamInfo>
      <DetailCommentInfo :comment-info="commentInfo" ref="comment"></DetailCommentInfo>
      <GoodsList :goods="recommend" ref="recommend"></GoodsList>
    </Scroll>
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
<!--    <Toast :message="message" :show="show"></Toast>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";
// import Toast from "@/components/common/toast/Toast";

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail";

import {mapActions} from'vuex'

import {itemImgLoadMiXin} from "@/common/mixin";

export default {
  name: "Detail",
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      // itemImgListener: null,
      themeTopY: [],
      imgIsLoad: false,//图片加载完
      currentIndex: 0,
      isShowBackTop: false,//是否显示回顶部图标
      // message: '',//提示信息
      // show: false,//是否提示

    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  created() {
    //获取跳转传递的参数
    this.iid = this.$route.params.iid
    //通过参数请求详情
    getDetail(this.iid).then(res => {
      const data = res.result
      // console.log(data)
      this.topImages = data.itemInfo.topImages

      //获取商品详情
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo)

      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //获取评论信息
      if (data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
        // console.log('评论', this.commentInfo)

      }

    })

    // 请求推荐商品
    getRecommend().then(res => {

      this.recommend = res.data.list
      // console.log(this.recommend)
    })


  },
  mixins: [itemImgLoadMiXin],
  mounted() {
    // console.log(this.$store.state.cartList.length)
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(44 - this.$refs.param.$el.offsetTop)
      this.themeTopY.push(44 - this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(44 - this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(-Number.MAX_VALUE)
      // console.log(this.themeTopY)
      this.imgIsLoad = true
    },
    titleClick(index){//点击跳转
      // console.log(index)
      if (this.imgIsLoad){
        this.$refs.scroll.scrollTo(0, this.themeTopY[index], 500)
      }
      // this.$refs.scroll.scrollTo(0, this.themeTopY[index], 500)
    },
    contentScroll(position){
      // console.log(position)
      const positionY = position.y
      let length = this.themeTopY.length
      for (let i = 0; i <length-1; i++){
        if (this.currentIndex !== i && (positionY <= this.themeTopY[i] && positionY > this.themeTopY[i+1])){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

        /*
        if (this.currentIndex !== i &&
            (i < length-1 && positionY <= this.themeTopY[i] && positionY > this.themeTopY[i+1]) ||
            (i === length-1 && positionY <= this.themeTopY[i])){
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
        */

      }
      this.isShowBackTop = position.y < -436
    },
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    addToCart(){
      // console.log("tianjia")
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

    //  把商品添加到store
      this.addCart(product).then(res => {

        // this.message = res
        // this.show = true
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 2000)

        this.$toast.show(res, 1500)
        // console.log(res)
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
      // alert("添加成功")


    },
  }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
  overflow: hidden;

}
.detail-nav-bar{
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content{
  height: calc(100vh - 93px);
  /*z-index: 9;*/
}
</style>