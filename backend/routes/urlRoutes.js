const express = require('express');
const router = express.Router();
const { shortenUrl, getOriginalUrl } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/shorten/:shortCode', getOriginalUrl);

module.exports = router; 