let burger = document.querySelector(".menu-toggle");
let NavMenu = document.querySelector("#menu-items");
let bar1 = document.querySelector(".bar1");
let bar2 = document.querySelector(".bar2");
let bar3 = document.querySelector(".bar3");

burger.addEventListener("click", ()=>{
burger.classList.toggle("active");
bar1.classList.toggle("active");
bar2.classList.toggle("active");
bar3.classList.toggle("active");
NavMenu.classList.toggle("active");
});





let openModal = document.querySelector('#menu-item-46');
let openModal2 = document.querySelector('.wp-block-button__link');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
let modalContent = document.querySelector('.modal-content');

openModal.addEventListener('click', () => {
    modal.style.display = 'block';
    modalContent.style.display = 'block';
});


closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    modalContent.style.display = 'none';
});

openModal2.addEventListener('click', () => {
    modal.style.display = 'block';
    modalContent.style.display = 'block';
});

