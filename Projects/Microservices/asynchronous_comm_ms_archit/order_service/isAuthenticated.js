const jwt = require('jsonwebtoken');

module.exports = async function isAuthenticated(req, res, next) {
    try {
        // Get the token from Authorization header
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        // Verify the token using JWT_SECRET from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded info to request
        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ message: err.message });
    }
};
