const fileSelectBtn = document.getElementById('file-select-btn');
const fileInput = document.getElementById('file-input');
const selectedFiles = document.querySelector('.selected-files');

fileSelectBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  const fileCount = e.target.files;

  const ul = document.createElement('ul');
  for (file of fileCount) {
    const li = document.createElement('li');
    li.textContent = `${file.name} - ${file.size} bytes`;
    ul.appendChild(li);
  }
  selectedFiles.appendChild(ul);

})