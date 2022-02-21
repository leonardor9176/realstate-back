const ctrlProperties = {}
const req = require('express/lib/request');
const Property = require('../models/properties.model')

ctrlProperties.create = async (req, res) => {
    try {
        const newProperty = new Property({
            n_rooms: req.body.n_rooms,
            n_bathrooms: req.body.n_bathrooms,
            floor: req.body.floor,
            location: req.body.location,
            address: req.body.address,
            yard: req.body.yard,
            integral_kitchen: req.body.integral_kitchen,
            fee: req.body.fee,
            description: req.body.description,
            picture: req.body.picture,
            agent: req.body.agent,
            visits: 0
        });
        await newProperty.save()
        res.json({
            status: true,
            data: newProperty
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }

}

ctrlProperties.getProperties = async (req, res) => {
    try {
        const properties = await Property.find()
        res.json({
            status: true,
            data: properties
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.getPropertiesByParams = async (req, res) => {

    try {
        const { _id, n_rooms, n_bathrooms, floor, location, yard, integral_kitchen, fee, agent } = req.query
        let searchParams = {}
        if (_id) {
            searchParams._id = _id
        }
        if (n_rooms) {
            searchParams.n_rooms = n_rooms
        }
        if (n_bathrooms) {
            searchParams.n_bathrooms = n_bathrooms
        }
        if (agent) {
            searchParams.agent = agent
        }
        const property = await Property.find(searchParams)
        res.json({
            status: true,
            data: property
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.getLocations = async (req, res) => {
    try {
        const properties = await Property.find()
        const locations = []
        properties.forEach(property => {
            if (!locations.includes(property.location)) {
                locations.push(property.location)
            }
        })
        res.json({
            status: true,
            data: locations
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.getTop3 = async (req, res) => {
    try {
        const properties = await Property.find({ visits: { $gt: 0 } }).sort({ visits: -1 }).limit(3)
        res.json({
            status: true,
            data: properties
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.increaseVisits = async (req, res) => {
    try {
        const { _id } = req.body
        const propery = await Property.findByIdAndUpdate({ _id: _id }, { $inc: { visits: 1 } })
        res.json({
            status: true,
            data: propery
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.updateProperty = async (req, res) => {
    try {
        const { _id } = req.body;
        const property = await Property.findByIdAndUpdate({ _id: _id },
            {
                n_rooms: req.body.n_rooms,
                n_bathrooms: req.body.n_bathrooms,
                floor: req.body.floor,
                location: req.body.location,
                address: req.body.address,
                yard: req.body.yard,
                integral_kitchen: req.body.integral_kitchen,
                fee: req.body.fee,
                description: req.body.description,
                picture: req.body.picture
            });
        const propertyUpdated = await Property.findById(_id)
        res.json({ data: propertyUpdated, status: true })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlProperties.deleteProperty = async (req, res) => {
    try {
        const { _id } = req.params
        const property = await Property.findOneAndDelete({_id: _id})
        if (property) {
            res.json({
                status: true
            })
        }
        else{
            res.json({
                status: false
            })
        }
    }
    catch (error) {
        res.json ({
            status: false,
            error: error
        })
    }
}

module.exports = ctrlProperties
