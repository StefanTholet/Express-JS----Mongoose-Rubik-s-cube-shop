const Cube = require('../models/Cube');

function create(cubeSpecs) {
    return Cube(cubeSpecs).save()
}

 function getAll() {
    return Cube.find({}).lean();
}

 function getOne(id) {
    return Cube.findById(id).lean();
}

function getCubeAndAccessories(id) {
    return Cube.findById(id)
    .populate('accessories')
    .lean();
}

function attachAccessory(cube, accessoryId) {
    cube
    .accessories.push(accessoryId)
    .save()        
}

module.exports = {
    getOne,
    create,
    getAll,
    attachAccessory,
    getCubeAndAccessories
}