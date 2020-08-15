const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log(token);
        const decoded = jwt.verify(token, 'VSP');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authendication Failed'
        });
    }
};