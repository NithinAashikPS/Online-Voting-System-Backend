const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Candidate = require('../models/candidates');

exports.add = (req, res, next) => {
    const candidate = new Candidate({
        _id: mongoose.Types.ObjectId(),
        name: req.params.name,
        position: req.params.position
    });
    candidate.save()
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
    Candidate.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                const response = {
                    count: docs.length,
                    candidates: docs
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
    Candidate.remove({
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