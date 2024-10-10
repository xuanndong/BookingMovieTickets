import 'dotenv/config';

// DEFINE ROUTE TO RETURN AUTHENTICATION STATUS & AUTHENTICATED USER
let isAuthenticated = async (req, res) => {
    res.json({ auth: req.isAuthenticated(), user: req.user });
}

// DEFINE ROUTE TO UNAUTHENTICATE USER WHEN CALLED
// MAKE SURE TO FETCH THIS ROUTE WITH -> { credentials: 'include' }
let logOutUser = async (req, res, next) => {
    req.logout((err) => {
        if(err)
            return next(err);
        res.redirect('/isAuth');
    });
}

let profilePage = async (req, res) => {
    res.json({ user: req.user });
}

export { isAuthenticated, logOutUser };