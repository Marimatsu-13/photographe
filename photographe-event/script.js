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

let currentPage = 1;
let loadMore = document.getElementById('load-more-button');
let publication = document.querySelector('.publication-list');

loadMore.addEventListener('click', function() {
    currentPage++;

    const data = new URLSearchParams();
    data.append('action', 'load_more');
    data.append('paged', currentPage);

    fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(response => {
        if (response.html) {
            publication.insertAdjacentHTML('beforeend', response.html);
        }
    })
});


document.addEventListener('DOMContentLoaded', function() {
    let categorySelect = document.getElementById('category-select');
    let formatSelect = document.getElementById('format-select');
    let dateSelect = document.getElementById('date-select');
     
    fetchCategories();

    fetchFormat();

    fetchDate();


    function fetchDate() {
        fetch('http://localhost:10022/wp-json/wp/v2/annee')
            .then(response => response.json())
            .then(data => {
                data.forEach(date => {
                    const option = document.createElement('option');
                    option.value = date.id;
                    option.textContent = date.name;
                    dateSelect.appendChild(option);
                });
            })
            
    }
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
            
    }

    function fetchFormat() {
        fetch('http://localhost:10022/wp-json/wp/v2/format')
            .then(response => response.json())
            .then(data => {
                data.forEach(format => {
                    const option = document.createElement('option');
                    option.value = format.id;
                    option.textContent = format.name;
                    formatSelect.appendChild(option);  
                });
            })
            
    }

    categorySelect.addEventListener('change', updateFilteredPosts);
    formatSelect.addEventListener('change', updateFilteredPosts);
    dateSelect.addEventListener('change', updateFilteredPosts);

    function updateFilteredPosts() {
        const selectedCategory = categorySelect.value;
        const selectedFormat = formatSelect.value;
        const selectedDate = dateSelect.value;
        console.log(selectedCategory);
        console.log(selectedFormat);
        console.log(selectedDate);
        fetchPosts(selectedCategory, selectedFormat, selectedDate);
      }
      
      function fetchPosts(category, format, date) {
        let data = new FormData();
        data.append('action', 'filter_posts');
        data.append('category', category);
        data.append('format', format);
        data.append('date', date);
        console.log(fetchPosts);
        
        let requestData = {
            action: "filter_posts",
            category: category,
            format: format,
            date: date};
         console.log(requestData);
         let url = new URLSearchParams(requestData);
         console.log(url);

        fetch('wp-admin/admin-ajax.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: url,
          
        })
          .then(response => response.json())
          .then(data => {
            const postsContainer = document.querySelector('.publication-list');
            postsContainer.textContent = ''; 
            postsContainer.insertAdjacentHTML('beforeend', data.html);  

          })
          
          .catch(error => console.error('Error fetching posts:', error));
      }
});




let openModal = document.querySelector('#menu-item-46');
let openModal2 = document.querySelector('.wp-block-button__link');
let modal = document.querySelector('.modal');
let closeModal = document.querySelector('.close');
let modalContent = document.querySelector('.modal-content');
let ref = document.querySelector('.ref');
let refPhoto = document.querySelector('#refPhoto');

refPhoto.value=variableref;

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

