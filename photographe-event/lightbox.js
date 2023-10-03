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
  
     this.element = this.buildDom(url);
      document.body.appendChild(this.element);
  
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
      img.classList.add('lightbox_image');
      dom.appendChild(img);
        
      container.appendChild(img);
  
      dom.appendChild(container);
      
      const taxonomyData = document.createElement('div');
      taxonomyData.classList.add('lightbox_category_ref');
      const taxonomyCat = document.createElement('div');
      taxonomyCat.classList.add('lightbox_category');
      const taxonomyRef = document.createElement('div');
      taxonomyRef.classList.add('lightbox_ref');

      let taxcat= document.querySelectorAll('.lightbox_category');
      let taxref = document.querySelectorAll('.lightbox_ref')
      dom.appendChild(taxonomyData);
      dom.appendChild(taxonomyCat);
      dom.appendChild(taxonomyRef);
   
      const currentElementRef = taxref[this.currentIndex];
      const innerdiv2text = currentElementRef.childNodes[1].innerText;
      taxonomyRef.textContent =  innerdiv2text;
      taxref.textContent = innerdiv2text;
      taxonomyRef.innerText = innerdiv2text;
      taxref.innerText = innerdiv2text;
    
      const currentElementCat = taxcat[this.currentIndex];
      const innerdiv1text = currentElementCat.childNodes[1].innerText;
      taxonomyCat.textContent =  innerdiv1text;
      taxcat.textContent = innerdiv1text;
      taxonomyCat.innerText =  innerdiv1text;
      taxcat.innerText = innerdiv1text;
    
    const eye = document.createElement('a');
    eye.classList.add('lightbox_eye');
    dom.appendChild(eye);
    const currentElementEye = document.querySelectorAll('.lightbox_eye')[this.currentIndex].innerHTML;
    let stru1 = currentElementEye.indexOf('http');
    let myurl1 = currentElementEye.substring(stru1);
    let stru2 = myurl1.indexOf('"');
    let myurl2 = myurl1.substring(0,stru2);
    eye.href= myurl2;
    


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
      location.reload(true);
    }
  
    next() {
      
      this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
      const nextImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      const lightb = document.querySelector('.lightbox');
      lightboxContainer.src = nextImageUrl;
      
      console.log(this.element);

      const totoref = this.element.querySelector('.lightbox_ref');
      console.log(totoref);
      const totocat = this.element.querySelector('.lightbox_category');
      console.log(totocat);
      const totocr = this.element.querySelector('.lightbox_category_ref');
      console.log(totocr);

      const catref = document.createElement('div');
      catref.classList.add('lightbox_category_ref');
      const Cat = document.createElement('div');
      Cat.classList.add('lightbox_category');
      
      const Ref = document.createElement('div');
      Ref.classList.add('lightbox_ref');
      


      let taxcat= document.querySelectorAll('.lightbox_category');
      
      let taxref = document.querySelectorAll('.lightbox_ref')
      


            
      const currentElementRef = taxref[this.currentIndex];
      const innerdiv2text = currentElementRef.childNodes[1].innerText;
      console.log(innerdiv2text);

      Ref.textContent = innerdiv2text;
      console.log(Ref);
      

      const currentElementCat = taxcat[this.currentIndex];
      const innerdiv1text = currentElementCat.childNodes[1].innerText;
      console.log(innerdiv1text);
           
      Cat.textContent =  innerdiv1text;
      console.log(Cat);
      
      this.element.removeChild(totocat);
      this.element.appendChild(Cat);
      this.element.removeChild(totoref);
      this.element.appendChild(Ref);
     
      console.log(this.element);
      
    }
  
    prev() {
      
      this.currentIndex =
        (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      const prevImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      lightboxContainer.src = prevImageUrl;
      
      /*const dom2 = this.buildDom(lightboxContainer.src);
      console.log(dom2);
      document.querySelector('.lightbox_ref').remove();
     
      const dom = document.createElement('div');
      dom.classList.add('lightbox');*/
      console.log(this.element);

      const totoref = this.element.querySelector('.lightbox_ref');
      console.log(totoref);
      const totocat = this.element.querySelector('.lightbox_category');
      console.log(totocat);
      const totocr = this.element.querySelector('.lightbox_category_ref');
      console.log(totocr);

      const catref = document.createElement('div');
      catref.classList.add('lightbox_category_ref');
      const Cat = document.createElement('div');
      Cat.classList.add('lightbox_category');
      
      const Ref = document.createElement('div');
      Ref.classList.add('lightbox_ref');
      


      let taxcat= document.querySelectorAll('.lightbox_category');
      
      let taxref = document.querySelectorAll('.lightbox_ref')
      


            
      const currentElementRef = taxref[this.currentIndex];
      const innerdiv2text = currentElementRef.childNodes[1].innerText;
      console.log(innerdiv2text);

      Ref.textContent = innerdiv2text;
      console.log(Ref);
      

      const currentElementCat = taxcat[this.currentIndex];
      const innerdiv1text = currentElementCat.childNodes[1].innerText;
      console.log(innerdiv1text);
           
      Cat.textContent =  innerdiv1text;
      console.log(Cat);
      
      this.element.removeChild(totocat);
      this.element.appendChild(Cat);
      this.element.removeChild(totoref);
      this.element.appendChild(Ref);
     
      console.log(this.element);
       

    
      /*this.updateCategoryAndReference();*/
    }

    updateCategoryAndReference() {
    const taxonomyCat = document.querySelectorAll('.lightbox_category')[this.currentIndex];
    const taxonomyRef = document.querySelectorAll('.lightbox_ref')[this.currentIndex];

    // Update the displayed category and reference
    const category = taxonomyCat.innerText;
    const reference = taxonomyRef.innerText;
    console.log('Category:', category);
    console.log('Reference:', reference);
   
  }
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    Lightbox.init();
  });
  
  
 
