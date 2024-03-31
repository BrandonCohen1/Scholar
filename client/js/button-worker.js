const fileSelectBtn = document.getElementById("file-select-btn");
const fileInput = document.getElementById("file-input");
const selectedFiles = document.querySelector("selected-files");


let filesToUpload = [];

fileSelectBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  filesToUpload = Array.from(e.target.files);

  if (filesToUpload.length > 5) {
    alert("You can only upload 5 files at a time.");
    return;
  }

  const oversizedFiles = filesToUpload.filter((file) => file.size > 1048576);
  if (oversizedFiles.length > 0) {
    alert(
      `The file(s) ${oversizedFiles
        .map((file) => file.name)
        .join(
          ", "
        )} is/are too large. Please upload files that are smaller than 1 MB.`
    );
    return;
  }

  const acceptedFileTypes = ['application/pdf'];
  const unacceptedTypes = filesToUpload.filter(file => !acceptedFileTypes.includes(file.type));
  if (unacceptedTypes.length > 0) {
    alert(
      `We only accpet pdf file. The file(s) ${unacceptedTypes.map((file) => file.name).join(", ")} is/are not pdf.`
    );
    return;
  }
  updateFileList();
});

function updateFileList() {
  const fileListContainer = document.querySelector('.selected-files-container .selected-files'); 
  if (!fileListContainer) {
    console.error('Selected files container not found');
    return;
  }

  fileListContainer.innerHTML = '';

  const ul = document.createElement("ul");
  filesToUpload.forEach((file) => {
    const li = document.createElement("li");
    li.classList.add("file-listing");
    li.textContent = `${file.name}`;

    const removeFile = document.createElement("span");
    removeFile.textContent = "X";
    removeFile.className = "remove-File";
    removeFile.style.cursor = "pointer";
    removeFile.addEventListener("click", function() {
      filesToUpload = filesToUpload.filter(f => f !== file);
      updateFileList();
    });

    li.appendChild(removeFile);
    ul.appendChild(li);
  });
  
  fileListContainer.appendChild(ul);
}

