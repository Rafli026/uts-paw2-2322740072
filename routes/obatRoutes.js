const express = require('express');
const controller = require('../controllers/obatController');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);

module.exports = router;