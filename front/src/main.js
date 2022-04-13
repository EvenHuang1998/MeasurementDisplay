// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入socket.io
import VueSocketIO from "vue-socket.io"
Vue.use(new VueSocketIO({
  debug: false,
  connection:"http://127.0.0.1:10020"
  // connection: "http://10.21.0.148:5000"
}))

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts=echarts


//引入ant-ui
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
