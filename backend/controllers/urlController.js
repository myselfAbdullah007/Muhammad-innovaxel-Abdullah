const Url = require('../models/urlModel');
const generateShortCode = require('../utils/shortCodeGenerator');

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

exports.shortenUrl = async (req, res) => {
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }

  // Generate a unique short code
  let shortCode;
  let exists = true;
  do {
    shortCode = generateShortCode();
    // eslint-disable-next-line no-await-in-loop
    exists = await Url.findByShortCode(shortCode);
  } while (exists);

  try {
    const newUrl = await Url.createUrl({ url, shortCode });
    res.status(201).json({
      id: newUrl._id,
      url: newUrl.url,
      shortCode: newUrl.shortCode,
      createdAt: newUrl.createdAt,
      updatedAt: newUrl.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create short URL.' });
  }
}; 