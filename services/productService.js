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

async function edit(cubeDetails, cubeId) {
    const cube = await Cube.findById(cubeId);
    if (cubeDetails.hasOwnProperty('accessories')) {
        if (Array.isArray(cubeDetails.accessories)) {
            cubeDetails.accessories.forEach(accessory => {
                const accessoryIndex = cube.accessories.indexOf(accessory);
                accessoryIndex != -1 ? cube.accessories.splice(accessoryIndex, 1) : null;
            });
        } else {
            const accessoryIndex = cube.accessories.indexOf(cubeDetails.accessories);
            accessoryIndex != -1 ? cube.accessories.splice(accessoryIndex, 1) : null;
        }
        delete cubeDetails.accessories;
    }
    for (property in cubeDetails) {
        cube[property] = cubeDetails[property];
    }
    const updateResult = await cube.save();
    return Cube.findById(cubeId).lean();
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
    searchCubes,
    edit
}