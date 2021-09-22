<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem v-for="(item, index) in cartList" :item-info="item" :key="index"></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartListItem from "@/views/cart/childComps/CartListItem";

import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100vh - 93px - 40px);
  /*overflow: hidden;*/
}
.content{
  /*height: calc(100% - 49px);*/
  height: 100%;
  overflow: hidden;
}
</style>