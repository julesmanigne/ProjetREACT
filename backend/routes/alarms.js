var express = require('express')

var AlarmCtrl = require('../controllers/alarmCtrl')

var router = express.Router()

router.post('/alarm', AlarmCtrl.createAlarm)
router.put('/alarm/:id', AlarmCtrl.updateAlarm)
router.delete('/alarm/:id', AlarmCtrl.deleteAlarm)
router.get('/', AlarmCtrl.getAlarm)

module.exports = router;