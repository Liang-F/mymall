<template>
  <div class="cart-bottom-bar">
    <div class="all-check" @click="checkAll">
      <CheckButton :is-checked="isSelectAll"></CheckButton>
      <span>全选</span>
    </div>
    <div class="bar-right">
      <div class="all-price">
        <span class="left">合计:</span>
        <span class="center">￥</span>
        <span class="right">{{ allPrice }}</span>
      </div>
      <div class="account" @click="account">结算({{checkedLength}})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList', 'allPrice', 'checkedLength', 'isSelectAll'])
  },
  methods: {
    checkAll(){
      if (this.isSelectAll){
        this.cartList.forEach(item => item.checked = false)
      }else{
        this.cartList.forEach(item => item.checked = true)
      }
    },
    account(){
      if (this.allPrice > 0){
        this.$toast.show("请支付", 3000)
      }else {
        this.$toast.show("请挑选商品", 1000)
      }

    }
  }
}
</script>

<style scoped>
.cart-bottom-bar{
  height: 40px;
  background-color: white;
  /*position: relative;*/
  /*bottom: 40px;*/
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}
.all-check{
  display: flex;
  /*padding-left: 15px;*/
  line-height: 40px;
}
.all-check span{
  padding-left: 5px;
  font-size: 12px;
}
.bar-right{
  display: flex;
  align-items: center;

}
.all-price{
  padding: 0 10px;
}
.all-price .left{
  font-size: 13px;
  line-height: 40px;
}
.all-price .center{
  position: relative;
  top: 2px;
  font-size: 10px;
  line-height: 40px;
}
.all-price .right{
  font-size: 20px;
  line-height: 40px;
  position: relative;
  top: -2px;
  color: #F75000;
}
.account{
  width: 80px;
  text-align: center;
  background-color:	#F75000;
  line-height: 30px;
  border-radius: 10px;
  color: white;
  position: relative;

}
</style>