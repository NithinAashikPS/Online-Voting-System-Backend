const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const checkAuth = require('../middleware/check-auth');
const Admin = require('../models/admin');

exports.admin_signin = (req, res, next) => {
    Admin.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Authendication Failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Authendication Failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                        name: user[0].name
                    }, 'VSP', {
                        expiresIn: '1h'
                    });
                    return res.status(200).json({
                        message: 'Authendication Successfull',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Authendication Failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.change_password = (req, res, next) => {
    console.log(req.body);
    Admin.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 0) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        Admin.update({ email: req.body.email }, {
                                $set: { password: hash }
                            })
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
                            })
                    }
                });
            } else {
                console.log(req.body.email);
                console.log(req.body.password);
                return res.status(409).json({
                    message: 'Not Found'
                });
            }
        });
}

exports.update = (req, res, next) => {
    console.log(req.body);
    Admin.find({ _id: req.params._id })
        .exec()
        .then(user => {
            if (user.length >= 0) {
                Admin.update({ _id: req.params._id }, {
                        $set: req.body
                    })
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: 'Failed'
                        });
                    });
            } else {
                console.log(req.body.email);
                console.log(req.body.password);
                return res.status(409).json({
                    message: 'Failed'
                });
            }
        });
}