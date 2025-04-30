const express = require('express');

const bloodBankController = require('../Controllers/bloodBankController');

const authController = require('../Controllers/authController');

const router = express.Router();

router.post('/signup', authController.adminSignup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router
  .route('/bloodrequests')
  .post(bloodBankController.add)
  .get(bloodBankController.getAll);

router
  .route('/bloodrequests/:id')
  .get(bloodBankController.getOne)
  .patch(bloodBankController.update)
  .delete(bloodBankController.delete);
router.post('/bloodBank', bloodBankRouter);
router.post('/bloodDonor', bloodDonorRouter);
router.post('/getCities', userRequestRouter);

module.exports = router;
