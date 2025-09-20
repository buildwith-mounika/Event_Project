/* =========================
   BOOKING FORM FUNCTIONS
========================= */

// Open Booking Modal
function openBookingForm() {
  document.getElementById("bookingModal").style.display = "flex";
}

// Close Booking Modal
function closeBookingForm() {
  document.getElementById("bookingModal").style.display = "none";
}

// Submit Booking Form
function submitForm(event) {
  event.preventDefault();
  alert("🎉 Booking Confirmed!\nThank you for registering.");
  closeBookingForm();
  document.getElementById("bookingForm").reset();
}

/* =========================
   ABOUT MODAL WITH CARDS
========================= */
function showAbout() {
  // modal wrapper
  const modal = document.createElement("div");
  modal.id = "aboutModal";
  modal.className = "modal";
  modal.style.display = "flex";

  // modal content
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content about-modal";

  // close button
  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cssText = "cursor:pointer; float:right; font-size:20px;";
  closeBtn.onclick = () => modal.remove();

  // heading
  const heading = document.createElement("h2");
  heading.textContent = "About This Event";

  // cards container
  const cardsContainer = document.createElement("div");
  cardsContainer.className = "about-cards";

  // card data
  const cardData = [
    { img: "event1.jpg", title: "Hip-Hop", desc: "A night full of melodies and live performances." },
    { img: "event2.jpg", title: "classical", desc: "Laugh out loud with top comedians." },
    { img: "event3.jpg", title: "folk", desc: "Experience energy-packed dance performances." }
  ];

  // loop create cards
  cardData.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = c.img;
    img.alt = c.title;

    const title = document.createElement("h3");
    title.textContent = c.title;

    const desc = document.createElement("p");
    desc.textContent = c.desc;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);

    cardsContainer.appendChild(card);
  });

  // assemble modal
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(heading);
  modalContent.appendChild(cardsContainer);
  modal.appendChild(modalContent);

  document.body.appendChild(modal);
}

