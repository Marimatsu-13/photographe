class Lightbox {
  /*initialisation de la lightbox
  on récupère tous les liens associés à une image jpeg et on construit les lightbox*/
    static init() {
     /* const links = document.querySelectorAll('img[src$=".jpeg"]');*/
     const links2 = document.querySelectorAll('.same-cat img');
   
     const links0 = document.querySelectorAll('.publication-list img');
     
     const links1 = document.querySelectorAll('img[src$=".jpeg"],img[src$=".jpg"]')
     
      if (links0.length !== 0){
        const links = document.querySelectorAll('img[src$=".jpeg"],img[src$=".jpg"]')
        
          links0.forEach((link, index) => {
        link.addEventListener('click', (e) => {
                          
          /*on stoppe le comportement par defaut*/
          e.preventDefault();
          /*en récupérant l'evenement, on construit une lightbox avec la bonne url, et son index */        
          new Lightbox(e.currentTarget.getAttribute('src'), index);          
          });
          
      });

      }
      else { 
        links2.forEach((link, index) => {
          link.addEventListener('click', (e) => {
             
            /*on stoppe le comportement par defaut*/
            e.preventDefault();
            /*en récupérant l'evenement, on construit une lightbox avec la bonne url, et son index */        
            new Lightbox(e.currentTarget.getAttribute('src'), index);          
            });
            
        });
        
      }

      /*console.log(links);*/
     
     
      }
  
    /*constructeur de la lightbox*/
    /* en paramètres, on a l'url de l'image de la lightbox et son index */
    constructor(url, currentIndex) {
      this.currentIndex = currentIndex;
      
      this.imageUrls = Array.from(
        document.querySelectorAll('img[src$=".jpeg"],img[src$=".jpg"]')
      ).map((img) => img.getAttribute('src'));
     
     this.element = this.buildDom(url);
      document.body.appendChild(this.element);
      /* on verifie quil n y ait qu une lightbox active*/
      const light = document.body.querySelectorAll('.lightbox');
      console.log(light.length);
      if(light.length > 1){
        light[1].remove();
      }
  
      this.addEventListeners();
      
    }
   /*Méthode pour construire la structure DOM de la lightbox*/

   /*Crée les éléments DOM nécessaires pour la lightbox
     y compris les boutons de navigation, l'image, et les éléments de catégorie et de référence...*/

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

      /*on construit les div contenant la catégorie et la référence d'une photo*/

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
      console.log(currentElementRef);
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

    currenteye(dom,this.currentIndex);
   

    return dom;
    }

    /*Méthode pour ajouter des écouteurs d'événements pour les boutons de la lightbox*/

    addEventListeners() {
      const closeButton = document.querySelector('.lightbox_close');
      const nextButton = document.querySelector('.lightbox_next');
      const prevButton = document.querySelector('.lightbox_prev');

  
      closeButton.addEventListener('click', this.close.bind(this));
      nextButton.addEventListener('click', this.next.bind(this));
      prevButton.addEventListener('click', this.prev.bind(this));
      
     

    }
       
    /*Méthode pour fermer la lightbox*/
    close() {
      document.removeEventListener('click',this.next);
      document.removeEventListener('click',this.prev);
      document.removeEventListener('click',this.close);
      this.element.parentElement.removeChild(this.element);
    }
  
     /*Méthode pour passer à l'image suivante*/
    next() {
      
      this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
      const nextImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      lightboxContainer.src = nextImageUrl;   

    updateCategoryAndReference(this.element,this.currentIndex);
    currenteye(this.element,this.currentIndex);
    
    }
  
    /*Méthode pour passer à l'image précédente*/  

    prev() {
        this.currentIndex =
        (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
      const prevImageUrl = this.imageUrls[this.currentIndex];
      const lightboxContainer = document.querySelector('.lightbox_container img');
      lightboxContainer.src = prevImageUrl;
    
      updateCategoryAndReference(this.element,this.currentIndex);

      currenteye(this.element,this.currentIndex);

    }

  }
  
  /*Initialise la lightbox lorsque le DOM est chargé*/

  document.addEventListener('DOMContentLoaded', function () {
    Lightbox.init();
  });
 
  /*Fonction pour gérer l'ajout d'un lien vers l'image en cours*/

function currenteye(dom,indeximg) {
    const eye = document.createElement('a');
    
  eye.classList.add('lightbox_eye');
  dom.appendChild(eye);
    const currentElementEye = document.querySelectorAll('.lightbox_eye')[indeximg].innerHTML;
    /*on nettoie le conteneue de innerhtml pour recuperer uniquement le lien de la photo*/
    let stru1 = currentElementEye.indexOf('http');
  let myurl1 = currentElementEye.substring(stru1);
  let stru2 = myurl1.indexOf('"');
  let myurl2 = myurl1.substring(0,stru2);
  eye.href= myurl2;
  
}


     /*Méthode pour mettre à jour la catégorie et la référence de l'image actuellement affichée*/  
     /* inutilsee pour le moment*/
function updateCategoryAndReference(dom,index) {
   console.log(index);
  /* on recupere les div contenent la categorie afficheé que lon va remplaccer*/
      const totoref = dom.querySelector('.lightbox_ref');
      const totocat = dom.querySelector('.lightbox_category');
      const totocr = dom.querySelector('.lightbox_category_ref');
  /*on crerr des div temporaire pour qui vont accueillir les noucelle valeurs*/
      const catref = document.createElement('div');
      catref.classList.add('lightbox_category_ref');
      const Cat = document.createElement('div');
      Cat.classList.add('lightbox_category');
      const Ref = document.createElement('div');
      Ref.classList.add('lightbox_ref');
/*on recupère la categorie et la reference de la photo et on les place dans les div temporaire*/     
      let taxcat= document.querySelectorAll('.lightbox_category');
      let taxref = document.querySelectorAll('.lightbox_ref');
      /*console.log(taxcat);
      console.log(taxref);*/
      const currentElementRef = taxref[index];
      const innerdiv2text = currentElementRef.childNodes[1].innerText;
      Ref.textContent = innerdiv2text;
      const currentElementCat = taxcat[index];
      const innerdiv1text = currentElementCat.childNodes[1].innerText;      
      Cat.textContent =  innerdiv1text;
/*on remplace les elements de la photo précédentes*/        
      dom.removeChild(totocat);
      dom.appendChild(Cat);
      dom.removeChild(totoref);
      dom.appendChild(Ref); 
  }

