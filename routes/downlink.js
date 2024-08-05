/* Variables */
var express = require('express');
var axios = require('axios');
var router = express.Router();

/* Downlink API */
// Downlink route
router.post('/sendInput', async (req, res) => {
    // Get user input from request body
    const { userInput } = req.body;
    try {
        // Downlink configuration
        const downlinkConfig = {
            "deviceEUI": "fb8f56ec1b329a63",
            "confirmed": true,
            "data": Buffer.from(userInput).toString('base64'),
            "fPort": 1
        };
        // Send downlink request to the server with the configuration and authorization header
        const response = await axios.post('http://222.255.135.133:3004/api/downlink', downlinkConfig, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiJmYjhmNTZlYzFiMzI5YTYzIiwiYXBwSUQiOiIzNyIsImVtYWlsIjoibG9uZy52dTY2MjBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJMb25nMTIzQCIsImlhdCI6MTcxOTg5MjY5NH0.AtiBtwj4tfsxeVUqCJotwbHhmavw5isxCRpaM4pGDhQ'
            }
        });
        // Send response back to the client
        res.json({ message: 'Success', data: response.data });
    } catch (error) { // Catch any errors and send the error message back to the client
        if (error.response) { // Check if the error has a response
            console.log(error.response.data);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) { // Check if the error has a request
            console.log(error.request);
            res.status(500).json({ message: 'No response from server' });
        } else {  // Otherwise, log the error message and send a generic error message back to the
            console.log('Error', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});

module.exports = router;