const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Alarm = new Schema(
    {
        label: { type: String, required: true },
        time: { type: Date, required: true },
        status: { type: Boolean, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('alarms', Alarm)