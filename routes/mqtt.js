const WebSocket = require('ws');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://vngalaxy.vn:1883');
let messageTimeout;

function resetMessageTimeout(wss) {
    clearTimeout(messageTimeout);
    messageTimeout = setTimeout(() => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(null);
            }
        });
        console.log('Null timeout');
        resetMessageTimeout(wss);
    }, 70000); // 70 seconds
}

function setupMqttClient(wss) {
    client.on('connect', () => {
        console.log('MQTT connected');
        client.subscribe('application/88/device/fb8f56ec1b329a63/event/up');
        resetMessageTimeout(wss); // Start the timeout on connect
    });
    client.on('message', (topic, message) => {
        console.log('Received message from topic %s', topic);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
        resetMessageTimeout(wss); // Reset the timeout on message receive
    });
}

module.exports = { setupMqttClient };