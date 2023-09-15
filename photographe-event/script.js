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

document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const formatSelect = document.getElementById('format-select');
    const dateSelect = document.getElementById('date-select');
    const photoSection = document.querySelector('.row');
    const currentYear = new Date().getFullYear();
    const yearsToShow = 10;

    for (let i = 0; i < yearsToShow; i++) {
        const yearOption = document.createElement('option');
        yearOption.value = currentYear - i;
        yearOption.textContent = currentYear - i;
        dateSelect.appendChild(yearOption);
    }
    fetchCategories();

    categorySelect.addEventListener('change', function() {
        const selectedCategory = categorySelect.value;
        fetchFilteredPhotos(selectedCategory, formatSelect.value);
    });

    fetchFormat();

    formatSelect.addEventListener('change', function() {
        const selectedSort = formatSelect.value;
        fetchFilteredPhotos(formatSelect.value, selectedSort);
    });

    fetchDate();
    function fetchCategories() {
        fetch('http://localhost:10022/wp-json/wp/v2/categorie')
            .then(response => response.json())
            .then(data => {
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categorySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des catégories :', error));
    }

    function fetchFormat() {
        fetch('http://localhost:10022/wp-json/wp/v2/format')
            .then(response => response.json())
            .then(data => {
                data.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    formatSelect.appendChild(option);  
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des formats :', error));
    }
    
    function fetchFilteredPhotos(categorie, format, date) {
        const apiUrl = `http://localhost:10022/wp-json/wp/v2/photos?categories=${categorie}&orderby=${format}`;
        if (date && date !== 'all') {
            const startDate = `${date}-01-01`;
            const endDate = `${date}-12-31`;
            apiUrl += `&after=${startDate}&before=${endDate}`;
        }
        fetch(apiUrl)
            .then(response => response.json())
            .then(photos => {
                while (photoSection.firstChild) {
                    photoSection.removeChild(photoSection.firstChild);
                }

                photos.forEach(photo => {
                    const photoItem = document.createElement('div');
                    photoItem.textContent = photo.title.rendered;
                    photoSection.appendChild(photoItem);
                });
            })
            .catch(error => console.error('Erreur lors de la récupération des photos :', error));
    }
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

