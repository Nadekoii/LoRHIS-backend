var express = require('express');
var axios = require('axios');
var router = express.Router();

// Uplink route
router.post('/refreshStatus', async (req, res) => {
    const headers = {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiJmYjhmNTZlYzFiMzI5YTYzIiwiYXBwSUQiOiIzNyIsImVtYWlsIjoibG9uZy52dTY2MjBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJMb25nMTIzQCIsImlhdCI6MTcxOTg5MjY5NH0.AtiBtwj4tfsxeVUqCJotwbHhmavw5isxCRpaM4pGDhQ'
    };
    const uplinkConfig = {
        "limit": 1
    };
    try {
        const response = await axios.post('https://api.vngalaxy.vn/api/uplink/', uplinkConfig, {headers: headers});
        res.json({ status: true, data: response.data });
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ status: false, message: 'Error fetching status' });
    }
});

module.exports = router;