const express = require('express')
const router = express.Router();

const controller  = require('../controllers/sendEmail.controller')

router.post('/', controller.sendEmail);

router.get('/check-email/:token', controller.checkEmail);

module.exports = router;