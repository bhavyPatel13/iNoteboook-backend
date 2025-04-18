const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a : 'Hello',
        Number : 1303
    }
    res.json(obj);
});

module.exports = router;