<template>
<div>
    <a-card :bordered="true" :hoverable="true">
        <line-chart 
            :testcount="testcount"
            classtype="mainChart" 
            chartid="chartMain" 
            chartname="Total Flow Count"
            :x_data="timestamp"
            :y_data="total_flow_count"
        >
        </line-chart>
    </a-card>
    <a-row :gutter="16">
        <a-col :span="8" v-for="(name,index) in chart_name" :key="name">
            <a-card :bordered="true" :hoverable="true">
                <line-chart 
                    :testcount="testcount"
                    classtype="subChart" 
                    :chartid="name"
                    :chartname="name"
                    :x_data="timestamp"
                    :y_data="flow_count[index]"
                >
                </line-chart>
            </a-card>
        </a-col>
    </a-row>
</div>
</template>

<script>
import LineChart from "@/components/LineChart"
import dayjs from "dayjs"
import {mapState} from "vuex"
// import mixin from "../mixin"
export default{
    name:"FlowCount",
    components:{LineChart},
    // mixins:[mixin]
    data(){
        return {
            // chart_name:[],
            testcount:0,
            timestamp:"",
            total_flow_count:0,
            flow_count:[]
        }
    },
    computed:{
        ...mapState({chart_name:"chart_name"})
    },
    sockets:{
        updateFlowCount:function(val){
            // console.log(val)
            this.testcount=(this.testcount+1)%1000;
            // this.timestamp=new Date().toString().slice(16,24);
            this.timestamp=dayjs().format("MM月DD日 HH:mm:ss")
            this.total_flow_count = val.flow_count[0];
            this.flow_count=val.flow_count.slice(1);
            // this.chart_name=val.chart_name;
        }
    }
}
</script>

<style>

</style>