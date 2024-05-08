const fileSelectBtn = document.getElementById("file-select-btn");
const fileInput = document.getElementById("file-input");
const fileListContainer = document.querySelector('.selected-files-container');

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

  const oversizedFiles = filesToUpload.filter((file) => file.size > 2097152);
  if (oversizedFiles.length > 0) {
    alert(
      `The file(s) ${oversizedFiles
        .map((file) => file.name)
        .join(
          ", "
        )} is/are too large. Please upload files that are smaller than 2 MB.`
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
  if (!fileListContainer) {
    console.error('Selected files container not found');
    return;
  }

  if (filesToUpload.length > 0) {
    fileListContainer.style.display = 'block';
  } else {
    fileListContainer.style.display = 'none';
    fileInput.value = '';  // Clear input when there are no files
    return;
  }

  fileListContainer.innerHTML = '';
  const ul = document.createElement("ul");
  
  filesToUpload.forEach((file, index) => {
    const li = document.createElement("li");
    const blobUrl = URL.createObjectURL(file);
    li.classList.add("file-listing");
  
    const fileNameLink = document.createElement("a");
    fileNameLink.textContent = file.name;
    fileNameLink.href = blobUrl;
    fileNameLink.target = "_blank";
    li.appendChild(fileNameLink);
  
    const removeFile = document.createElement("span");
    removeFile.textContent = "x";
    removeFile.className = "remove-file";
    removeFile.style.cursor = "pointer";
    removeFile.onclick = () => {
      removeFileFromList(index); // Pass index to remove
    };
    li.appendChild(removeFile);
    ul.appendChild(li);
  });
  fileListContainer.appendChild(ul);
}

function removeFileFromList(index) {
  filesToUpload.splice(index, 1); // Remove the file from the array
  updateFileList(); // Update the UI list
  resetFileInput(); // Reset the file input to reflect the current file list
}

function resetFileInput() {
  fileInput.value = '';  // Clear the file input first
  if (filesToUpload.length === 0) return; // If no files, nothing more to do

  const dataTransfer = new DataTransfer();
  filesToUpload.forEach(file => {
    dataTransfer.items.add(file);  // Add each file back to the new DataTransfer object
  });

  fileInput.files = dataTransfer.files; // Set the file input's files to our new set of files
}
