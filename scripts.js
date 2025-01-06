document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventDescription = document.getElementById('eventDescription').value;

    if (eventName && eventDate) {
        // Create new event element
        const newEvent = document.createElement('div');
        newEvent.classList.add('event');
        newEvent.innerHTML = `
            <h3>${eventName}</h3>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>Description:</strong> ${eventDescription}</p>
            <div class="event-buttons">
                <button class="edit-btn">Edit Event</button>
                <button class="delete-btn">Delete Event</button>
            </div>
        `;

        // Add new event to the event list
        document.getElementById('eventList').appendChild(newEvent);

        // Clear input fields after adding the event
        document.getElementById('eventName').value = '';
        document.getElementById('eventDate').value = '';
        document.getElementById('eventDescription').value = '';
    } else {
        alert("Please fill in both the event name and date.");
    }
});

// Event delegation for edit and delete buttons
document.getElementById('eventList').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('delete-btn')) {
        // Delete the event
        e.target.parentElement.parentElement.remove();
    } else if (e.target && e.target.classList.contains('edit-btn')) {
        // Edit the event (can be expanded for real editing)
        const eventDiv = e.target.parentElement.parentElement;
        const eventName = eventDiv.querySelector('h3').textContent;
        const eventDate = eventDiv.querySelector('p').textContent.replace('Date: ', '');
        const eventDescription = eventDiv.querySelector('p:nth-of-type(2)').textContent.replace('Description: ', '');

        alert(`Edit Event:\nName: ${eventName}\nDate: ${eventDate}\nDescription: ${eventDescription}`);
    }
});
