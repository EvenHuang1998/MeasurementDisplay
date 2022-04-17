<template>
<div class="inputPage">

  <a-spin :spinning="spinning_status" :tip="spinning_tip">
    <div style="display:flex;">
      <a-textarea
        v-model="command"
        placeholder="Input Command"
        :auto-size="{ minRows: 25, maxRows: 30 }"
        style="width:50%;"
      />
      <a-card>
          <p>
            from my_lang.primitives import *

            #1、测量指定IP对之间的数控包个数
            m1 = Match('match1', "ipv4.src_addr == 10.22.0.200 && ipv4.dst_addr == 10.22.0.201")
            a1 = Count('flow_count', "lambda(): { packet_counter = packet_counter + 1 }")

            #2、测量tcp数据包个数
            m2 = Match('match2', "ipv4.protocol == 0x06")
            a2 = Count('tcp_count', "lambda(): { tcp_counter = tcp_counter + 1 }")

            #3、测量指定目的IP建立tcp连接数
            m3 = Match('match3', "ipv4.dst_addr == 10.22.0.201")
            a3 = Reduce('flow_num_count', "hash_key: { ipv4.src_addr,tcp.src_port,tcp.dst_port}")

            #4、测量top16最大流
            m4 = Match('match4', "ipv4.protocol == 0x06")
            a4 = Sketch('top_flow', "hash_key: { ipv4.src_addr, tcp.dst_port }","TOP16",10000)
            # ...

            measurement = (m1 >> a1) + (m2 >> a2) + (m3 >> a3) + (m4 >> a4)
            measurement.window = 5
            measurement.duration = 100
          </p>
        </a-card>
    </div>
    
    <a-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="submitCommand" block>
      Submit
    </a-button>
    <a-button type="primary" style="margin-bottom:10px" @click="submit_run_switch" block>Run Switch</a-button>    
    <a-table :columns="columns" :data-source="command_record" bordered>
    </a-table>
  </a-spin>
    
</div>
</template>

<script>
import { notification } from 'ant-design-vue';

const columns = [
  {
    title: 'num',
    dataIndex: 'num',
    width: '15%',
    scopedSlots: { customRender: 'num' },
  },
  {
    title: 'command',
    dataIndex: 'command',
    width: '55%',
    scopedSlots: { customRender: 'command' },
  },
  {
    title: 'timestamp',
    dataIndex: 'timestamp',
    width: '30%',
    scopedSlots: { customRender: 'timestamp' },
  },
];
import dayjs from "dayjs"

export default{
    name:"InputCommand",
    data(){
        return {
            spinning_status:false,
            spinning_tip:"",
            command:"",
            command_num:0,
            command_record:[],
            columns
        }
    },
    sockets:{
      updateChartName(chart_name){
        console.log("updateChartName")
        console.log(chart_name)
        this.$store.commit("UPDATE_CHARTNAME",chart_name);
      }
    },

    methods:{
        sleep(ms){
            setTimeout(()=>{
                this.spinning_status=false
                this.spinning_tip=""
            },ms)
        },
        sleep_run(ms){
            setTimeout(()=>{
                this.spinning_status=false
                this.spinning_tip=""
                this.openNotificationWithIcon("success")
            },ms)
            
        },
        openNotification(){
            notification.open({
                    message: '提交运行成功！',
                    description:'P4代码已部署到交换机，监控程序启动，请到Display页面查看结果！',
                onClick: () => {
                    console.log('Notification Clicked!');
                },
            })
        },
        openNotificationWithIcon(type){
            notification[type]({
            message: '提交运行成功！',
            description:
            'P4代码已部署到交换机，监控程序启动，请到Display页面查看结果！',
          });
        },

        submitCommand(){
            this.command_num+=1;
            let command_number=this.command_num;
            let timestamp=dayjs().format("MM-DD HH:mm:ss");
            let command=this.command;
            this.command_record.push({
                key:this.command_num.toString(),
                num:command_number,
                command:command,
                timestamp:timestamp
            });
            this.$socket.emit("command",command);
            // this.command="";
            this.spinning_status=true
            this.spinning_tip="Compiling..."
            this.sleep(60000)
            // this.spinning=true;
        },
        submit_run_switch(){
            this.$socket.emit("run_switch")
            this.spinning_status=true
            this.spinning_tip="Applying..."
            this.sleep_run(15000)
            
        }
    }
}
</script>

<style>
.ant-table-row-cell-break-word{
  white-space:pre-line;
}
.inputTips{
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.ant-card-body{
  white-space:pre-line;
}
</style>

{
  list:[
    {
      text:txt
    }
  ]
}