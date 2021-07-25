import "./style.css";
import { Stomp } from "@stomp/stompjs";
import {updateStockData, updateStockTable} from './controller';

global.DEBUG = false;

const url = "ws://localhost:8080/stomp";
const client = Stomp.client(url);


client.debug = (msg) => {
  if (global.DEBUG) {
    console.info(msg);
  }
};

client.connect({}, () => {
  const stocks = {};
  // subscribe to the topic prices
  client.subscribe("/fx/prices", (res) => {
    // receivingstock details from the server
    const fetchedStockDetails = JSON.parse(res.body);
    // update stock market data
    updateStockData(fetchedStockDetails, stocks);
    // update stock market table
    updateStockTable(fetchedStockDetails, stocks);
  });
});
