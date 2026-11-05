const mongoose = require('mongoose');

const pemasokSchema = new mongoose.Schema({
  kode: {
    type: String,
    required: [true, 'Kode pemasok wajib diisi'],
    unique: true,
    trim: true,
    uppercase: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama pemasok wajib diisi'],
    trim: true,
  },
});

module.exports = mongoose.model('Pemasok', pemasokSchema);