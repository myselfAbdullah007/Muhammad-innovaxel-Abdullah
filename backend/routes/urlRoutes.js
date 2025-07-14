const express = require('express');
const router = express.Router();
const { shortenUrl, getOriginalUrl, updateShortUrl } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/shorten/:shortCode', getOriginalUrl);
router.put('/shorten/:shortCode', updateShortUrl);

module.exports = router; 