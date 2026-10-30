
const images = [...document.querySelectorAll(".gallery img")];
const filters = document.querySelectorAll(".filter");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("imageCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let visibleImages = images;
let currentIndex = 0;

function updateVisibleImages(category) {
    images.forEach(img => {
        img.hidden =
            category !== "all" &&
            img.dataset.category !== category;
    });

    visibleImages = images.filter(img => !img.hidden);
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        updateVisibleImages(button.dataset.category);
    });
});

function showImage(index) {
    if (visibleImages.length === 0) return;

    currentIndex =
        (index + visibleImages.length) % visibleImages.length;

    const img = visibleImages[currentIndex];

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    caption.textContent =
        `${img.alt} (${currentIndex + 1}/${visibleImages.length})`;
}

images.forEach(img => {
    img.addEventListener("click", () => {
        visibleImages = images.filter(item => !item.hidden);
        currentIndex = visibleImages.indexOf(img);

        showImage(currentIndex);
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

nextBtn.addEventListener("click", () => {
    showImage(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
    showImage(currentIndex - 1);
});

function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
}

closeBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "ArrowRight") {
        showImage(currentIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showImage(currentIndex - 1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }
});
