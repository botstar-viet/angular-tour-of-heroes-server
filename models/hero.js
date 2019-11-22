const mongoose = require('mongoose');
const heroSchema = new mongoose.Schema({
    id: String, name: String,
}, {collection: 'hero'})

module.exports = mongoose.model('hero', heroSchema);