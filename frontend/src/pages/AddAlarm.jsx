import React, { Component } from 'react'
import api from '../api'

class AddAlarm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            label: '',
            time: '',
            status: '',
        }
    }

    handleChangeInputName = async event => {
        const label = event.target.value
        this.setState({ label })
    }

    handleChangeInputDate = async event => {
        const time = event.target.validity.valid
            ? event.target.value
            : this.state.time

        this.setState({ time })
    }

    handleIncludeAlarm = async () => {
        const { label, time, status } = this.state
        const payload = { label, time, status }

        await api.createAlarm(payload).then(res => {
            window.alert(`Alarm inserted successfully`)
            this.setState({
                label: '',
                time: '',
                status: '',
            })
        })
    }
}

export default AddAlarm