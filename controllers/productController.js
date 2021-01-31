const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('home', {title: 'Browse Products'})
})

module.exports = router;