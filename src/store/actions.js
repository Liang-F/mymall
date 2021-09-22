export default {
  addCart(context, payload){
    return new Promise(resolve => {
      //查找是否存在相同商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //有就加一，无则添加
      if (oldProduct){
        context.commit('addCounter', oldProduct)
        resolve("当前商品+1")
      }else {
        context.commit("addToCart", payload)
        resolve("已加入购物车")
      }
    })

    // //查找是否存在相同商品
    // let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // //有就加一，无则添加
    // if (oldProduct){
    //   context.commit('addCounter', oldProduct)
    // }else {
    //   context.commit("addToCart", payload)
    // }

  },

}