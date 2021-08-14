import galleryItems from './app.js';

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

const modalLightbox = document.querySelector('.lightbox');
const LightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const buttonCloseLightbox = document.querySelector('[data-action="close-lightbox"]');

galleryContainer.addEventListener('click', onGalleryClick);
buttonCloseLightbox.addEventListener('click', onCloseModal);


function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }) => {
        return `
    <li class="gallery__item">
    <a
        class="gallery__link"
        href="${original}"
    >
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
    </a>
</li>
`;
    }).join('');
}

function onGalleryClick(e) {
    e.preventDefault();

    const isGalleryItem = e.target.classList.contains('gallery__image');
    if (!isGalleryItem) {
        return
    };

    const imageLink = e.target.dataset.source;
    const imageAlt = e.target.alt;

    onOpenModal()

    lightboxImage.setAttribute('src', imageLink);
    lightboxImage.setAttribute('alt', imageAlt);
}

function onOpenModal() {
    modalLightbox.classList.add('is-open');
}

function onCloseModal(e) {
    modalLightbox.classList.remove('is-open');
    lightboxImage.removeAttribute('src');
    lightboxImage.removeAttribute('alt');
}