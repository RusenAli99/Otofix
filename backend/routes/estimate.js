const express = require('express');
const router = express.Router();

// Basit tahmini hesaplama API'si
router.post('/', async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      km,
      fuel,
      gear,
      damageCount,
      tramer
    } = req.body;

    let basePrice = 500000; // Başlangıç fiyatı

    // Yıl etkisi
    if (year < 2018) basePrice -= 50000;

    // Kilometre etkisi
    if (km > 100000) basePrice -= 30000;

    // Yakıt tipi etkisi
    if (fuel?.toLowerCase() === 'dizel') basePrice += 10000;

    // Vites tipi etkisi
    if (gear?.toLowerCase() === 'otomatik') basePrice += 15000;

    // Değişen parça etkisi
    basePrice -= (damageCount || 0) * 10000;

    // Tramer etkisi
    basePrice -= parseInt(tramer || 0);

    // Fiyat aralığı oluştur
    const min = basePrice - 20000;
    const max = basePrice + 20000;

    res.json({
      estimatedPrice: basePrice,
      priceRange: `${min.toLocaleString()} TL - ${max.toLocaleString()} TL`
    });

  } catch (err) {
    console.error('Fiyat tahmini hatası:', err);
    res.status(500).json({ msg: 'Tahmin yapılırken hata oluştu.' });
  }
});

module.exports = router;
