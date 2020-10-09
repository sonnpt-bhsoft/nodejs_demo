const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// siteController.index -- function handler
// site.js chứa những trang không có slug

router.get('/contact', siteController.contact);
router.get('/about', siteController.about);
router.get('/', siteController.index);




module.exports = router;