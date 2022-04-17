import Vue from 'vue'
import Router from 'vue-router'
import InputCommand from '@/views/InputCommand'
import SelectCommand from "@/views/SelectCommand"
import FlowCount from '@/views/FlowCount'
import FlowSize from "@/views/FlowSize"
import FlowCoord from "@/views/FlowCoord"
import Resources from "@/views/Resources"
import DisplayResult from "@/views/DisplayResult"
Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: "/",
      name: "SelectCommand",
      component: SelectCommand
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
      path: '/flow-count',
      name: 'FlowCount',
      component: FlowCount
    },
    {
      path: "/flow-size",
      name: "FlowSize",
      component: FlowSize
    },
    {
      path: "/flow-coord",
      name: "FlowCoord",
      component: FlowCoord
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
