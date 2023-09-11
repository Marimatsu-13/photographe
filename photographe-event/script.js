let openModal = document.querySelector('#menu-item-46');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');

openModal.addEventListener('click', () => {
    modal.style.display = 'block';
});


closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});


let burger = document.querySelector(".menu-toggle");
let menu = document.querySelector("#navigation");
let NavMenu = document.querySelector(".menu");
let bar1 = document.querySelector(".bar1");
let bar2 = document.querySelector(".bar2");
let bar3 = document.querySelector(".bar3");

burger.addEventListener("click", ()=>{
burger.classList.toggle("active");
menu.classList.toggle("active");
bar1.classList.toggle("active");
bar2.classList.toggle("active");
bar3.classList.toggle("active");
NavMenu.classList.toggle("active");
});