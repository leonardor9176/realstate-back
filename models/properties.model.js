const mongoose = require('mongoose')

var PropertySchema = new mongoose.Schema
    ({
        n_rooms: { type: Number, required: true },
        n_bathrooms: { type: Number, required: true },
        floor: { type: Number, required: true },
        location: { type: String, lowercase: true, required: true },
        address: { type: String, lowercase: true, required: true, unique: true },
        yard: { type: Boolean, default: false },
        integral_kitchen: { type: Boolean, default: false },
        fee: { type: Number, required: true },
        description: { type: String },
        picture: { type: String },
        agent: { type: mongoose.Schema.Types.ObjectId, ref: 'agents', required: true },
        visits: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now() }
    })

module.exports = mongoose.model('properties', PropertySchema)
