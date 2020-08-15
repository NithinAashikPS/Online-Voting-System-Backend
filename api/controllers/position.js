const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Position = require('../models/positions');

exports.add = (req, res, next) => {
    const position = new Position({
        _id: mongoose.Types.ObjectId(),
        position: req.body.position
    });
    position.save()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Failed'
            });
        });
}

exports.read = (req, res, next) => {
    Position.find()
        .select('position')
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                const response = {
                    count: docs.length,
                    positions: docs
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({
                    message: 'Failed'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed'
            });
        });
}

exports.delete = (req, res, next) => {
    Position.remove({
            _id: req.params._id
        }).exec()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed'
            });
        });
}