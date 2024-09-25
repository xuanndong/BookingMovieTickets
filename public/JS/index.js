const node = document.getElementById('node');
const loginPage = document.querySelector('.signup-page');
const closeIcon = document.querySelector('#close');

node.addEventListener('click', () => {
    loginPage.classList.remove('d-none');
    node.classList.add('d-none');
});

closeIcon.addEventListener('click', () => {
    loginPage.classList.add('d-none');
    node.classList.remove('d-none');
})