<template>
  <div class="cart">
    <NavBar class="cart-nav">
      <div slot="center" >购物车({{length}})</div>
    </NavBar>
    <CartList></CartList>
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";


import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    CartBottomBar,
    CartList,
    NavBar,

  },
  computed: {
    //使用vuex中getters的三种用法
    // 1
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    //1，2都用{{cartLength}}调用
    //2
    // ...mapGetters(['cartLength'])

    //3
    ...mapGetters({
      length: 'cartLength'
    })
  },

}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.cart-nav{
  background-color: var(--color-tint);
  color: white;
}

</style>
