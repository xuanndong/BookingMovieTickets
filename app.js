import express from "express";
import 'dotenv/config';
import page from './controllers/main.js';
import signup from './routes/signupRoute.js';
import login from './routes/loginRoute.js';
import path from 'path';
import errorHandler from './controllers/errorHandler.js';

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


// Get API

// Display main page
app.get('/', page.mainPage);

// Working with the Sign Up page
app.use('/signup', signup.signupRouter);

// Working with the Login page
app.use('/login', login.loginRouter);

// Handler error
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
