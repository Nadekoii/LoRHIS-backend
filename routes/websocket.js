const WebSocket = require('ws');
const { setupMqttClient } = require('./mqtt');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });
    setupMqttClient(wss);
    console.log('WebSocket server setup complete');
}

module.exports = { setupWebSocketServer };