const express = require('express')
const request = require('request')
const passport = require('passport');
const cookieSession = require('cookie-session');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
services = require('./services.js');
firebase = require('./firebase.js');
require('./passport');
require('dotenv').config();

const app = express()

const port = process.env.PORT

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

// Services mapping

app.use('/', services);
app.use('/failed', services);
app.use('/success', services);
app.use('/ping', services);
app.use('/auth', services);
app.use('/auth/callback', services);
app.use('/logout', services);

app.listen(port, () => {
  console.log(`Ubademy back app listening at http://localhost:${port}`)
});

