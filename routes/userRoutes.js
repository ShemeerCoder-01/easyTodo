const express = require('express');
const { signUpFunc, loginFunc } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUpFunc);
router.post('/login', loginFunc);

module.exports = router;