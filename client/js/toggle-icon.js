document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('internet-icon').addEventListener('click', function() {
    const icons = this.querySelectorAll('.fa-solid');
    icons.forEach(icon => {
      if (icon.style.display === 'none') {
        icon.style.display = 'inline-block';
      } else {
        icon.style.display = 'none';
      }
    });
  });
});
