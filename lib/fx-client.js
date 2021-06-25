'use strict'
// Client

const { Stomp } = require('@stomp/stompjs')
const startPrices = require('./prices');

const currencies = Object.keys(startPrices)
const publicData = {}
const internal = {}

for (let ccy in startPrices) {
  const spread = Math.random() * 0.05
  const mid = startPrices[ccy]
  internal[ccy] = mid
  publicData[ccy] = {
    name: ccy,
    bestBid: mid - mid * (spread / 2),
    bestAsk: mid + mid * (spread / 2),
    openBid: mid - mid * (spread / 2),
    openAsk: mid + mid * (spread / 2),
    lastChangeAsk: 0,
    lastChangeBid: 0
  }
}

function getRandomCurrency() {
  return currencies[Math.floor(Math.random() * currencies.length)];
}

function tick(client) {
  for (let i = 0; i < Math.random() * 5; i++) {
    const randomCurrency = getRandomCurrency();
    const mid = internal[randomCurrency]
    const spread = Math.random() * 0.05
    const diff = (Math.random() * 0.08 - 0.04) * mid
    const newMid = (mid + diff)
    const bid = newMid - newMid * (spread / 2)
    const ask = newMid + newMid * (spread / 2)
    const data = {
      ...publicData[randomCurrency],
    }
    
    data.lastChangeBid = bid - data.bestBid
    data.lastChangeAsk = ask - data.bestAsk
    data.bestBid = bid
    data.bestAsk = ask

    client.send('/fx/prices', {priority: 9}, JSON.stringify(data))
  }
}

exports.start = function(stompUrl) {
  var client = Stomp.client(stompUrl);

  client.debug = function () {
  };

  client.connect({}, function() {
    console.log('Fake FX data service connected: serving price updates on stomp topic /fx/prices')
    setInterval(() => tick(client), 1000)
  }, function() {
    console.log('Error starting Fake FX data service', arguments)
  })
}
