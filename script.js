// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Booking modal functionality
const modal = document.getElementById('bookingModal');

function openBookingModal() {
  modal.style.display = 'block';
  populateTimeSlots();
}

function closeBookingModal() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeBookingModal();
  }
}

// Populate time slots based on date
function populateTimeSlots() {
  const timeSelect = document.getElementById('time');
  timeSelect.innerHTML = ''; // Clear existing options
  
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a time';
  timeSelect.appendChild(defaultOption);

  // Add time slots from 9 AM to 5 PM
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      const timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
      const option = document.createElement('option');
      option.value = timeStr;
      option.textContent = timeStr;
      timeSelect.appendChild(option);
    }
  }
}

// Handle form submission
function handleBooking(event) {
  event.preventDefault();
  
  // Get form data
  const service = document.getElementById('service').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  // Prepare email content
  const emailData = {
    service,
    date,
    time,
    name,
    email,
    phone
  };

  // Send email via Formspree
  fetch("https://formspree.io/f/movvopga", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: `
        Booking Details:
        Service: ${service}
        Date: ${date}
        Time: ${time}
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
      `
    })
  })
    .then(response => {
      if (response.ok) {
        // Show confirmation
        alert('Thank you for booking! We will contact you to confirm your appointment.');
        closeBookingModal();
      } else {
        throw new Error("Something went wrong while sending the email.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert('There was an error submitting your booking. Please try again.');
    });
}

// Set minimum date to today
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Date input change handler
document.getElementById('date').addEventListener('change', populateTimeSlots);