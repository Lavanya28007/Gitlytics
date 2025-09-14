const express = require('express');
const router = express.Router();
const { getDevelopers, getDeveloperProfile } = require('../controllers/developerController');


// GET /api/developers?location=india&language=javascript
router.get('/developers', getDevelopers);

// GET /api/developers/:username
router.get('/developers/:username', getDeveloperProfile);

module.exports = router;
