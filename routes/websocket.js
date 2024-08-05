/* Variables */
const WebSocket = require('ws');
const { setupMqttClient } = require('./mqtt');

/* WebSocket Setup */
function setupWebSocketServer(server) {
    // Create WebSocket server
    const wss = new WebSocket.Server({ server });
    // Setup MQTT client
    setupMqttClient(wss);
    console.log('WebSocket server setup complete');
}

module.exports = { setupWebSocketServer };