let openModal3 = document.querySelector('#menu-item-46');
let modal2 = document.querySelector('.modal2');
let closeModal2 = document.querySelector('.close2');
let modalContent2 = document.querySelector('.modal-content2');

openModal3.addEventListener('click', () => {
    modal2.style.display = 'block';
    modalContent2.style.display = 'block';
});

closeModal2.addEventListener('click', () => {
    modal2.style.display = 'none';
    modalContent2.style.display = 'none';
});