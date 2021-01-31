const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://chefyata:pomber145@cluster0.wo3t9.mongodb.net/test', {useNewUrlParser: true, useUnifiedTopology: true})
}

const db = mongoose.connection;
 db.on('error', () => {
    console.log('Connection Error')
 });
db.once('open', () => {
    console.log('Db Connected')
});