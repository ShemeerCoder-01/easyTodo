const express = require('express');
const { signUpFunc, loginFunc, logoutFunc } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUpFunc);
router.post('/login', loginFunc);
router.post('/logout',logoutFunc);

module.exports = router;