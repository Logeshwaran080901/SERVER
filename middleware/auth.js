const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') || null) {
        const jwtToken = req.headers.authorization.substring(7, req.headers.authorization.length);
        if (jwtToken !== 'undefined' && jwtToken !== null) {
            const payload = jwt.verify(jwtToken, process.env.SECRET);
            req.user = payload.user;
            req.role = payload.role;
            next();
        } else {
            res.status(401).json('Unauthorized user');
        }
    } else {
        res.status(401).send('Unauthorized user');
    }
};
