const login = document.getElementById('login');
const loginPage = document.querySelector('.login-page');
const signUp = document.getElementById('signup');
const signUpPage = document.querySelector('.signup-page');
const closeIcons = document.querySelectorAll('#close');
const bxMenu = document.getElementById('bxMenu');
const sidebar = document.getElementById('sidebar');


// Bắt sự kiện khi người dùng đăng nhập
const loggedIn = document.getElementById('loggedIn');
const notLoggedIn = document.getElementById('notLoggedIn');
// Bắt sự kiện khi người dùng đăng nhập

// Chọn item trong sidebar
const navMenu = document.querySelectorAll('.nav-menu');
navMenu.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('active');
        item.classList.remove('text-dark');
    });
    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
        item.classList.add('text-dark');
    });
});
// Chọn item trong sidebar

// Login event is activated by click button "Login"
login.addEventListener('click', () => {
    loginPage.classList.remove('d-none');
});

// Sign Up event is activated by click button "Sign Up"
signUp.addEventListener('click', () => {
    signUpPage.classList.remove('d-none');
});


closeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (loginPage.classList.contains('d-none')) {
            signUpPage.classList.add('d-none');
        } else {
            loginPage.classList.add('d-none');
        }
    });
});

bxMenu.addEventListener('click', () => {
    sidebar.classList.toggle('d-none');
});

// Delete menu event when click anywhere except bxMenu
document.body.addEventListener('click', (event) => {
    if (event.target !== bxMenu) {
        sidebar.classList.add('d-none');
    }
});

const errorInfo = document.querySelector('.errorInfo');
const signUpForm = document.getElementById('signupForm');

signUpForm.addEventListener('submit', async (event) => {
    signUpPage.classList.add("d-none");
    event.preventDefault();
    const formData = new URLSearchParams(new FormData(event.target));

    try {
        const respone = await fetch('/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData,
        });

        if (!respone.ok) {
            errorInfo.classList.remove('d-none');
            throw new Error("Not completed!");
        }
        await fetchLogin();
    } catch (error) {
        console.error(error);
    }
});

const logInForm = document.getElementById('loginForm');

logInForm.addEventListener('submit', async (event) => {
    loginPage.classList.add('d-none');
    event.preventDefault();
    const formData = new URLSearchParams(new FormData(event.target));

    try {
        const respone = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
        });

        if (!respone.ok) {
            errorInfo.classList.remove('d-none');
            throw new Error("Not completed");
        }
        await fetchLogin();
    } catch (error) {
        console.error(error);
    }
});

async function fetchLogin() {
    try {
        const respone = await fetch("/isAuth");
        const result = await respone.json();

        if (result.user) {
            notLoggedIn.classList.add('d-none');
            loggedIn.classList.remove('d-none');

            loggedIn.querySelector('strong').innerText = result.user.username;
        } else {
            console.error("Not Completed");
        }
    } catch (error) {
        console.error(error);
    }
}

const signOut = document.getElementById('signOut');
signOut.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const respone = await fetch("/isAuth/log-out");
        const result = await respone.json();

        if (result.auth) {
            throw new Error('Sign Out failed');
        }
        window.location.assign('/');
    } catch (error) {
        console.error(error);
    }
});
