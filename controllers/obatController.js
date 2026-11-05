const mongoose = require('mongoose');
const Obat = require('../models/obatModel');

exports.create = async (req, res) => {
  const {
    kodeObat,
    nama,
    harga,
    golongan,
    kemasan,
    pemasokId,
  } = req.body;

  // Hanya field topik yang diterima; field tambahan diabaikan.
  const obat = await Obat.create({
    kodeObat,
    nama,
    harga,
    golongan,
    kemasan,
    pemasokId,
  });

  await obat.populate('pemasokId', 'kode nama');
  res.status(201).json(obat);
};

exports.getAll = async (req, res) => {
  const filter = {};

  if (req.query.golongan !== undefined) {
    filter.golongan = String(req.query.golongan);
  }

  const query = Obat.find(filter)
    .select('_id kodeObat nama harga golongan');

  // Topik angka: harga. Sort menaik hanya jika query sort dikirim.
  if (req.query.sort !== undefined) {
    if (req.query.sort !== 'harga') {
      return res.status(400).json({
        message: 'sort hanya boleh menggunakan field harga',
      });
    }
    query.sort({ harga: 1 });
  }

  const obat = await query;
  res.json(obat);
};

exports.getById = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
        message: 'ID tidak valid',
    });
  }

  const obat = await Obat.findById(req.params.id)
    .populate('pemasokId', 'kode nama');

  if (!obat) {
    return res.status(404).json({
      message: 'Data obat tidak ditemukan',
    });
  }

  res.json(obat);
};