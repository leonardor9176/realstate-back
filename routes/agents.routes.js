const express = require('express')
const router =  express.Router()
const agentsCtrl = require('../controllers/agents.controller')

router.post('/create', agentsCtrl.create)
router.post('/login', agentsCtrl.validateLogin)
router.get('/search/', agentsCtrl.getAgentByParams)
router.get('/validate-token', agentsCtrl.validateToken)


module.exports = router