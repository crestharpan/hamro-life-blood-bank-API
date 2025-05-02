const express = require('express');

const requestController = require('../Controllers/bloodRequestController');
const bloodBankController = require('../Controllers/bloodBankController');
const bloodDonorController = require('../Controllers/bloodDonorController');
const authController = require('../Controllers/authController');

const router = express.Router();

router.post('/signup', authController.adminSignup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassword);

//PROTECTING OTHER ROUTES
router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.get('/logout', authController.logout);
/////////////////////BLOOD REQUESTS ROUTES ///////

router
  .route('/bloodRequests')
  .post(requestController.request)
  .get(requestController.getAll);

router
  .route('/bloodrequests/:id')
  .patch(requestController.update)
  .delete(requestController.delete);

/////////////////////// BLOOD BANK ROUTES//////////////
router
  .route('/bloodBank')
  .post(bloodBankController.add)
  .get(bloodBankController.getAll);

router
  .route('/bloodBank/:id')
  .get(bloodBankController.getOne)
  .patch(bloodBankController.update)
  .delete(bloodBankController.delete);

///////////////// BLOOD DONOR ROUTES ///////////////

router
  .route('bloodDonor')
  .post(bloodDonorController.add)
  .get(bloodDonorController.getAll);

router
  .route('bloodDonor/:id')
  .get(bloodDonorController.getOne)
  .patch(bloodDonorController.update)
  .delete(bloodDonorController.delete);

////// CITY ROUTES //////

router.get('/cities', requestController.getCities);
module.exports = router;
