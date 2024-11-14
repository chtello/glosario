const myController = require('../controllers/myController');
const express = require('express');
const router = express.Router();

router.route('/').get(myController.Principal); 
router.route('/gls').get(myController.gls);    
router.get('/glosario', (req, res) => {     
    res.render('gls');
});

module.exports = router;