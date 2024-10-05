import express from 'express';
import 'dotenv/config';
import page from './controllers/main.js';
import signup from './routes/signupForm.js';
import login from './routes/loginForm.js';
import path from 'path';

const __dirname = import.meta.dirname;

const app = express();

app.set('view engine', 'ejs');
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
app.use('/signup', signup.createAccount);

// Working with the Login page
app.use('/login', login.loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
