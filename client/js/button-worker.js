const fileSelectBtn = document.getElementById("file-select-btn");
const fileInput = document.getElementById("file-input");
const selectedFiles = document.querySelector(".selected-files");

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
  updateFileList();
});

function updateFileList() {
  let existingList = selectedFiles.querySelector("ul");
  if (existingList) {
    existingList.remove();
  }

  const ul = document.createElement("ul");
  filesToUpload.forEach((file, index) => {
    const li = document.createElement("li");
    li.classList.add("file-listing");
    li.textContent = `${file.name} - ${file.size} bytes`;
    const removeFile = document.createElement("span");
    (removeFile.textContent = "X"), (removeFile.className = "remove-File");
    removeFile.style.cursor = "pointer";

    removeFile.addEventListener("click", () => {
      filesToUpload.splice(index, 1);

      updateFileList();
    });
    li.appendChild(removeFile);
    ul.appendChild(li);
  }, selectedFiles.appendChild(ul));
}
