const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.json({msg: 'User works'}));



module.exports = router;