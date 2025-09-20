// ======= EVENTS =======
let events = [
    {id: 1, name: "Music Fest", date: "2025-09-10", seats: 100},
    {id: 2, name: "Comedy Show", date: "2025-09-15", seats: 50}
];

let bookings = [
    {id: 1, event: "Music Fest", name: "Aarav", seats: 2},
    {id: 2, event: "Comedy Show", name: "Priya", seats: 4}
];

let editEventId = null;
let editBookingId = null;

// ====== LOAD PAGE ======
function loadPage(page) {
    // remove old active
    document.querySelectorAll(".sidebar ul li")
        .forEach(li => li.classList.remove("active"));

    // set clicked one as active
    const clickedItem = [...document.querySelectorAll(".sidebar ul li")]
        .find(li => li.getAttribute("onclick").includes(page));
    if (clickedItem) clickedItem.classList.add("active");

    let content = "";

    if (page === "dashboard") {
        content = `
            <h1>Dashboard</h1>
            <p>Total Events: ${events.length}</p>
            <p>Total Bookings: ${bookings.length}</p>
        `;
    }

    else if (page === "events") {
        content = `
            <h1>Events</h1>
            <button onclick="openEventModal()">Add Event</button>
            <table>
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Seats</th>
                      <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="eventTable"></tbody>
            </table>
        `;
    }

    else if (page === "bookings") {
        content = `
            <h1>Bookings</h1>
            <button onclick="openBookingModal()">Add Booking</button>
            <table>
                <thead>
                  <tr>
                      <th>ID</th>
                      <th>Event</th>
                      <th>Name</th>
                      <th>Seats</th>
                      <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="bookingTable"></tbody>
            </table>
        `;
    }

    else if (page === "reports") {
        content = `<h1>Reports</h1><p>Reports will be shown here...</p>`;
    }

    else if (page === "settings") {
        content = `<h1>Settings</h1><p>Settings options here...</p>`;
    }

    document.getElementById("mainContent").innerHTML = content;

    // render tables
    if (page === "events") renderEvents();
    if (page === "bookings") renderBookings();
}

// ====== EVENT FUNCTIONS ======
function renderEvents() {
    const table = document.getElementById("eventTable");
    if (!table) return;
    table.innerHTML = "";
    events.forEach(e => {
        table.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.date}</td>
                <td>${e.seats}</td>
                <td>
                    <button onclick="editEvent(${e.id})">Edit</button>
                    <button onclick="deleteEvent(${e.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openEventModal(edit = false) {
    document.getElementById("eventModal").style.display = "block";
    document.getElementById("modalTitle").innerText = edit ? "Edit Event" : "Add Event";
}

function closeModal() {
    document.getElementById("eventModal").style.display = "none";
    document.getElementById("eventName").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventSeats").value = "";
    editEventId = null;
}

function saveEvent() {
    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const seats = Number(document.getElementById("eventSeats").value);

    if (editEventId) {
        const event = events.find(e => e.id === editEventId);
        event.name = name;
        event.date = date;
        event.seats = seats;
    } else {
        const newEvent = {
            id: events.length ? events[events.length - 1].id + 1 : 1,
            name,
            date,
            seats
        };
        events.push(newEvent);
    }

    closeModal();
    renderEvents();
}

function editEvent(id) {
    const event = events.find(e => e.id === id);
    document.getElementById("eventName").value = event.name;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("eventSeats").value = event.seats;
    editEventId = id;
    openEventModal(true);
}

function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    renderEvents();
}

// ======= BOOKINGS =======
function renderBookings() {
    const table = document.getElementById("bookingTable");
    if (!table) return;
    table.innerHTML = "";
    bookings.forEach(b => {
        table.innerHTML += `
            <tr>
                <td>${b.id}</td>
                <td>${b.event}</td>
                <td>${b.name}</td>
                <td>${b.seats}</td>
                <td>
                    <button onclick="editBooking(${b.id})">Edit</button>
                    <button onclick="deleteBooking(${b.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function openBookingModal(edit = false) {
    const modal = document.createElement("div");
    modal.id = "bookingModal";
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2 id="bookingModalTitle">${edit ? "Edit Booking" : "Add Booking"}</h2>
            <input type="text" id="bookingEvent" placeholder="Event Name">
            <input type="text" id="bookingName" placeholder="Customer Name">
            <input type="number" id="bookingSeats" placeholder="Seats Booked">
            <button onclick="saveBooking()">Save</button>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "block";
}

function saveBooking() {
    const event = document.getElementById("bookingEvent").value;
    const name = document.getElementById("bookingName").value;
    const seats = Number(document.getElementById("bookingSeats").value);

    if (editBookingId) {
        const booking = bookings.find(b => b.id === editBookingId);
        booking.event = event;
        booking.name = name;
        booking.seats = seats;
    } else {
        const newBooking = {
            id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
            event,
            name,
            seats
        };
        bookings.push(newBooking);
    }

    document.getElementById("bookingModal").remove();
    renderBookings();
}

function editBooking(id) {
    const booking = bookings.find(b => b.id === id);
    openBookingModal(true);
    document.getElementById("bookingEvent").value = booking.event;
    document.getElementById("bookingName").value = booking.name;
    document.getElementById("bookingSeats").value = booking.seats;
    editBookingId = id;
}

function deleteBooking(id) {
    bookings = bookings.filter(b => b.id !== id);
    renderBookings();
}
