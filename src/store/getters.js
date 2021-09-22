export default {
  cartLength(state) {
    return state.cartList.length;
  },
  cartList(state) {
    return state.cartList
  },
  allPrice(state){
    return state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item) => {
      return preValue + item.price * item.count
    }, 0).toFixed(2)
  },
  checkedLength(state){
    return state.cartList.filter(item => item.checked).length
  },
  isSelectAll(state){
    if (state.cartList.length === 0) return false
    return !state.cartList.find(item => !item.checked)
  }



}