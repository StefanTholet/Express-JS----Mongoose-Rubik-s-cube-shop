const { Router } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
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

router.post('/products/add-cube', async (req, res) => {
    try {
    const cube = await productService.create(req.body);
} catch(err) {
    console.log(err);
    return;
}
    res.redirect('/')
})

router.get('/products/add-accessory', (req, res) => {
    res.render('createAccessory', {title: 'Add an accessory'})
})

router.post('/products/add-accessory', async(req, res) => {
    try {
        const accessory = await accessoryService.create(req.body);
        console.log(accessory);
    } catch(err) {
        console.log(err)
        return;
    }
    res.redirect('/');
});

router.get('/products/:productId/attach', async (req, res) => {
    const cube = await productService.getOne(req.params.productId);
    const accessories = await accessoryService.getUnAttached(cube.accessories);
    res.render('attachAccessory', {title: 'Attach accessory to cube', cube, accessories})
});

router.post('/products/:productId/attach', async (req, res) => {
    const cube = await productService.getOne(req.params.productId);
    const attachPromise = await productService.attachAccessory(cube, req.body.accessory);
    res.redirect('/products/:productId/details')
    console.log(cube)
})

router.get('/products/:productId/details', async (req, res) => {
    let cube = await productService.getCubeAndAccessories(req.params.productId);
    const accessories = cube.accessories;  
    res.render('details', {title: 'Product details', cube, accessories})
});



module.exports = router;