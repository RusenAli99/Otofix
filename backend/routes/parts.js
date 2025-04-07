const express = require('express');
const Part = require('../models/Part');
const router = express.Router();

// Parça ara (örnek: /api/parts?code=123)
router.get('/', async (req, res) => {
  const { code } = req.query;

  try {
    const part = await Part.findOne({ code });
    if (!part) return res.status(404).json({ msg: 'Parça bulunamadı' });
    res.json(part);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
