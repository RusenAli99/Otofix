const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Ortam değişkenlerini yükle
dotenv.config();

// MongoDB bağlantısını başlat
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('API çalışıyor 🚀');
});

// Route tanımlamaları
app.use('/api/auth', require('./routes/auth'));
app.use('/api/faults', require('./routes/faults'));
app.use('/api/parts', require('./routes/parts'));
app.use('/api/estimate', require('./routes/estimate'));

// Sabit PORT tanımı
const PORT = 3000;

app.listen(PORT, () => console.log(`✅ Sunucu ${PORT} portunda çalışıyor`));
