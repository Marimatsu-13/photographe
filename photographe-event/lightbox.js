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

      
          
      const taxonomyData = document.createElement('div');
      taxonomyData.classList.add('lightbox_category'); 
      dom.appendChild(taxonomyData);
      
      fetch('http://localhost:10022/wp-json/wp/v2/categorie')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        taxonomyData.textContent = 'Categorie : ' + data.name;
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
  
  
