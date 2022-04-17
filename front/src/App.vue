<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="inline"
        :style="{ position: 'sticky', top: '10px' }"
      >
        <a-sub-menu key="command">
          <span slot="title"> <a-icon type="edit" /><span>Command</span> </span>
          <a-menu-item key="select-command">
            <router-link to="/select-command">Select Command</router-link>
          </a-menu-item>
          <a-menu-item key="input-command">
            <router-link to="/input-command">Input Command</router-link>
          </a-menu-item>
        </a-sub-menu>

        <!-- <a-sub-menu key="measurement">
          <span slot="title">
            <a-icon type="line-chart" /><span>Measurement</span>
          </span>
          <a-menu-item key="flowSize" @click="click_flow_size">
            <router-link to="/flow-size">Flow Size</router-link>
          </a-menu-item>
          <a-menu-item key="flowCount" @click="click_flow_count">
            <router-link to="/flow-count">Flow Count</router-link>
          </a-menu-item>
          <a-menu-item key="flowCoord" @click="click_flow_coord">
            <router-link to="/flow-coord">Flow Coordinate</router-link>
          </a-menu-item>
        </a-sub-menu> -->

        <!-- <a-menu-item key="resources">
          <router-link to="/resources">Resources</router-link>
        </a-menu-item> -->

         
        <a-menu-item key="displayResult"  @click="click_display">
          <a-icon type="line-chart" />
          <router-link to="/display-result" style="display:inline-block">Display</router-link>
        </a-menu-item>
        <a-menu-item key="resources">
          <a-icon type="pie-chart" />
          <!-- <router-link to="/resources" style="display:inline-block">Resources</router-link> -->
          <a href="http://10.21.0.148:3000" style="display:inline-block" target="_blank">Resources</a>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        style="background: #fff; padding: 0; margin-bottom: 20px"
      >
        <h2 class="title">基于P4可编程交换机的意图驱动测量系统</h2>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <keep-alive include="InputCommand,SelectCommand">
            <router-view></router-view>
          </keep-alive>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      collapsed: false,
    };
  },
  sockets: {
    connect: function () {
      console.log("socket连接成功！");
    },
  },
  methods: {
    click_flow_size: function () {
      console.log("clicked flow size!");
      this.$socket.emit("flowsize");
    },
    click_flow_count: function () {
      console.log("clicked flow count!");
      this.$socket.emit("flowcount");
    },
    click_flow_coord: function () {
      console.log("clicked flow coordinate!");
      this.$socket.emit("flowcoord");
    },
    click_display:function(){
      this.$socket.emit("display")
    }
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 20px;
  background: rgba(0, 21, 41, 0.2);
  margin: 16px;
}

.title {
  color: black;
  padding: 0 20px;
  float: left;
}
</style>