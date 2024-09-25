const node = document.getElementById('node');
const loginPage = document.querySelector('.signup-page');
const closeIcons = document.querySelectorAll('#close');

node.addEventListener('click', () => {
    loginPage.classList.remove('d-none');
    node.classList.add('d-none');
    console.log(closeIcons);
});

console.log('Hello');

closeIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        loginPage.classList.add('d-none');
        node.classList.remove('d-none');
    })
})