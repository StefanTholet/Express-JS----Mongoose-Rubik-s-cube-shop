const { Router, query } = require('express');
const router = Router();
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');

router.get('/', async (req, res) => {
    const cubes = await productService.getAll()
    res.render('home', { title: 'Browse Products', cubes })
});

router.get('/about', (req, res) => {

    res.render('about', { title: 'About us' });
});

router.get('/products-search', async (req, res) => {
    const cubes = await productService.searchCubes(req.query)
    res.render('home', { title: 'Browse Products', cubes })
})

router.get('/products/add-cube', (req, res) => {
    res.render('create', { title: 'Add a cube' })
});

router.post('/products/add-cube', async (req, res) => {
    try {
        const cube = productService.create(req.body);
    } catch (err) {
        console.log(err);
        return;
    }
    res.redirect('/')
})

router.get('/products/add-accessory', (req, res) => {
    res.render('createAccessory', { title: 'Add an accessory' })
})

router.post('/products/add-accessory', async (req, res) => {
    try {
        const accessory = await accessoryService.create(req.body);
    } catch (err) {
        console.log(err)
        return;
    }
    res.redirect('/');
});

router.get('/products/:productId/attach', async (req, res) => {
    const cube = await productService.getOne(req.params.productId);
    const accessories = await accessoryService.getUnAttached(cube.accessories);
    res.render('attachAccessory', { title: 'Attach accessory to cube', cube, accessories })
});

router.post('/products/:productId/attach', async (req, res) => {
    const productId = req.params.productId;
    const attachPromise = await productService.attachAccessory(productId, req.body.accessory);
    res.redirect(`/products/${productId}/details`)
});

router.get('/products/:productId/details', async (req, res) => {
    let cube = await productService.getCubeAndAccessories(req.params.productId);
    const accessories = cube.accessories;
    res.render('details', { title: 'Product details', cube, accessories })
});

router.get('/products/:productId/edit', async (req, res) => {
    let cube = await productService.getCubeAndAccessories(req.params.productId);
    let accessories = cube.accessories;
    res.render('edit', { title: 'Edit Cube', cube, accessories })
});

router.post('/products/:productId/edit-cube', async (req, res) => {
    const cubeId = req.params.productId;
    const cubeDetails = req.body;
    const updatedCube = await productService.edit(cubeDetails, cubeId);
    
    res.redirect(`/products/${cubeId}/details`);
})

module.exports = router;