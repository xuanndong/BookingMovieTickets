const login = document.getElementById('login');
const loginPage = document.querySelector('.login-page');
const signUp = document.getElementById('signup');
const signUpPage = document.querySelector('.signup-page');
const closeIcons = document.querySelectorAll('#close');
const bxMenu = document.querySelector('.bx-menu');
const sidebar = document.getElementById('sidebar');
// Bắt sự kiện khi người dùng đăng nhập
const loggedIn = document.getElementById('loggedIn');
const notLoggedIn = document.getElementById('notLoggedIn');
// Bắt sự kiện khi người dùng đăng nhập

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
        if(loginPage.classList.contains('d-none')){
            signUpPage.classList.add('d-none');
        }else {
            loginPage.classList.add('d-none');
        }
    })
});

bxMenu.addEventListener('click', () => {
    sidebar.classList.toggle('d-none');
});