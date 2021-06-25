'use strict';

if (typeof TextEncoder !== 'function') {
  const TextEncodingPolyfill = require('text-encoding');
  TextEncoder = TextEncodingPolyfill.TextEncoder;
  TextDecoder = TextEncodingPolyfill.TextDecoder;
}
  
Object.assign(global, { WebSocket: require('websocket').w3cwebsocket });
