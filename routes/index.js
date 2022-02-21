const { Router } = require('express'),
router = Router()
router.use('/agents', require('../routes/agents.routes'))
router.use('/properties', require('../routes/properties.routes'))

module.exports = router