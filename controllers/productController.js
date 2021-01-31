const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
router.get('/', async (req, res) => {
    const cubes = await productService.getAll() 
    res.render('home', {title: 'Browse Products', cubes})
});

router.get('/about', (req, res) => {
    
    res.render('about', {title: 'About us'});
});

router.get('/products/add-cube', (req, res) => {
    res.render('create', {title: 'Add a cube'})
});

router.get('/products/:productId/details', async (req, res) => {
    const cube = await productService.getOne(req.params.productId);
    console.log(cube)
    res.render('details', {title: 'Product details', cube})
});

router.post('/products/add-cube', async (req, res) => {
    try {
    const cube = await productService.create(req.body);
} catch(err) {
    console.log(err)
}
    res.redirect('/')
})

module.exports = router;