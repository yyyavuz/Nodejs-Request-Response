const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const expressQueue = require('express-queue');
// for security
const basicAuth = require('express-basic-auth')
const helmet = require('helmet')
const md5 = require('md5');
// Config
process.env.NODE_ENV = 'development';
const config = require('./config/config.js');

// Database

const getir = require('./routes/getir')

//

app.use(cors())

app.use((req, res, next) => {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        data += chunk;
    });

    req.on('end', function () {
        req.body = data;
        next();
    });
});


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    type: 'application/*+json'
}));

app.use((req, res, next) => {

    res.setHeader('X-Frame-Options', '*')
    res.setHeader('Access-Control-Request-Headers', 'Authorization', '*')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Request-Method', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type', 'Accept', '*')
    next();
});
// basic auth if you want
// const aut = "yusuf";

// app.use(basicAuth({
//     users: {
//         'yusuf': md5(aut)
//     }
// }));

// server request limitter and security
app.use(helmet.noCache())
app.use(helmet.frameguard())
app.use(rateLimit({
    windowMs: 60 * 1000, //60 sec
    max: 1000 // request
}))

const queueMw = expressQueue({
    activeLimit: 2,
    queuedLimit: -1
});
app.use(queueMw);

app.disable('x-powered-by');

//check global config service
app.get('/', (req, res) => {
    res.json(global.gConfig)
})
//api route
// app.use('/', broadcastTransaction);
app.use('/api/getir-services', getir);

app.listen(global.gConfig.node_port, () => {
    console.log(`${global.gConfig.app_name} listening on port ${global.gConfig.node_port}`);
});