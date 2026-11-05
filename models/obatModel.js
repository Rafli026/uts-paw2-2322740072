const mongoose = require('mongoose');

const kemasanSchema = new mongoose.Schema(
  {
    bentuk: {
      type: String,
      required: [true, 'Bentuk kemasan wajib diisi'],
      trim: true,
    },
    isi: {
      type: String,
      required: [true, 'Isi kemasan wajib diisi'],
      trim: true,
    },
  },
  { _id: false }
);

const obatSchema = new mongoose.Schema({
  kodeObat: {
    type: String,
    required: [true, 'Kode obat wajib diisi'],
    unique: true,
    trim: true,
  },
  nama: {
    type: String,
    required: [true, 'Nama obat wajib diisi'],
    trim: true,
  },
  harga: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [0, 'Harga minimal 0'],
  },
  golongan: {
    type: String,
    required: [true, 'Golongan wajib diisi'],
    trim: true,
  },
  kemasan: {
    type: kemasanSchema,
    required: [true, 'Kemasan wajib diisi'],