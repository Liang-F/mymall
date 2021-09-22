<template>
  <div class="bottom-bar">
    <div class="all-icon">
      <div class="icon-item">
        <span class="iconfont icon-kefu"></span>
        <span>客服</span>
      </div>
      <div class="icon-item">
        <span class="iconfont icon-shoucang"></span>
        <span>店铺</span>
      </div>
      <div class="icon-item">
        <span class="iconfont icon-dianpu"></span>
        <span>收藏</span>
      </div>
    </div>
    <div class="car-buy">
      <span class="bar-item car" @click="addToCart">加入购物车</span>
      <span class="bar-item buy" @click="buy">购买</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart(){
      this.$emit('addToCart')
    },
    buy(){
      this.$emit('addToCart')
      this.$router.replace("/cart")
    }
  }
}
</script>

<style scoped>
/*@import "assets/css/icon.css";*/
.bottom-bar{
  position: relative;
  /*bottom: 49px;*/
  height: 49px;
  background: white;

  /*z-index: 9;*/
  display: flex;
}
.all-icon{
  width: 40%;
  display: flex;
  margin-top: 5px;
  font-size: 12px;
}
.icon-item{
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: column;
  line-height: 20px;
  color: #eb4868;
}
.car-buy{
  display: flex;
  width: 60%;
  text-align: center;
  color: white;
  line-height: 49px;
  border-radius: 20px;
  overflow: hidden;
}
.bar-item{
  flex: 1;
}
.car{
  background-color: #FFA042;
}
.buy{
  background-color: #FF0000;
}
</style>