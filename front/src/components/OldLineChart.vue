<template>
<div id="myChart"></div>
</template>

<script>
export default{
    name:"OldLineChart",
    data(){ 
        return {

        }
    },
    mounted() {
        let myChart=this.$echarts.init(document.getElementById("myChart"))
        myChart.setOption({
            // title:{
            //     text:"vue chart"
            // },
            // xAxis:{
            //     data:["a","b","c"]
            // },
            // yAxis:{

            // },
            // series:[{
            //     name:"人数",
            //     type:"bar",
            //     data:[11,22,33,44]
            // }]
            xAxis: {
                type: 'category',
                data: ['A', 'B', 'C']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: [120, 200, 150],
                type: 'line'
                }
            ]
        })
    }
}
    

</script>

<style>
#myChart{
    height:500px;
    width:500px;
}
</style>