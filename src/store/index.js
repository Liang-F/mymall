import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // state: {
  //   cartList: []
  // },
  // mutations: {
  //   addCounter(state, payload){
  //     payload.count++
  //     console.log("加一")
  //   },
  //   addToCart(state, payload){
  //     payload.count = 1
  //     state.cartList.push(payload)
  //     console.log("新加")
  //   },
  //
  //
  //
  // },
  // actions: {
  //   addCart(context, payload){
  //     //查找是否存在相同商品
  //     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  //     //有就加一，无则添加
  //     if (oldProduct){
  //       context.commit('addCounter', oldProduct)
  //     }else {
  //       // payload.count = 1
  //       context.commit("addToCart", payload)
  //
  //       // state.cartList.push(payload)
  //     }
  //
  //   }
  // }
})

export default store
