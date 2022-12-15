import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001',
})

export const createAlarm = payload => api.post(`/alarm`, payload)
export const updateAlarm = (id, payload) => api.put(`/alarm/${id}`, payload)

const apis = {
    createAlarm,
    updateAlarm,
}

export default apis