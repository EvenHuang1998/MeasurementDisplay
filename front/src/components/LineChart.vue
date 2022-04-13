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
                series: [
                    {
                        data: [],
                        type: 'line'
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
        }
    },
    methods:{
        setOption(){
            this.chart.setOption(this.option)
        },
        updateOption(){
            if(this.option.series[0].data.length==15){
                this.option.series[0].data.shift();
                this.option.xAxis.data.shift();
            }
            this.option.series[0].data.push(this.y_data);
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
        this.chart.setOption(
            {
                title:{
                    left:"center",
                    text:this.chartname
                },
                legend:{
                    show:false,
                    data:[this.chartname],
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
                        name:this.chartname,
                        type:"line",
                        data:[],
                        label:{
                            show:true,
                            position:"top",
                            rotate:45,
                            textStyle:{
                                fontSize:10
                            }
                        }
                    }
                ]

            }
        )
    }

}
    

</script>

<style>

.subChart{
    width: 400px;
    height:500px;
    display: inline-block;
}

.mainChart{
    width: 1000px;
    height: 700px;
    margin: 0px auto;
    margin-bottom: 10px;
}
</style>