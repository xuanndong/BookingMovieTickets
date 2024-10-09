const login = document.getElementById('login');
const loginPage = document.querySelector('.login-page');
const signUp = document.getElementById('signup');
const signUpPage = document.querySelector('.signup-page');
const closeIcons = document.querySelectorAll('#close');
const bxMenu = document.querySelector('.menu-show');
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
})
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

// Delete menu event when click anywhere except bxMenu
document.body.addEventListener('click', (event) => {
    if(event.target !== bxMenu){
        sidebar.classList.add('d-none');
    }
});

// const formLogin = document.getElementById('loginForm');
// const submitter = document.querySelector('button[type=submit]');

// // Call API
// formLogin.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     // const form = new FormData(formLogin,);
//     console.log(form);
//     try {
//         const errorInfo = document.getElementById('errLogin');

//         const respone = await fetch('/login', {
//             method: 'POST',
//             body: JSON.stringify(form),
//         });
//         console.log(respone);
//         if(!respone.ok) {
//             errorInfo.classList.remove('d-none');
//             throw new Error("Not completed!");
//         }
//         const data = await respone.json();
//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// });

// async function fetchDataUser() {
//     console.log("hello");
//     try {
//         const errorInfo = document.getElementById('errLogin');

//         const respone = await fetch('/login', {
//             method: 'POST',
//             body: JSON.stringify()
//         });
//         console.log(respone);
//         if(!respone.ok) {
//             errorInfo.classList.remove('d-none');
//             throw new Error("Not completed!");
//         }
//         const data = await respone.json();
//         console.log(data);
//     } catch (error) {
//         console.error(error);
//     }
// }
