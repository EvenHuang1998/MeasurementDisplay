import dayjs from "dayjs"
import {mapState} from "vuex"

export default {
    data() {
        return {
            testcount: 0,
            timestamp: "",
            total_flow_count: 0,
            flow: []
        }
    },
    computed: {
        ...mapState({ chart_name: "chart_name" })
    },
    sockets: {
        updateFlowCount: function (val) {
            // console.log(val)
            this.testcount = (this.testcount + 1) % 1000;
            this.timestamp = dayjs().format("MM月DD日 HH:mm:ss")
            this.total_flow = val.flow_count[0];
            this.flow = val.flow_count.slice(1);
        }
    }
}