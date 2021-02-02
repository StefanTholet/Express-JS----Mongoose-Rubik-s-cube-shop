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

async function attachAccessory(id, accessoryId) {
    const cube = await Cube.findById(id);
    cube.accessories.push(accessoryId);
    return cube.save();
}

async function searchCubes(query) {
    let result = await getAll();
    console.log(result)
    if (query.search) {
      result = result.filter(x => x.name.toLowerCase().includes(query.search.toLowerCase()));
    };
    if (query.from) {
        result = result.filter(x => x.difficultyLevel >= Number(query.from));
    }
    if (query.to) {
        result = result.filter(x => x.difficultyLevel <= Number(query.to));
    }
    return result;
}

module.exports = {
    getOne,
    create,
    getAll,
    attachAccessory,
    getCubeAndAccessories,
    searchCubes
}