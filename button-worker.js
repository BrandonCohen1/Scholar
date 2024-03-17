const fileSelectBtn = document.getElementById('file-select-btn');
const fileInput = document.getElementById('file-input');

fileSelectBtn.addEventListener('click', () => {
  console.log('File chose')
  fileInput.click();
});
fileInput.addEventListener('change', (e) => {
  const fileCount = e.target.files.length;
  if (fileCount === 0) {
    fileSelectBtn.nextElementSibling.textContent = "No file chosen";
    return;
  }
  if (fileCount === 1) {
    fileInput.nextElementSibling.nextElementSibling.textContent = e.target.files[0].name;
  } else {
    fileInput.nextElementSibling.nextElementSibling.textContent = `${fileCount} files selected`;
  }
})