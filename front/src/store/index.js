import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
    chart_name:[]
}

const actions = {
    
}

const mutations = {
    UPDATE_CHARTNAME(state, value) {
        console.log("触发了mutation修改chartname")
        state.chart_name = value
        console.log(state.chart_name)
    }
}

export default new Vuex.Store({
    state,
    mutations
})