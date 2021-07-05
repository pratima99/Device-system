import $api from '@/handler/axios'
import store from '@/store/index'

export const SET_DEVICES = 'SET_DEVICES'
export const SET_SELECTED_DEVICE = 'SET_SELECTED_DEVICE'
export const SET_THEME_COLOR = 'SET_THEME_COLOR'
export const SET_STATUS_MESSAGE = 'SET_STATUS_MESSAGE'
export const DELETE_DEVICE = 'DELETE_DEVICE'
export const SET_LOCAL_DEVICES = 'SET_LOCAL_DEVICES'
const state = {
    devices: [],
    selectedDevice: {},
    themeColor: 'theme-light',
    statusMessage: '',
    localDevices: [],
}

const mutations = {
    [SET_DEVICES](state, value) {
        state.devices = value
    },
    [SET_LOCAL_DEVICES](state) {
        state.localDevices = JSON.parse(localStorage.getItem("data"))
    },
    [SET_SELECTED_DEVICE](state, value) {
        state.selectedDevice = value
    },
    [SET_THEME_COLOR](state, value) {
        localStorage.setItem("theme-color", value);
        state.themeColor = value
    },
    [SET_STATUS_MESSAGE](state, value) {
        state.statusMessage = value
    },
    [DELETE_DEVICE](state, value) {
        state.devices = state.devices?.filter(el => el.id !== value)
    }
}

const actions = {
    async getDevices(context) {
        return await $api.get(`/devices`).then(res => {
            context.commit(SET_DEVICES, res.data.devices)
            return res.data.devices;
        }).catch(e => {
            throw e
        })
    },
    async deleteDevice(context, Id) {
        return await $api.delete(`/devices/${Id}`).then(res => {
            context.commit(DELETE_DEVICE, Id)
            return res.data;
        }).catch(e => {
            throw e
        })
    },
    async saveDevice(context, payload) {
        return await $api.post(`/devices`, payload).then(res => {
            store.commit('SET_STATUS_MESSAGE', 'Device saved successfully')
            context.dispatch("getDevices")
            let localData = JSON.parse(localStorage.getItem("data"))
            localData = localData?.filter(el => !payload.devices.some(element => element.name === el.name))
            localStorage.setItem("data", JSON.stringify(localData));
            context.commit(SET_LOCAL_DEVICES)
            return res.data;
        }).catch(e => {
            store.commit('SET_STATUS_MESSAGE', 'Error saving the device')
            throw e
        })
    }
}

/*
|--------------------------------------------------------------------------
| Getters
|--------------------------------------------------------------------------
*/
const getters = {
    devices: state => state.devices,
    localDevices: state => state.localDevices,
    selectedDevice: state => state.selectedDevice,
    themeColor: state => state.themeColor,
    statusMessage: state => state.statusMessage
}

/*
|--------------------------------------------------------------------------
| Export the module
|--------------------------------------------------------------------------
*/
export default {
    state,
    mutations,
    actions,
    getters
}
