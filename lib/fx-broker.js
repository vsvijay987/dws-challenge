'use strict';

const Mq = require('blackcatmq');
const config = require('./config');

const mq = new Mq({
    protocol: 'websocket',
    host: config.broker.host,
    port: config.broker.port,
});

mq.start();

module.exports = mq;
