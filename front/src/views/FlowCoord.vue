<template>
    <div>
        <a-table :columns="columns" :data-source="sorted_flow_data" :pagination="false"  bordered>
        </a-table>
    </div>
</template>

<script>
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
// const flow_data = [];
// for (let i = 0; i < 10; i++) {
//   flow_data.push({
//     key: i.toString(),
//     flow: `src:xxx dest:xxx ${i}`,
//     count: Math.random(),
//   });
// }

function compare(attr){
    return function(flow1,flow2){
        let count1=flow1[attr];
        let count2=flow2[attr];
        return count2-count1
    }
}

export default {
    data() {
        return {
            flow_data:[],
            columns
        };
    },
    
    computed:{
        sorted_flow_data(){
            let sorted=this.flow_data.sort(compare("count"))
            sorted.forEach((item,index)=>{
                item["rank"]=index+1;
                item["key"]=index.toString();
                // item["flow"]=`src:xxx dest:xxx ${index}`,
                // item["count"]=Math.random()
            })
            return sorted
        }
    },

    sockets:{
        updateFlowCoord(val){
            console.log(this.flow_data)
            this.flow_data=val.rank;
        },
        updateFlowCount:function(val){
            console.log('val!!!', val)
            this.testcount=(this.testcount+1)%1000;
            // this.timestamp=new Date().toString().slice(16,24);
            this.timestamp=dayjs().format("MM月DD日 HH:mm:ss")
            this.total_flow_count = val.flow_count[0];
            this.flow_count=val.flow_count.slice(1);
            // this.chart_name=val.chart_name;
        }
        // updateFlowCount:function(val){
        //     // console.log(val)
        //     this.testcount=(this.testcount+1)%1000;
        //     // this.timestamp=new Date().toString().slice(16,24);
        //     this.timestamp=dayjs().format("MM月DD日 HH:mm:ss")
        //     this.total_flow_count = val.flow_count[0];
        //     this.flow_count=val.flow_count.slice(1);
        //     // this.chart_name=val.chart_name;
        // }
    }
};
</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>