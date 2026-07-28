const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
};

const validateToken = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const token = authToken.substring(7);

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
};

module.exports = { generateToken, validateToken };