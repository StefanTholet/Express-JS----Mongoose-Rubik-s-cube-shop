const Accessory = require('../models/Accessory');

function create(accessorySpecs) {
    return Accessory(accessorySpecs).save();
}

function getAll() {
    return Accessory.find({}).lean();
}

function getOne(id) {
    return Accessory.find(id).lean();
}

module.exports = {
    create,
    getAll,
    getOne
}