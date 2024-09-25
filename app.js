import express from 'express';
import 'dotenv/config';
import signup from './routes/signupForm.js';
import path from 'path';

const __dirname = process.env.dirname;

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/icons', express.static(path.join(__dirname, 'node_modules', 'boxicons')));

app.use('/', signup.createAccount);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
