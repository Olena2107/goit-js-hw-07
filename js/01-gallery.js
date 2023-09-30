import { galleryItems } from './gallery-items.js';

// Change code below this line

const galleryRef = document.querySelector('.gallery');

galleryRef.addEventListener('click', onOpenCloseOriginalImg);

const murkup = galleryItems
.map(({preview, original, description}) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img 
    class="gallery__image" 
    src="${preview}" 
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </li>`
})
    .join('');

galleryRef.innerHTML = murkup;

function onOpenCloseOriginalImg(event) {
    const eventEl = event.target;
    if (eventEl.classList.contains('gallery')) {
        return;
    }
    event.preventDefault();

    let urlOriginalImg = eventEl.dataset.source;
    if (eventEl.classList.contains('gallery__link')) {
        urlOriginalImg = eventEl.firstElementChild.dataset.source;
    }
    const instance = basicLightbox.create(`
        <img 
            src="${urlOriginalImg}"
            width="800" 
            height="600">
    `)        
    instance.show(event);
    document.addEventListener("keydown", onKeyClose);
    
    function onKeyClose(event) {
        if (event.code !== "Escape") {
            return;
        }
        instance.close();
        document.removeEventListener("keydown", onKeyClose);
    };
}
