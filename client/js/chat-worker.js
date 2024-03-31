const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chat-container");

let userMessage;
let tempArr = []
let messages = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how are you?" },
];


function zipFile() {
  const zip = new JSZip();
  for (const file of fileInput.files) {
    zip.file(file.name, file);
  }
  return zip.generateAsync({type: "blob"});
}


function add_message(text, role = "user") {
  messages.push({ role: role, content: text });
}
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);

  let fileListHTML = "";
  let chatContent;

  if (fileInput.files.length > 0 && className === "user") {
    const fileList = document.createElement("ul");
    Array.from(fileInput.files).forEach((file) => {
      const fileItem = document.createElement("li");
      fileItem.textContent = file.name;
      fileList.appendChild(fileItem);
    });
    const fileContainer = document.createElement("div");
    fileContainer.classList.add("file-info");
    fileContainer.appendChild(fileList);
    fileListHTML = fileContainer.outerHTML;

    chatContent =
      className === "user"
        ? `${fileListHTML}<p> ${message}</p>`
        : `<span>SC</span><p>${message}</p>`;
  } else {
    chatContent =
      className === "user"
        ? `<p>${message}</p>`
        : `<span>SC</span><p>${message}</p>`;
  }

  chatLi.innerHTML = chatContent;
  return chatLi;
  // delete the list on the .chat-input calss
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (userMessage || filesToUpload.length > 0) {
    chatBox.appendChild(createChatLi(userMessage, "user", filesToUpload));
    chatInput.value = "";
    fileInput.value = ""; 
    console.log('filesToUpload',filesToUpload)
    tempArr = [...filesToUpload]
    filesToUpload.length = 0
    
    updateFileList(); 
    
    setTimeout(() => {
      const incomingChatLi = createChatLi("Generating output...", "bot");
      chatBox.appendChild(incomingChatLi);
      generateResponse(incomingChatLi);
    }, 500);
  }
};

const generateResponse = (incomingChatLI) => {
  const messageElement = incomingChatLI.querySelector("p");
  const files = fileInput.files;
  console.log("files",tempArr)
  // if (files.length === 1) {
  //   // sendFileToBackend(files[0], messageElement);
  // } else if (files.length > 1) {
  //   zipFile().then(zippedBlob => {
  //     console.log('Zip process completed, now you can handle the blob.');
  //     // sendFilesAndMessage(zippedBlob, messageElement);
  //   }).catch(error => {
  //     console.error("Error preparing zipped files:", error);
  //   });
  // } else {
  // //   sendMessageOnly(messageElement);
  // }

  add_message(userMessage);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const conversation = JSON.stringify(messages);

  const url = "https://fastapi-production-9440.up.railway.app/chat+/";

  const formData = new FormData();
  formData.append('conversation', conversation);

  if (tempArr.length >= 1){
    formData.append('file',tempArr[0])
  }



  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      text = result["result"];
      sources = result["sources"];
      add_message(text, "assistant");
      messageElement.innerHTML = text;
      console.log('results',result)
    })
    .catch((error) => {
      console.log("error", error);
      messageElement.textContent = "Something is wrong. Please try again";
    });
};

// function sendFileToBackend(file, messageElement) {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('messageData', JSON.stringify({ userMessage }));

//   // Adjust this URL to your actual backend endpoint
//   fetch("https://fastapi-production-9440.up.railway.app/chat/file", {
//     method: "POST",
//     body: formData,
//   })
//   .then(handleBackendResponse.bind(null, messageElement))
//   .catch(handleBackendError.bind(null, messageElement));
//   console.log("got to sendFileToBackend");
// }

// function sendFilesAndMessage(zippedBlob, messageElement) {
//   const formData = new FormData();
//   formData.append('zippedFiles', zippedBlob, 'zippedFiles.zip');
//   formData.append('messageData', JSON.stringify({ userMessage }));

//   // Adjust this URL to your actual backend endpoint
//   fetch("https://fastapi-production-9440.up.railway.app/chat/files", {
//     method: "POST",
//     body: formData,
//   })
//   .then(handleBackendResponse.bind(null, messageElement))
//   .catch(handleBackendError.bind(null, messageElement));
//   console.log("got to sendFilesandMessage");
// }

// function sendMessageOnly(messageElement) {
//   // Here you would send just the chat message, similar to sending files but without FormData
//   // Reusing requestOptions from your existing code for consistency
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ userMessage }),
//     redirect: "follow",
//   };

//   fetch("https://fastapi-production-9440.up.railway.app/chat/message", requestOptions)
//     .then(handleBackendResponse.bind(null, messageElement))
//     .catch(handleBackendError.bind(null, messageElement));
// }

// function handleBackendResponse(messageElement, response) {
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json().then(result => {
//     text = result["result"];
//     sources = result["sources"];
//     add_message(text, "assistant");
//     messageElement.innerHTML = text;
//     console.log("got to handleBackendResponse");
//   });
// }

// function handleBackendError(messageElement, error) {
//   console.error('Error:', error);
//   messageElement.textContent = "Something is wrong. Please try again";
// }


sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});