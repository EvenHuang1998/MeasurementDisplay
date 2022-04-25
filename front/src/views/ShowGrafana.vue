<template>
  <div style="min-height:100vh;width: 100%;">
    <!-- <iframe src="http://127.0.0.1:3000/d/6Bi9Pmwnz/test_dashboard?orgId=1&from=1650318765109&to=1650340365110&theme=light"></iframe> -->
    <!-- <iframe src="http://localhost:3000/goto/5euUymwnz?orgId=1&kiosk=tv&kiosk" width="100%" height="900px"></iframe> -->
    <!-- <iframe src="http://127.0.0.1:3000/d/6Bi9Pmwnz/test_dashboard?orgId=1&from=1650319687516&to=1650341287516&theme=light&kiosk" width="100%" height="900px"></iframe> -->
    <!-- <iframe src="http://10.21.0.148/client" sandbox="allow-forms allow-scripts allow-same-origin allow-popups" width="100%" height="900px"></iframe> -->
    <h2>基本信息</h2>
    <div class="infraImage">
      
      <div class="imageContainer">
        <h3>系统架构</h3>
        <img src="../../static/infrastructure.png" height="300px" width="500px">
      </div>
      <div class="imageContainer">
        <h3>网络拓扑</h3>
        <img src="../../static/infrastructure2.png" height="300px" width="500px">
      </div>
       
    </div>
    <hr>
    <div class="grafana">
      <h2>历史结果展示</h2>
      <iframe src="http://10.21.0.148:3001/d/zmLWLZwnz/home_page?orgId=1&from=1650349855285&to=1650371455285&theme=light&kiosk" width="100%" height="700px"></iframe>
    </div>
    
  </div>
</template>

<script>
export default {
    name:"ShowGrafana"
}
</script>

<style>

  .grafana{
    margin-top: 20px;
    width: 100%;
    height: 800px;
  }
  .infraImage{
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  .imageContainer{
    border: 1px solid black;
  }
</style>