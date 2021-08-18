import galleryItems from "./app.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryMarkup = createGallery(galleryItems);

const modalLightbox = document.querySelector(".lightbox");
const LightboxOverlay = document.querySelector(".lightbox__overlay");
const lightboxImage = document.querySelector(".lightbox__image");
const buttonCloseLightbox = document.querySelector(
  '[data-action="close-lightbox"]'
);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryClick);
buttonCloseLightbox.addEventListener("click", onCloseModal);
LightboxOverlay.addEventListener("click", onOverlayClick);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
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
    })
    .join("");
}

function onGalleryClick(e) {
  e.preventDefault();

  const isGalleryItem = e.target.classList.contains("gallery__image");
  if (!isGalleryItem) {
    return;
  }

  onOpenModal();

  lightboxImage.setAttribute("src", e.target.dataset.source);
  lightboxImage.setAttribute("ind", e.target.dataset.index);
  lightboxImage.setAttribute("alt", e.target.alt);
}

function onOpenModal() {
  window.addEventListener("keydown", onKeyPress);

  modalLightbox.classList.add("is-open");
}

function onCloseModal() {
  window.removeEventListener("keydown", onKeyPress);

  modalLightbox.classList.remove("is-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.removeAttribute("alt");
  lightboxImage.removeAttribute("ind");
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onKeyPress(e) {
  switch (e.code) {
    case "Escape":
      onCloseModal();
      break;

    case "ArrowRight":
      showNextImage();
      break;

    case "ArrowLeft":
      showPrevImage();
      break;
  }
}

function showNextImage() {
  const activeImage = Number(lightboxImage.getAttribute("ind"));
  let index = activeImage ? activeImage : 0;
  const nextImageInd =
    index < galleryItems.length - 1 ? (index += 1) : (index = 0);

  lightboxImage.setAttribute("src", galleryItems[nextImageInd].original);
  lightboxImage.setAttribute("alt", galleryItems[nextImageInd].description);
  lightboxImage.setAttribute("ind", nextImageInd);
}

function showPrevImage() {
  const activeImage = Number(lightboxImage.getAttribute("ind"));
  let index = activeImage ? activeImage : galleryItems.length - 1;
  const prevImageInd =
    index > 0 ? (index -= 1) : (index = galleryItems.length - 1);

  lightboxImage.setAttribute("src", galleryItems[prevImageInd].original);
  lightboxImage.setAttribute("alt", galleryItems[prevImageInd].description);
  lightboxImage.setAttribute("ind", prevImageInd);
}

/*Intersection Observer API*/

/* определяем кого слушаем - картинок*/
const items = [...galleryContainer.children];

/*создаем объект настроек*/

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

/*создаем єкземляр observer*/
const observer = new IntersectionObserver(callback, options);

/*создаем функцию callback*/

function callback(entries, observer) {
/*   console.log(entries)
 */
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("observe")
    } else {entry.target.classList.remove("observe")}
      });
}

/*вызываем экземпляр*/
/* console.log(items)
 */
items.forEach((li) => {
  observer.observe(li);
});
