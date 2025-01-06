// Function to render events dynamically
const renderEvents = () => {
    const eventListContainer = document.getElementById('eventList');
    eventListContainer.innerHTML = ''; // Clear the existing events

    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (events.length === 0) {
        eventListContainer.innerHTML = `<p>No upcoming events</p>`;
        return;
    }

    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <div class="event-buttons">
                <button class="edit-btn" data-index="${index}">Edit Event</button>
                <button class="delete-btn" data-index="${index}">Delete Event</button>
            </div>
        `;
        eventListContainer.appendChild(eventDiv);
    });
};

// Event listener for creating a new event
document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;

    if (eventName && eventDate) {
        const newEvent = {
            name: eventName,
            date: eventDate,
            description: eventDescription
        };

        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));

        // Clear input fields
        document.getElementById('eventName').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventDescription').value = '';

        renderEvents(); // Re-render the events list
    } else {
        alert("Please fill in both the event name and date.");
    }
});

// Event delegation for handling event edit and delete actions
document.getElementById('eventList').addEventListener('click', function(e) {
    const index = e.target.getAttribute('data-index');
    const events = JSON.parse(localStorage.getItem('events')) || [];

    if (e.target && e.target.classList.contains('delete-btn')) {
        events.splice(index, 1); // Delete the event
        localStorage.setItem('events', JSON.stringify(events));
        renderEvents(); // Re-render the events list
    } else if (e.target && e.target.classList.contains('edit-btn')) {
        const event = events[index];
        const updatedName = prompt('Edit Event Name', event.name);
        const updatedDate = prompt('Edit Event Date', event.date);
        const updatedDescription = prompt('Edit Event Description', event.description);

        if (updatedName && updatedDate) {
            event.name = updatedName;
            event.date = updatedDate;
            event.description = updatedDescription;

            localStorage.setItem('events', JSON.stringify(events));
            renderEvents(); // Re-render the events list
        }
    }
});

// Initialize the page with events from local storage
document.addEventListener('DOMContentLoaded', renderEvents);
