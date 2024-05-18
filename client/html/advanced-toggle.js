document.addEventListener('DOMContentLoaded', function() {
  // Modal control
  const openModalButtons = document.querySelectorAll('[data-modal-target]');
  const closeModalButtons = document.querySelectorAll('[data-close-button]');
  const overlay = document.getElementById('overlay');

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
  }

  // Form submission
  const form = document.getElementById('search');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = {};

    if (document.getElementById('springer').checked) {
      formData.springerApiKey = document.getElementById('springerApi').value;
    }

    if (document.getElementById('google').checked) {
      formData.googleScholarApiKey = document.getElementById('googleApi').value;
    }

    fetch('/your-backend-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      closeModal(document.querySelector('#modal')); // Close modal on successful data submission
    })
    .catch((error) => {
      console.error('Error:', error);
      // Optionally handle errors, e.g., keep the modal open, show an error message, etc.
    });
  });
});
