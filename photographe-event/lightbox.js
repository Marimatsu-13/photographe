class Lightbox {
    static init() {
      const links = document.querySelectorAll('img[src$=".jpeg"]');
      links.forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute('src'), index);
        });
      });
    }
  
    constructor(url, currentIndex) {
      this.currentIndex = currentIndex;
      this.imageUrls = Array.from(
        document.querySelectorAll('img[src$=".jpeg"]')
      ).map((img) => img.getAttribute('src'));
  
      const element = this.buildDom(url);
      document.body.appendChild(element);
  
      this.addEventListeners();
    }
  
    buildDom(url) {
      const dom = document.createElement('div');
      dom.classList.add('lightbox');
  
      const closeButton = document.createElement('button');
      closeButton.classList.add('lightbox_close');
      dom.appendChild(closeButton);
  
      const nextButton = document.createElement('button');
      nextButton.classList.add('lightbox_next');
      dom.appendChild(nextButton);
  
      const prevButton = document.createElement('button');
      prevButton.classList.add('lightbox_prev');
      dom.appendChild(prevButton);
  
      const container = document.createElement('div');
      container.classList.add('lightbox_container');
  
      const img = document.createElement('img');
      img.src = url;
      
        
      container.appendChild(img);
  
      dom.appendChild(container);

    
      let requestData = {
        action: "get_cat",
        url: url,};
     let url2 = new URLSearchParams(requestData);
     
      fetch('wp-admin/admin-ajax.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
        body: url2
      })
      .then(response => response.json())
      .then(data => {
      const taxonomyData = document.createElement('div');
      taxonomyData.classList.add('lightbox_category'); 
      dom.appendChild(taxonomyData);
      console.log('Catégories :', data.html);
        taxonomyData.textContent = 'Categorie : ' + data.html;
      })
    
     
      
      return dom;
    }
  
    addEventListeners() {
      const closeButton = document.querySelector('.lightbox_close');
      const nextButton = document.querySelector('.lightbox_next');
      const prevButton = document.querySelector('.lightbox_prev');
  
      closeButton.addEventListener('click', this.close.bind(this));
      nextButton.addEventListener('click', this.next.bind(this));
      prevButton.addEventListener('click', this.prev.bind(this));
    }
  
    close() {
      document.querySelector('.lightbox').remove();
    }
  
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
      const nextImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      lightboxContainer.src = nextImageUrl;
      
    }
  
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      const prevImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      lightboxContainer.src = prevImageUrl;
      
    }

    
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    Lightbox.init();
  });
  
  
 /* function displayTaxonomyFromImage() {
    const lightboxImage = document.querySelectorAll('.lightbox');
    if (!lightboxImage) {
        console.error('Aucune image trouvée dans la lightbox.');
        return;
    }

    const imageUrl = lightboxImage;
    console.log(imageUrl);
    const imageId = getImageIdFromUrl(imageUrl);

    if (!imageId) {
        console.error('Impossible de récupérer l\'ID de l\'image.');
        return;
    }

    // Envoyer une requête Ajax pour récupérer la taxonomie
    const data = new FormData();
    data.append('action', 'get_cat'); // Assurez-vous que 'get_taxonomy' est l'action enregistrée dans WordPress

    fetch('/wp-admin/admin-ajax.php', {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => {
        const taxonomyData = document.createElement('div');
        taxonomyData.classList.add('lightbox_category');
        taxonomyData.textContent = 'Catégorie : ' + data.category;
        document.body.appendChild(taxonomyData);
    })
    .catch(error => console.error('Erreur lors de la récupération de la taxonomie :', error));
}

// Appelez la fonction pour afficher la taxonomie
displayTaxonomyFromImage();*/