const Alarm = require('../models/alarmModel')

createAlarm = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an alarm',
        })
    }

    const alarm = new Alarm(body)

    if (!alarm) {
        return res.status(400).json({ success: false, error: err })
    }

    alarm
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: alarm._id,
                message: 'Alarm created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Alarm not created!',
            })
        })
}

updateAlarm = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Alarm.findOne({ _id: req.params.id }, (err, alarm) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Alarm not found!',
            })
        }
        alarm.name = body.name
        alarm.time = body.time
        alarm.status = body.status
        alarm
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: alarm._id,
                    message: 'Alarm updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Alarm not updated!',
                })
            })
    })
}

deleteAlarm = async (req, res) => {
    await Alarm.findOneAndDelete({ _id: req.params.id }, (err, alarm) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!alarm) {
            return res
                .status(404)
                .json({ success: false, error: `Alarm not found` })
        }

        return res.status(200).json({ success: true, data: alarm })
    }).catch(err => console.log(err))
}

getAlarm = async (req, res) => {
    await Alarm.find({}, (err, alarms) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!alarms.length) {
            return res
                .status(404)
                .json({ success: false, error: `Alarm not found` })
        }
        return res.status(200).json({ success: true, data: alarms })
    }).catch(err => console.log(err))
}

module.exports = {
    createAlarm,
    updateAlarm,
    deleteAlarm,
    getAlarm
}