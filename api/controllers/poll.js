const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomColor = require('randomcolor');

const Position = require('../models/positions');
const Candidate = require('../models/candidates');
const User = require('../models/user');


exports.read = (req, res, next) => {
    Position.find()
        .select('position')
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                const data = [];
                for (const item of docs) {
                    console.log(item.position);
                    Candidate.find({ position: item.position })
                        .select('_id name position vote')
                        .exec()
                        .then(asd => {
                            User.find()
                                .then(user => {
                                    var voted = false;
                                    var columns = [];
                                    var names = "";
                                    var colours = "";
                                    var a = 1;
                                    for (const candidate of asd) {
                                        for (var i = 0; i < candidate.vote.length; i++) {
                                            if (candidate.vote[i] == req.params._id) {
                                                console.log(candidate.vote[i]);
                                                voted = true;
                                                break;
                                            }
                                        }
                                        var per = (candidate.vote.length * 100) / user.length;
                                        var str = candidate.name;
                                        var matches = str.match(/\b(\w)/g);
                                        var acronym = matches.join('');
                                        names += "\'data" + a + "\':\'" + acronym + "\',";
                                        colours += "\'data" + a + "\':\'" + randomColor() + "\',";
                                        columns.push(['data' + a++, per]);
                                        console.log(columns);
                                        console.log(names);
                                        console.log(colours);
                                    }
                                    data.push({ position: item.position, columns: columns, names: names, colours: colours, voted: voted, candidates: asd });
                                    if (data.length == docs.length) {
                                        res.status(200).json(data);
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({
                                        message: 'Failed'
                                    });
                                });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                message: 'Failed'
                            });
                        });
                }
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

exports.vote = (req, res, next) => {
    console.log(req.params._id);
    Candidate.findOne({ _id: req.params._id })
        .select('vote')
        .exec()
        .then(docs => {
            console.log(docs.vote);
            Candidate.update({ _id: docs._id }, { $push: { vote: req.params.voter } })
                .exec()
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Failed'
            });
        });
}