module.exports = (req, res, next) => {
    const userId = req.headers['user-id']; // For simplicity, assuming user ID in headers
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    req.user = { id: userId }; // Attach user info to request
    next();
};
