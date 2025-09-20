document.getElementById("ticketForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const count = parseInt(document.getElementById("ticketCount").value);
  const name = document.getElementById("customerName").value;
  const email = document.getElementById("customerEmail").value;

  // Fill summary
  document.getElementById("sumDate").textContent = date;
  document.getElementById("sumTime").textContent = time;
  document.getElementById("sumCount").textContent = count;
  document.getElementById("sumName").textContent = name;
  document.getElementById("sumEmail").textContent = email;

  // Show summary
  document.getElementById("summary").classList.remove("hidden");
});

document.getElementById("confirmBtn").addEventListener("click", function () {
  // You can calculate amount here, e.g. ₹150 per ticket
  const ticketCount = parseInt(document.getElementById("ticketCount").value);
  const totalAmount = ticketCount * 150;

  document.getElementById("totalAmount").textContent = totalAmount;
  document.getElementById("paymentSection").classList.remove("hidden");
});

