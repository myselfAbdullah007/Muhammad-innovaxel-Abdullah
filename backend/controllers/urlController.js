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

exports.getOriginalUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const urlDoc = await Url.findByShortCode(shortCode);
    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }
    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve original URL.' });
  }
};

exports.updateShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  const { url } = req.body;
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL.' });
  }
  try {
    const urlDoc = await Url.findOneAndUpdate(
      { shortCode },
      { url, updatedAt: new Date() },
      { new: true }
    );
    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }
    res.status(200).json({
      id: urlDoc._id,
      url: urlDoc.url,
      shortCode: urlDoc.shortCode,
      createdAt: urlDoc.createdAt,
      updatedAt: urlDoc.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update short URL.' });
  }
};

exports.deleteShortUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const result = await Url.findOneAndDelete({ shortCode });
    if (!result) {
      return res.status(404).json({ error: 'Short URL not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete short URL.' });
  }
}; 