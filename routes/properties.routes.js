const express = require('express')
const router =  express.Router()
const propertiesCtrl = require('../controllers/properties.controller')

router.post('/create', propertiesCtrl.create)
router.get('/locations', propertiesCtrl.getLocations)
router.get('/', propertiesCtrl.getProperties)
router.get('/search/', propertiesCtrl.getPropertiesByParams)
router.get('/top3', propertiesCtrl.getTop3)
router.put('/increase-visit', propertiesCtrl.increaseVisits)
router.put('/update-property', propertiesCtrl.updateProperty)
router.delete('/delete-property/:_id', propertiesCtrl.deleteProperty)



module.exports = router