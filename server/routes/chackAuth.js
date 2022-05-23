const checkAuth = (req, res, next) => {
    if (!req.session.username) {
        res.end();
    } else {
        next();
    }
};

module.exports = checkAuth