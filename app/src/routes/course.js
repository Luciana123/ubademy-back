const express = require('express');
const verifyIdToken =  require('../../firebase')
const getcookie = require('../middlewares/cookieHandler')

const router = express.Router();

router.get('/:id', async function(req, res) {
    // Verifica que el token de firebase sea valido
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])

        // Pedir al back de python
        console.log(req.params.id);
        body = {
            "id": 1,
            "title": 'Titulo',
            "description": 'Descripcion re copada',
            "stages": [
                {
                    "position": 0,
                    "active": true,
                    "required": false,
                    "multimedia_id": 'idhasheado12yt',
                    "title": 'Stage 0 Title',
                    "multimedia_type": 'Tipo',
                },
                {
                    "position": 1,
                    "active": true,
                    "required": true,
                    "multimedia_id": 'otrohash?',
                    "title": 'Stage 1 Title',
                    "multimedia_type": 'Otro tipo',
                }
            ]
        }
        res.status(200).send(body)
    } catch (e) {
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

router.post('/', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])
        body = {id: 1}
        // Send to back
        res.status(201).send(body)
    } catch (e) {
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

router.put('/:id', async function(req, res) {
    // Verificar request y mandar al back de python
    try {
        let cookies = getcookie(req)
        let uid = await verifyIdToken(cookies[firebaseAuth])
        // Send to back
        res.status(202).send('PUT successful')
    } catch (e) {
        body = {
            error: e
        }
        res.status(400).send(body)
    }
});

module.exports = router;
