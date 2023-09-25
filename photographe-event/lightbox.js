class Lightbox{
    static init(){
        const links = document.querySelectorAll('img[src$=".jpeg"]')
        .forEach(link => link.addEventListener('click', e =>
        {
            e.preventDefault()
            new Lightbox(e.currentTarget.getAttribute('src'))
        }))
    }

    constructor (url) {
        const element = this.buildDom(url)
        document.body.appendChild(element)
        
    }
    close(e) {
        e.preventDefault();
        this.element.classList.add('fadeOut');
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

        dom.querySelector('.lightbox_close').addEventListener('click',
        this.close.bind(this))
    
        return dom;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    Lightbox.init();
});
Lightbox.init