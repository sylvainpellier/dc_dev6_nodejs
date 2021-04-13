const mongoose = require('mongoose');

const produitSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    image: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Produit', produitSchema);