const express = require('express');
const auth = require('../middleware/authMiddleware');
const Vehicle = require('../models/Vehicle');
const router = express.Router();

// Yeni kayıt
router.post('/', auth, async (req, res) => {
  const { plate, model, fault } = req.body;

  try {
    const record = new Vehicle({ user: req.user.id, plate, model, fault });
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).send('Sunucu hatası');
  }
});

module.exports = router;
