/* =========================
   SIGNATURE SERVICES LOGIC
========================= */

const buttons = document.querySelectorAll(".service-item");
const flag = document.querySelector(".service-flag");
const collapses = document.querySelectorAll(".service-collapse");
const servicesRow = document.querySelector(".services-row");

function moveFlag(btn) {
  if (!btn || !flag || !servicesRow) return;

  const btnRect = btn.getBoundingClientRect();
  const rowRect = servicesRow.getBoundingClientRect();

  const x =
    btnRect.left -
    rowRect.left +
    (btnRect.width / 2) -
    12;

  flag.style.left = `${x}px`;
}


if (buttons.length) {
  buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      // Active button
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Collapse behavior
      collapses.forEach(c => c.classList.remove("show"));
      const target = document.querySelector(
        `.service-collapse[data-service="${i}"]`
      );
      if (target) target.classList.add("show");

      // Move flag
      moveFlag(btn);
    });
  });

  // Initialize flag on first item
  moveFlag(buttons[0]);
}

/* =========================
   GALLERY MODAL (GLOBAL)
========================= */

const modal = document.getElementById("galleryModal");

if (modal) {
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".gallery-modal .close");
  const nextBtn = document.querySelector(".arrow.right");
  const prevBtn = document.querySelector(".arrow.left");

  let galleryImages = [];
  let currentIndex = 0;

  // Delegate clicks for ALL galleries
  document.addEventListener("click", (e) => {
    const img = e.target.closest(
      ".gallery-grid img, .gallery-track img"
    );

    if (!img) return;

    galleryImages = Array.from(
      img.closest(".gallery-grid, .gallery-track").querySelectorAll("img")
    );

    currentIndex = galleryImages.indexOf(img);

    modal.style.display = "flex";
    modalImg.src = img.src;
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImg.src = galleryImages[currentIndex].src;
  });
}
