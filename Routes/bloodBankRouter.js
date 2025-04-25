const express = require('express');
const bloodBankController = require('../Controllers/bloodBankController');
const router = express.Router();

router.post('/', bloodBankController.add);
module.exports = router;
