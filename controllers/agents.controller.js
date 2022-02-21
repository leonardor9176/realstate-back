const req = require('express/lib/request')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const ctrlAgents = {},
    Agent = require('../models/agents.model')

ctrlAgents.create = async (req, res) => {
    try {
        const newAgent = new Agent({
            name: req.body.name,
            document: req.body.document,
            password: req.body.password,
            phone: req.body.phone
        });
        await newAgent.save()
        res.json({ status: true })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }

}

ctrlAgents.getAgentByParams = async (req, res) => {
    console.log('searching ', req.query)
    try {
        const { name, document, phone, id } = req.query
        let searchParams = {}
        if (name) {
            searchParams.name = name
        }
        if (document) {
            searchParams.document = document
        }
        if (phone) {
            searchParams.phone = phone
        }
        if (id) {
            searchParams._id = id
        }
        const agent = await Agent.find(searchParams)
        res.json({
            status: true,
            data: {
                agent: agent
            }
        })
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlAgents.validateLogin = async (req, res) => {
    console.log(req.body)
    try {
        const { document, password } = req.body
        const agent = await Agent.findOne({ document: document })
        // console.log(agent)
        if (!agent) {
            res.json({
                status: false,
                message: 'No se encontró el agente'
            })
        }
        const validation = await bcrypt.compare(password, agent.password)
        console.log('validation ', validation)
        if (validation) {

            const token = jwt.sign({ _id: agent._id, name: agent.name, document: agent.document }, 'RESTFULAPIs')

            res.json({
                status: true,
                data: {
                    agent: {
                        id: agent.id,
                        token: token
                    }
                }
            })
        }
        else {
            res.json({
                status: false,
                error: 'La contraseña ingesada es incorrecta'
            })
        }

    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

ctrlAgents.validateToken = async (req, res) => {

    try {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            const agent = jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs')
            console.log(agent)
            res.json({
                status: true,
                data: {
                    agent: {
                        id: agent._id
                    }
                }
            })
        } else {
            res.json({
                status: false,
                error: 'parametros invalidos'
            })
        }
    }
    catch (error) {
        res.json({
            status: false,
            error: error
        })
    }
}

module.exports = ctrlAgents