<template>
<div>
    <a-card :bordered="true" :hoverable="true">
        <line-chart 
            :testcount="testcount"
            classtype="mainChart" 
            chartid="chartMain" 
            chartname="Total Flow Size"
            :x_data="timestamp"
            :y_data="total_flow_size"
        >
        </line-chart>
    </a-card>
    <a-row :gutter="16">
        <a-col :span="8" v-for="(name,index) in chart_name" :key="name">
            <a-card :bordered="true" :hoverable="true">
                <line-chart 
                    :testcount="testcount"
                    :classtype="'subChart'" 
                    :chartid="name"
                    :chartname="name"
                    :x_data="timestamp"
                    :y_data="flow_size[index]"
                >
                </line-chart>
            </a-card>
        </a-col>
    </a-row>
</div>
</template>

<script>
import LineChart from "@/components/LineChart"
import {mapState} from "vuex"
import dayjs from "dayjs"
export default{
    name:"FlowSize",
    components:{LineChart},
    data(){
        return {
            // chart_name:[],
            testcount:0,
            timestamp:"",
            total_flow_size:0,
            flow_size:[]
        }
    },
    computed:{
        ...mapState({chart_name:"chart_name"})
    },
    sockets:{
        // updateCommand:function(val){
        //     console.log("in flowsize");
        //     this.chart_name=val;
        // },
        updateFlowSize:function(val){
            console.log(val)
            this.testcount=(this.testcount+1)%1000;
            this.timestamp=dayjs().format("MM月DD日 HH:mm:ss")
            this.total_flow_size = val.flow_size[0];
            this.flow_size=val.flow_size.slice(1);
        }
    }
}
</script>

<style>
</style>