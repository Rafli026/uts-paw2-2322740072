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