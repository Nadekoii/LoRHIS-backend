/* Variables */
const WebSocket = require('ws');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://vngalaxy.vn:1883');
let messageTimeout;

// Recursively reset the message timeout each time a message is received
function resetMessageTimeout(wss) {
    // Clear the timeout if it exists
    clearTimeout(messageTimeout);
    // Set a new timeout for 70 seconds
    messageTimeout = setTimeout(() => {
        // Send a null message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(null);
            }
        });
        console.log('MQTT: Null timeout');
        // Reset the timeout
        resetMessageTimeout(wss);
    }, 70000); // 70 seconds
}

// Setup the MQTT client
function setupMqttClient(wss) {
    // Connect to the MQTT broker
    client.on('connect', () => {
        console.log('MQTT connected');
        // Subscribe to the uplink event
        client.subscribe('application/88/device/fb8f56ec1b329a63/event/up');
        resetMessageTimeout(wss); // Start the timeout on connect
    });
    // Handle incoming messages
    client.on('message', (topic, message) => {
        console.log('Received message from topic %s', topic);
        // Send the message to all clients
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        resetMessageTimeout(wss); // Reset the timeout on message receive
    });
}

module.exports = { setupMqttClient };