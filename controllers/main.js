import 'dotenv/config';

// This is main page of website
async function mainPage(req, res) {
    res.render('index', {
        pageTitle: 'Home',
    });
}

export default {
    mainPage,
};
