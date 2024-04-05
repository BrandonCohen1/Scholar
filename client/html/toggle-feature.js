
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toggle-file-selection').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('toggle-internet-search').classList.remove('active');
    // Show File Selection UI
    // Hide Internet Search UI
  });

  document.getElementById('toggle-internet-search').addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('toggle-file-selection').classList.remove('active');
    // Hide File Selection UI
    // Show Internet Search UI
  });
});