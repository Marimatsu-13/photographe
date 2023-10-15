// Gestion du burger menu et de la navigation mobile
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
// Gestion du chargement supplémentaire de photos
let currentPage = 1;
let loadMore = document.getElementById('load-more-button');
let publication = document.querySelector('.publication-list');
let publication2 = document.querySelectorAll('.publication-list');

loadMore.addEventListener('click', function() {
     currentPage++;
  
    const data = new URLSearchParams();
    data.append('action', 'load_more');
    data.append('paged', currentPage);

    fetch('http://localhost:10022///wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(response => {
        if (response.html) {     
            /*console.log(response.html);*/
            // Ajout du contenu récupéré au div concernée
            
            const tmpdiv = document.createElement('div');
            tmpdiv.classList.add('publication_list');
            tmpdiv.innerHTML = response.html;
            const img_lnks = tmpdiv.querySelectorAll('img');
             
            catref_tmp = tmpdiv.querySelectorAll('.lightbox_category_ref')
           
            for (let i = 0, len = img_lnks.length | 0; i < len; i++) {
                publication.insertAdjacentElement("beforeend",img_lnks[i]);                
              }
            for (let i = 0, len = catref_tmp.length | 0; i < len; i++) {
                publication2[1].insertAdjacentElement("beforeend",catref_tmp[i]);                
              }
              Lightbox.init();
        }
        
        
    })
    
});

// Fonction pour récupérer les catégories, les formats et les dates
document.addEventListener('DOMContentLoaded', function() {
    let categorySelect = document.getElementById('category-select');
    let formatSelect = document.getElementById('format-select');
    let dateSelect = document.getElementById('date-select');
     
    fetchCategories();

    fetchFormat();

    fetchDate();


    function fetchDate() {
        fetch('http://localhost:10022//wp-json/wp/v2/annee')
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
        fetch('http://localhost:10022//wp-json/wp/v2/categorie')
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
        fetch('http://localhost:10022//wp-json/wp/v2/format')
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
      
        fetchPosts(selectedCategory, selectedFormat, selectedDate);
      }
      
      function fetchPosts(category, format, date) {
        let publication2 = document.querySelectorAll('.publication-list');
             
        let requestData = {
            action: "filter_posts",
            category: category,
            format: format,
            date: date};
         
         let url = new URLSearchParams(requestData);
         

        fetch('wp-admin/admin-ajax.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
          body: url,
          
        })
          .then(response => response.json())
          .then(data => {
            
            while (publication2[1].firstChild) {
                publication2[1].removeChild(publication2[1].firstChild);
            }
           
            
            const postsContainer = document.querySelector('.publication-list');
            postsContainer.textContent = ''; 

            const tmpdiv = document.createElement('div');
            tmpdiv.classList.add('publication_list');
            tmpdiv.innerHTML = data.html;
            const img_lnks = tmpdiv.querySelectorAll('img');
            catref_tmp = tmpdiv.querySelectorAll('.lightbox_category_ref')
            for (let i = 0, len = img_lnks.length | 0; i < len; i++) {
                postsContainer.insertAdjacentElement("beforeend",img_lnks[i]);                
              }
            for (let i = 0, len = catref_tmp.length | 0; i < len; i++) {
                
                publication2[1].insertAdjacentElement("beforeend",catref_tmp[i]);                
            }
            Lightbox.init();
            



          })
          .catch(error => console.error('Error fetching posts:', error));
      }


    });




