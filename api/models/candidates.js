const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    position: { type: String, required: true },
    vote: { type: [String] }
});

module.exports = mongoose.model('Candidate', candidateSchema);