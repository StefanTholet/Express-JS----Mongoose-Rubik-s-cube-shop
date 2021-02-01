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

function getUnAttached(accessories) {
    return Accessory.find({_id:{ $nin: accessories}}).lean();
}

module.exports = {
    create,
    getAll,
    getOne,
    getUnAttached
}