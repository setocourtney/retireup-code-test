// Schema for S&P Index Fund Return Data
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReturnsSchema = new Schema({
    year: {
        type: Number,
        minLength: 4,
        maxLength: 4
    },
    totalReturn: {
        type: String
    }
});

const Returns = mongoose.model("Returns", ReturnsSchema);

module.exports = Returns;