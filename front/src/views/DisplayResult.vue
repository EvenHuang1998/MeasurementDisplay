<template>
    <div class="displayResult">
        <div class="displaySize" v-show="chart_name[0].length !== 0">
            <h1>Flow Size</h1>
            <!-- <a-row :gutter="16">
                <a-col :span="8" v-for="(name,index) in chart_name[0]" :key="name">
                    <a-card :bordered="true" :hoverable="true">  -->
                        <!-- style="width:400px;height:500px;"> -->
                        <!-- <line-chart 
                            :testcount="testcount"
                            classtype="subChart" 
                            :chartid="name"
                            :chartname="name"
                            :x_data="timestamp"
                            :y_data="flow_size[index]"
                            :heavy_hitter_data="flow_coord_sum"
                        >
                        </line-chart>
                    </a-card>
                </a-col>
            </a-row> -->
                <a-card :bordered="true" :hoverable="true" v-for="(name,index) in chart_name[0]" :key="name" style="margin: 0 auto;">
                    <line-chart 
                        :testcount="testcount"
                        classtype="subChart" 
                        :chartid="name"
                        :chartname="name"
                        :x_data="timestamp"
                        :y_data="flow_size[index]"
                        :heavy_hitter_data="flow_coord_sum"
                    />
                </a-card>
            <hr/>
        </div>
        
        <div class="displayNum" v-show="chart_name[1].length !== 0">
            <h1>Flow Num</h1>
            <a-row :gutter="16">
                <a-col :span="24" v-for="(name,index) in chart_name[1]" :key="name">
                    <a-card :bordered="true" :hoverable="true">
                        <!-- style="width:400px;height:500px;"> -->
                        <line-chart 
                            :testcount="testcount"
                            classtype="subChart" 
                            :chartid="name"
                            :chartname="name"
                            :x_data="timestamp"
                            :y_data="flow_num[index]"
                        >
                        </line-chart>
                    </a-card>
                </a-col>
            </a-row>
            <hr/>
        </div>
        
        <div class="displayCord" v-show="chart_name[2]">
            <h1>Flow Cordinate</h1>
            <a-table :columns="columns" :data-source="sorted_flow_data" :pagination="false"  bordered>
            </a-table>
        </div>
    </div>
    
</template>

<script>
import dayjs from "dayjs"
import {mapState} from "vuex"
import LineChart from '@/components/LineChart'

const columns = [
  {
    title: 'rank',
    dataIndex: 'rank',
    width: '15%',
    scopedSlots: { customRender: 'columns' },
  },
  {
    title: 'flow',
    dataIndex: 'flow',
    width: '70%',
    scopedSlots: { customRender: 'flow' },
  },
  {
    title: 'count',
    dataIndex: 'count',
    width: '15%',
    scopedSlots: { customRender: 'count' },
  },
];

const BASIC_FLOW_COORD_SIZE = 10000;

function compare(attr){
    return function(flow1,flow2){
        let count1=flow1[attr];
        let count2=flow2[attr];
        return count2-count1
    }
}

export default {
    name:"DisplayResult",
    components:{LineChart},
    data(){
        return{
            testcount:0,
            timestamp:"",
            flow_num:[],
            flow_cord:[],
            total_count: 0,
            columns
        }
    },
    computed:{
        ...mapState({chart_name:"chart_name"}),
        sorted_flow_data(){
            let sorted=this.flow_cord.sort(compare("count"))
            sorted.forEach((item,index)=>{
                item["rank"]=index+1;
                item["key"]=index.toString();
            })
            return sorted
        },
        flow_coord_sum(){
            return this.flow_cord.reduce((prev,curr)=>{
                    if(curr['count'] > 0){
                        return prev+curr['count']+BASIC_FLOW_COORD_SIZE;
                    }else{
                        return prev;
                    }
            }, 0);
        }
    },
    sockets:{
        updateChartData:function(val){
            // console.log('val!!!!!', this.flow_coord_sum);
            this.testcount=(this.testcount+1)%1000;
            this.timestamp=dayjs().format("HH:mm:ss")
            this.flow_size=val[0]
            this.flow_num=val[1]
            this.flow_cord=val[2]
        }
    }
}
</script>

<style>

</style>