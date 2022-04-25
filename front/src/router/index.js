import Vue from 'vue'
import Router from 'vue-router'
import InputCommand from '@/views/InputCommand'
import SelectCommand from "@/views/SelectCommand"
import Resources from "@/views/Resources"
import DisplayResult from "@/views/DisplayResult"
import ShowGrafana from "@/views/ShowGrafana"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: "/",
      name: "homepage",
      component: ShowGrafana
    },
    {
      path: "/frontend",
      name: "ShowGrafana",
      component: ShowGrafana
    },
    {
      path: '/input-command',
      name: 'InputCommand',
      component:InputCommand
    },
    {
      path: "/select-command",
      name: "SelectCommand",
      component: SelectCommand
    },
    {
      path: "/resources",
      name: "Resources",
      component: Resources
    },
    {
      path: "/display-result",
      name: "DisplayResult",
      component:DisplayResult
    }
  ]
})
