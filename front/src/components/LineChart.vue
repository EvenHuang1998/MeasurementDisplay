<template>
<div>
    <div :id="chartid" :class="classtype"></div>
</div>
</template>

<script>
export default{
    name:"LineChart",
    data(){
        return {
            option:{
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                legend:{
                    data:["total"],
                    orient: 'vertical',
                    x: 'left',
                    y: 'top'
                },
                series: [
                    {
                        name: 'total',
                        data: [],
                        type: 'line',
                        smooth: true
                    },
                    {
                        name: 'heavy_hitter',
                        data: [],
                        type: 'line',
                        smooth: true
                    }
                ]
            },
            total_option:{
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                legend:{
                    data:["total", 'heavy_hitter'],
                    orient: 'vertical',
                    x: 'left',
                    y: 'top'
                },
                series: [
                    {
                        name: 'total',
                        data: [],
                        type: 'line',
                        smooth: true
                    },
                    {
                        name: 'heavy_hitter',
                        data: [],
                        type: 'line',
                        smooth: true
                    }
                ]
            }
        }
    },
    props:{
        testcount:{
            type:Number
        },
        classtype:{
            type:String
        },
        chartid:{
            type:String
        },
        chartname:{
            type:String
        },
        x_data:{
            type:String
        },
        y_data:{
            type:Number
        },
        heavy_hitter_data:{
            type: Number
        }
    },
    methods:{
        setOption(){
            this.chart.setOption(this.option)
        },
        updateOption(){
            if(this.option.series[0].data.length==50){
                this.option.series[0].data.shift();
                if(this.chartname==='all_flow_lemon'){
                    this.option.series[1].data.shift();
                }
                this.option.xAxis.data.shift();
            }
            this.option.series[0].data.push(this.y_data);
            if(this.chartname==='all_flow_lemon'){
                this.option.series[1].data.push(this.heavy_hitter_data);
                if(!this.option.legend.data.includes('heavy_hitter')){
                    this.option.legend.data.push('heavy_hitter');
                }
            }
            this.option.xAxis.data.push(this.x_data);
        }
    },
    watch:{
        testcount:{
            handler(newVal){
                if(this.chart){
                    if(newVal){
                        this.updateOption();
                        this.setOption(this.option);
                    }
                }
            },
            deep:true
        }
    },
    mounted() {
        this.chart=this.$echarts.init(document.getElementById(this.chartid));
        if(this.chartname === 'all_flow_lemon'){
            this.chart.setOption(
            {
                title:{
                    left:"center",
                    text:this.chartname
                },
                legend:{
                    data:['total', 'heavy_hitter'],
                    orient: 'vertical',
                    x: 'left',
                    y: 'top'
                },
                xAxis:{
                    data:[],
                    axisLabel:{
                        rotate:45,
                        interval:0
                    }
                },
                grid:{
                    bottom:"30%"
                },
                yAxis:{
                    type:"value"
                },
                series:[
                    {
                        name:"total",
                        type:"line",
                        data:[],
                        // label:{
                        //     show:true,
                        //     position:"top",
                        //     rotate:45,
                        //     textStyle:{
                        //         fontSize:10
                        //     }
                        // },
                        smooth: true
                    },
                    {
                        name:'heavy_hitter',
                        type:"line",
                        data:[],
                        smooth: true
                        // label:{
                        //     show:true,
                        //     position:"top",
                        //     rotate:45,
                        //     textStyle:{
                        //         fontSize:10
                        //     }
                        // }
                    }
                ]
            }
        )
        }else{
            this.chart.setOption(
            {
                title:{
                    left:"center",
                    text:this.chartname
                },
                legend:{
                    data:['total'],
                    orient: 'vertical',
                    x: 'left',
                    y: 'top'
                },
                xAxis:{
                    data:[],
                    axisLabel:{
                        rotate:45,
                        interval:0
                    }
                },
                grid:{
                    bottom:"30%"
                },
                yAxis:{
                    type:"value"
                },
                series:[
                    {
                        name:"total",
                        type:"line",
                        data:[],
                        smooth: true
                        // label:{
                        //     show:true,
                        //     position:"top",
                        //     rotate:45,
                        //     textStyle:{
                        //         fontSize:10
                        //     }
                        // }
                    }
                ]
            }
        )
        }
        
    }
}

</script>

<style>

.subChart{
    width: 90%;
    height: 550px;
    /* display: inline-block; */
}

.mainChart{
    width: 1000px;
    height: 700px;
    margin: 0px auto;
    margin-bottom: 10px;
}
</style>