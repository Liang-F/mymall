import Toast from "./Toast";

const obj = {}

obj.install = function (Vue){

//  创建组件构造器
  const toastContrustor = Vue.extend(Toast)
//  创建组件对象
  const toast = new toastContrustor()
//  挂载组件对象到元素节点上
  toast.$mount(document.createElement('div'))
//  把元素节点挂载到body上
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj