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

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let query = document.getElementById('querySearch').value;


    let max_results = document.getElementById('maxResults').value;


    let arxiv_active = document.getElementById('archive').checked;
    console.log(arxiv_active)



    const raw = "";

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`https://fastapi-production-9440.up.railway.app/search_all?query=${query}&max_results=${max_results}&api_key_ns=${formData.springerApiKey}&api_key_gs=${formData.googleScholarApiKey}&arxiv_active=${arxiv_active}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        for (let data in result ){
          console.log(data)
        }

      })
      .catch((error) => console.error(error));
    });
});
