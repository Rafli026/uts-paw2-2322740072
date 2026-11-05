const Pemasok = require('../models/pemasokModel');

exports.create = async (req, res) => {
  const { kode, nama } = req.body;
  const pemasok = await Pemasok.create({ kode, nama });
  res.status(201).json(pemasok);
};

exports.getAll = async (req, res) => {
  const pemasok = await Pemasok.find();
  res.json(pemasok);
};