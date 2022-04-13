<template>
<div class="inputPage">

  <a-spin :spinning="spinning" size="large" tip="指令解析中...">
    <a-textarea
        v-model="command"
        placeholder="Input Command"
        :auto-size="{ minRows: 3, maxRows: 5 }"
    />
    <a-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="submitCommand" block>
      Submit
    </a-button>
    <h2>EXAMPLES</h2>

    <div class="inputTips">
      <a-card >
        from my_lang.primitives import *
        m1 = Match('match_ipv4_dst1', "ipv4.dst_addr == 10.22.0.201", None)
        a1 = Count('packet_counter_add_1', "lambda(): { packet_counter1 = 1 + packet_counter1 }")

        m2 = Match('match_ipv4_src2', "ipv4.dst_addr == 10.22.0.201", None)
        a2 = Count('packet_counter_add_2', "lambda(): { packet_counter2 = packet_counter2 + 1 }")

        m3 = Match('match_ipv4_dst3', "ipv4.dst_addr == 10.0.0.3", None)
        a3_1 = Count('packet_counter_add_3_1', "lambda(): { packet_counter3_1 = packet_counter3_1 + 3 }")
        a3_2 = Count('packet_counter_add_3_2', "lambda(): { packet_counter3_2 = packet_counter3_2 + 4 }")

        measurement = (m1 >> a1) + (m2 >> a2) + (m3 >> (a3_1 + a3_2))
      </a-card>
      <a-card>
        <p>
        from my_lang.primitives import *
        m1 = Match('match_ipv4_dst1', "ipv4.dst_addr == 10.22.0.201", None)
        a1 = Count('packet_counter_add_1', "lambda(): { packet_counter1 = 1 + packet_counter1 }")

        m2 = Match('match_ipv4_dst2', "ipv4.dst_addr == 10.0.0.2", None)
        a2 = Count('packet_counter_add_2', "lambda(): { packet_counter2 = packet_counter2 + 2 }")

        m3 = Match('match_ipv4_dst3', "ipv4.dst_addr == 10.0.0.3", None)
        a3_1 = Count('packet_counter_add_3_1', "lambda(): { packet_counter3_1 = packet_counter3_1 + 3 }")
        a3_2 = Count('packet_counter_add_3_2', "lambda(): { packet_counter3_2 = packet_counter3_2 + 4 }")

        measurement = (m1 >> a1) + (m2 >> a2) + (m3 >> (a3_1 + a3_2))
        </p>
      </a-card>
      <a-card>
        <p>
        from my_lang.primitives import *
        m1 = Match('match_ipv4_dst1', "ipv4.dst_addr == 10.22.0.201")
        a1 = Count('packet_counter_add_1', "lambda(): { packet_counter1 = 1 + packet_counter1 }")

        m2 = Match('match_ipv4_dst2', "ipv4.dst_addr == 10.22.0.201")
        a2 = Sketch('flow_cordinality', "hash_key: { ipv4.src_addr, tcp.dst_port }", "TOP16")

        measurement = (m1 >> a1) + (m2 >> a2)
        </p>
      </a-card>
    </div>
    
    <a-table :columns="columns" :data-source="command_record" bordered>
    </a-table>
  </a-spin>
    
</div>
</template>

<script>
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
            spinning:false,
            command:"",
            command_num:0,
            command_record:[],
            columns
        }
    },
    sockets:{
      updateChartName(chart_name){
        this.$store.commit("UPDATE_CHARTNAME",chart_name.chart_name.slice(1));
      },
      compileDone(){
        this.spinning=false;
        console.log("compile done");
      }
    },

    methods:{
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
            this.command="";
            // this.spinning=true;
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