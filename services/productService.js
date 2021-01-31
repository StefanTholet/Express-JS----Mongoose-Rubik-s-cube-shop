const mongoose = require('mongoose');
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
module.exports = {
    getOne,
    create,
    getAll
}