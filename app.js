require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const obatRoutes = require('./routes/obatRoutes');
const pemasokRoutes = require('./routes/pemasokRoutes');

const {
  notFoundHandler,
  errorHandler,
} = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.use('/pemasok', pemasokRoutes);
app.use('/obat', obatRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');

    app.listen(process.env.PORT, () => {
      console.log(`Server aktif di http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Gagal terhubung ke MongoDB:', error.message);
    process.exit(1);
  });