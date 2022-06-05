const checkAuth = (req, res, next) => {
    if (!req.session.admin) {
        res.end();
    } else {
        next();
    }
};

module.exports = checkAuth