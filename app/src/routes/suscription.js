const express = require('express');
const verifyIdToken =  require('../middlewares/firebase')
const suscriptionService = require('../middlewares/suscriptionService')
const ConnectionError = require('../errors/connectionError')
const AuthError = require('../errors/authError')
const ServerError = require('../errors/serverError')

const router = express.Router();

router.post('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        //Logica de wallet

        const response = await suscriptionService.createSuscription(req.params.id)

        res.status(201).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

router.patch('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await suscriptionService.patchSuscription(req.body, req.params.id)

        res.status(202).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

router.get('/:id', async function(req, res) {
    try {
        const uid = await verifyIdToken(req.cookies.firebaseAuth)

        const response = await suscriptionService.getSuscription(req.body, req.params.id)

        res.status(200).send(response)
    } catch (e) {
        const body = {
            error: e.name,
            message: e.message
        }
        if (e instanceof ConnectionError) {
            res.status(500).send(body)
        } else if (e instanceof AuthError) {
            res.status(401).send(body)
        } else if (e instanceof ServerError) {
            res.status(e.status).send(body)
        } else {
            res.status(500).send(body)
        }
    }
})

module.exports = router;