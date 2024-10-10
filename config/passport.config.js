import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import query from '../db/query.js';

passport.use(new Strategy(
    async (username, password, done) => {
        try {
            const user = await query.getUsserByUserName(username);
            if(!user)
                return done(null, false, { messages: 'Incorrect username' });

            const match = await bcrypt.compare(password, user.password);
            if(!match) 
                return done(null, false, { messages: 'Incorrect password' });

            return done(null, user);
        }catch (err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.account_id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await query.getUserByID(id);
        done(null, user);
    }
    catch(err) {
        done(err);
    }
});

export { passport };