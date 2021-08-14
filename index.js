import galleryItems from './app.js';

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGallery(galleryItems);

const modalLightbox = document.querySelector('.lightbox');
const LightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const buttonCloseLightbox = document.querySelector('[data-action="close-lightbox"]');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryClick);
buttonCloseLightbox.addEventListener('click', onCloseModal);
LightboxOverlay.addEventListener('click', onOverlayClick)

function createGallery(galleryItems) {
    return galleryItems.map(({ preview, original, description }, index) => {
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
            data-index="${index}"
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

    onOpenModal()

    lightboxImage.setAttribute('src', e.target.dataset.source);
    lightboxImage.setAttribute('alt', e.target.alt);
}

function onOpenModal() {
    window.addEventListener('keydown', onEscKeyPress);

    modalLightbox.classList.add('is-open');
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);

    modalLightbox.classList.remove('is-open');
    lightboxImage.removeAttribute('src');
    lightboxImage.removeAttribute('alt');
}

function onOverlayClick(e) {
    if (e.target === e.currentTarget) {
        onCloseModal()
    }
}

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
        onCloseModal()
    }
}