import express from "express";
import 'dotenv/config'; // Access ENV variables from .env files
import page from './controllers/main.js';
import { signupRouter } from './routes/signupRoute.js';
import { loginRouter } from './routes/loginRoute.js';
import { authRouter } from "./routes/authRoute.js";
import path from 'path';
import errorHandler from './controllers/errorHandler.js';
import session from "express-session";
import { passport } from './config/passport.config.js';


const __dirname = import.meta.dirname;

const app = express();

// setting up ejs
app.set('view engine', 'ejs');

// express middleware to pass form data to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/icons', express.static(path.join(__dirname, 'node_modules', 'boxicons')));


// SET SESSION
app.use(session({
    name: "liz",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        secure: false,
        maxAge: 1000 * 60,
    },
}));
app.use(passport.session());


// Get API

// Display main page
app.get('/', page.mainPage);

// Working with the Sign Up page
app.use('/signup', signupRouter);

// Working with the Login page
app.use('/login', loginRouter);

// Check authenticate and logout
app.use('/isAuth', authRouter);

// Handler error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});


// Hứng API từ server để hiện thị lại giao diện
