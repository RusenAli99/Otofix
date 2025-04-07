const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// .env dosyasını yükle
dotenv.config();

// Veritabanına bağlan
connectDB();

// Uygulama başlat
const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('API çalışıyor 🚀');
});

// Port belirle
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/faults', require('./routes/faults'));
app.use('/api/parts', require('./routes/parts'));

