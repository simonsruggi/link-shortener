const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.json({ shortUrl: `http://localhost:3001/${url.shortCode}` });
    } else {
      const shortCode = shortid.generate();
      url = new Url({
        longUrl,
        shortCode,
      });

      await url.save();
      res.json({ shortUrl: `http://localhost:3001/${shortCode}` });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while shortening the URL' });
  }
});

router.get('/:shortCode', async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;