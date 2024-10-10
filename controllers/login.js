import db from '../db/query.js';
import 'dotenv/config';
import { passport } from '../config/passport.config.js';

// DEFINE ROUTE TO AUTHENTICATE USER VIA PASSPORT STRATEGY
// MAKE SURE TO FETCH THIS ROUTE WITH -> {  credentials: 'include' }
let logInUser = passport.authenticate('local', {
    successRedirect: '/isAuth',
    failureRedirect: '/isAuth',
});

export { logInUser };