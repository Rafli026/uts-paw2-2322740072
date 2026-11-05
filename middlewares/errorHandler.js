exports.notFoundHandler = (req, res, next) => {
  res.status(404).json({
    message: `Rute ${req.originalUrl} tidak ditemukan`,
  });
};

exports.errorHandler = (err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Format JSON tidak valid',
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'ID tidak valid',
    }); 
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Data tidak valid',
      detail: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'Nilai unik sudah digunakan',
    });
  }

  const status = err.status || err.statusCode || 500;

  return res.status(status).json({
    message: status < 500
      ? err.message
      : 'Terjadi kesalahan pada server',
  });
};


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
    },
  pemasokId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pemasok',
    required: [true, 'Pemasok wajib dipilih'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Obat', obatSchema);