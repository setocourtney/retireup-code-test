
// S&P 500 Index Fund Returns by Year

const db = require('../models');
const mongoose = require('mongoose');

module.exports = {
    getReturns: function(req, res) {
        db.Returns.find({})
        .sort({ year: 1 })
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    }
}