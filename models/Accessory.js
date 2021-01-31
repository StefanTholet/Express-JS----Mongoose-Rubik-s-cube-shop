const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Types.ObjectId,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);