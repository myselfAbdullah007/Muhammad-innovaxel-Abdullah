const express = require('express');
const router = express.Router();
const { shortenUrl, getOriginalUrl, updateShortUrl, deleteShortUrl, getUrlStats } = require('../controllers/urlController');

router.post('/shorten', shortenUrl);
router.get('/shorten/:shortCode', getOriginalUrl);
router.put('/shorten/:shortCode', updateShortUrl);
router.delete('/shorten/:shortCode', deleteShortUrl);
router.get('/shorten/:shortCode/stats', getUrlStats);

module.exports = router; 