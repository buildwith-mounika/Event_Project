function updatePrice() {
  const people = document.getElementById("peopleCount").value;
  let price = 0;

  switch (parseInt(people)) {
    case 1: price = 299; break;
    case 2: price = 598; break;
    case 3: price = 897; break;
    case 4: price = 1196; break;
    case 5: price = 1495; break;
    case 6: price = 1794; break;
    case 7: price = 2093; break;
    case 8: price = 2392; break;
    case 9: price = 2691; break;
    case 10: price = 2990; break;
  }

  document.getElementById("priceDisplay").textContent = `Total Price: ₹${price}`;
}


function updatePrice() {
  const peopleCount = document.getElementById("peopleCount");
  const selectedText = peopleCount.options[peopleCount.selectedIndex].text;
  const priceMatch = selectedText.match(/₹(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;

  document.getElementById("priceDisplay").textContent = `Total Price: ₹${price}`;
}

document.getElementById("openScannerBtn").addEventListener("click", function () {
  const peopleCount = document.getElementById("peopleCount");
  const selectedText = peopleCount.options[peopleCount.selectedIndex].text;
  const priceMatch = selectedText.match(/₹(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1], 10) : 0;

  document.getElementById("scanAmountText").textContent = `Pay ₹${price}`;
  document.getElementById("scannerModal").classList.add("show");
});

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("scannerModal").classList.remove("show");
});

document.getElementById("scannerModal").addEventListener("click", function (e) {
  if (e.target.id === "scannerModal") {
    document.getElementById("scannerModal").classList.remove("show");
  }
});

