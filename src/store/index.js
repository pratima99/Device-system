import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Device from './modules/device'

export default new Vuex.Store({
    modules: {
        Device
    },
    strict: false
})
