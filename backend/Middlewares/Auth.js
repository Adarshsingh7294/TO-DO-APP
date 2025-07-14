
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    // Check if header is missing
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized: JWT token is required' });
    }

    // Token format: "Bearer <token>"
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized: Invalid or expired token' });
    }
};

module.exports = ensureAuthenticated;
