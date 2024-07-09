var express = require('express');
var axios = require('axios');
var router = express.Router();

// Downlink route
router.post('/sendInput', async (req, res) => {
    const { userInput } = req.body;
    if (!userInput) {
        return res.status(400).json({ message: 'Input cannot be empty' });
    }
    try {
        const downlinkConfig = {
            "deviceEUI": "fb8f56ec1b329a63",
            "confirmed": true,
            "data": Buffer.from(userInput).toString('base64'),
            "fPort": 1
        };
        const response = await axios.post('http://222.255.135.133:3004/api/downlink', downlinkConfig, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiJmYjhmNTZlYzFiMzI5YTYzIiwiYXBwSUQiOiIzNyIsImVtYWlsIjoibG9uZy52dTY2MjBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJMb25nMTIzQCIsImlhdCI6MTcxOTg5MjY5NH0.AtiBtwj4tfsxeVUqCJotwbHhmavw5isxCRpaM4pGDhQ'
            }
        });
        res.json({ message: 'Success', data: response.data });
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
            res.status(error.response.status).json({ message: error.response.data });
        } else if (error.request) {
            console.log(error.request);
            res.status(500).json({ message: 'No response from server' });
        } else {
            console.log('Error', error.message);
            res.status(500).json({ message: error.message });
        }
    }
});

module.exports = router;