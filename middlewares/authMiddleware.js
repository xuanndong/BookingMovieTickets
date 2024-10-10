// DEFINE AUTHORIZATION MIDDLEWARE
let isAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.status(401).json({ messages: 'You are not authorized' });
    }
};

// DEFINE ADMIN MIDDLEWẢE
let isAdmin = (req, res, next) => {
    if(req.isAuthenticated() && req.user.username === 'arthurTL@') {
        next();
    }else {
        res.status(401).json({ messages: 'Only admin can access here!' });
    }
};

export { isAuth, isAdmin };