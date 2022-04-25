<template>
<div>
    <a-spin :spinning="spinning_status" :tip="spinning_tip">
        <div class="selectCommand">
        <p>选择命令参数</p>
            <span class="inputSpan">task：</span>
            <a-select v-model="select_dict.task" class="inputSelect" showArrow>
                <a-select-option value="flow_size">flow_size</a-select-option>
                <a-select-option value="SYN_flood">SYN_flood</a-select-option>
                <a-select-option value="ACK_flood">ACK_flood</a-select-option>
                <a-select-option value="RST_flood">RST_flood</a-select-option>
                <a-select-option value="FIN_flood">FIN_flood</a-select-option>
                <a-select-option value="DNS_request_flood">DNS_request_flood</a-select-option>
                <a-select-option value="DNS_response_flood">DNS_response_flood</a-select-option>
                <a-select-option value="NTP_response_flood">NTP_response_flood</a-select-option>
                <a-select-option value="SNMP_response_flood">SNMP_response_flood</a-select-option>
                <a-select-option value="SSDP_response_flood">SSDP_response_flood</a-select-option>
                <a-select-option value="ICMP_response_flood">ICMP_response_flood</a-select-option>
                <a-select-option value="HTTP_flood">HTTP_flood</a-select-option>
                <a-select-option value="tcp_connection">tcp_connection</a-select-option>
                <a-select-option value="port_scan">port_scan</a-select-option>
                <a-select-option value="super_spreader">super_spreader</a-select-option>
                <a-select-option value="heavy_hitter">heavy_hitter</a-select-option>
            </a-select>
            <br/>
            <div v-show="type_selected">
                <span v-show="select_dict.task==='flow_size'">
                    <span class="inputSpan">eth type：</span>
                    <a-input v-model="select_dict.eth_type" placeholder="ethernet type" style="display:inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
                
                <span v-show="select_dict.task==='flow_size' || select_dict.task==='super_spreader'">
                    <span class="inputSpan">src ip：</span>
                    <a-input v-model="select_dict.src_ip" placeholder="source ip address" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
                
                <span v-show="select_dict.task!=='super_spreader' && select_dict.task!=='heavy_hitter' &select_dict.task!=='Select task type'">
                    <span class="inputSpan">dst ip：</span>
                    <a-input v-model="select_dict.dst_ip" placeholder="destination ip address" class="inputArgs" style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
                
                
                <span v-show="select_dict.task==='flow_size'">
                     <span class="inputSpan">protocol：</span>
                    <a-input v-model="select_dict.ip_protocol" placeholder="ip protocol" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
               
                
                <span v-show="select_dict.task==='flow_size'">
                    <span class="inputSpan">src port：</span>
                    <a-input v-model="select_dict.src_port" placeholder="source port" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
                
                <span v-show="select_dict.task==='flow_size'">
                    <span class="inputSpan">dst port：</span>
                    <a-input v-model="select_dict.dst_port" placeholder="destination port" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
                
                <span v-show="select_dict.task==='flow_size'">
                    <span class="inputSpan">tcp flags：</span>
                    <a-input v-model="select_dict.tcp_flags" placeholder="tcp flags" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>

                <span v-show="select_dict.task==='flow_size'">
                    <span class="inputSpan">tcp flags：</span>
                    <a-input v-model="select_dict.tcp_flags" placeholder="tcp flags" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>

                <span v-show="select_dict.task!=='Select task type'">
                    <span class="inputSpan" >window：</span>
                    <a-input v-model="select_dict.window" placeholder="window" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span >

                <span v-show="select_dict.task!=='Select task type'">
                    <span class="inputSpan">duration：</span>
                    <a-input v-model="select_dict.duration" placeholder="duration" class="inputArgs"  style="display: inline-block;width:600px;margin-right:5px;margin-bottom:5px;" allow-clear />
                    <br/>
                </span>
            </div>
            

        <a-button type="primary" style="margin-top:10px;margin-bottom:10px" @click="submit_select" block>Submit</a-button>
        <a-button type="primary" style="margin-bottom:10px" @click="submit_run_switch" block>Run Switch</a-button>
    </div>
    <div class="showPrimitives">
        <a-table :columns="columns" :data-source="primitives" style="white-space: pre-line;" bordered>
        </a-table>
    </div>
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
    title: 'primitive',
    dataIndex: 'primitive',
    width: '85%',
    scopedSlots: { customRender: 'primitive' },
  }
];

export default {
  name: "SelectCommand",
  data() {
    return {
        select_dict:{
            task:"select task type",
            eth_type:"",
            src_ip:"",
            dst_ip:"",
            protocol:"",
            src_port:"",
            dst_port:"",
            tcp_flags:"",
            window:"",
            duration:""
        },
        spinning_status:false,
        spinning_tip:"",
        command_num:0,
        primitives:[],
        columns
    }
  },
  computed:{
      type_selected(){
          return this.select_dict.task!=="select task type"
      }
  },
  methods: {
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

        fresh_select(){
            for( const select_key of Object.keys(this.select_dict)){
                if(select_key==="task"){
                    this.select_dict[select_key]="Select task type"
                    continue
                }
                this.select_dict[select_key]=""
            }

        },
        submit_select(){
            let input_data={}
            for( const select_key of Object.keys(this.select_dict)){
                if(this.select_dict[select_key]!==""){
                    input_data[select_key]=this.select_dict[select_key]
                }
            }

            // console.log(JSON.stringify(input_data))
            this.$socket.emit("pre-set",JSON.stringify(input_data))
            this.spinning_status=true
            this.spinning_tip="Compiling..."
            this.fresh_select()
            this.sleep(30000)
        },
        submit_run_switch(){
            this.$socket.emit("run_switch")
            this.spinning_status=true
            this.spinning_tip="Applying..."
            this.sleep_run(15000)
            
        }
  },
  sockets:{
        updateChartName(chart_name){
            this.$store.commit("UPDATE_CHARTNAME",chart_name);
        },
        updatePrimitive(val){
            this.command_num+=1;
            let command_number=this.command_num;
  
            this.primitives.push({
                key:this.command_num.toString(),
                num:command_number,
                primitive:val
            })
        },
        finishCompile(){
            console.log("前端收到finish Compile")
            this.spinning_status=false
            this.spinning_tip=""
        },
        p4_compile_done(){
            console.log('compile done');
        }
  }
};
</script>

<style>
    .inputSpan{
        display:inline-block;
        width:70px;
    }


    .inputSelect{
        margin-right:5px;
        margin-bottom:5px;
        width:600px;
    }

</style>