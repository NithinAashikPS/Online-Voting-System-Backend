const mongoose = require('mongoose');

const positionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    position: { type: String, required: true }
});

module.exports = mongoose.model('Position', positionSchema);