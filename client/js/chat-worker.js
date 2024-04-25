const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chat-container");

let userMessage;
let pdfsBeingSentOut = []
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
        : `<span><img src="../images/50Logo.png" id="logo"></span><p>${message}</p>`;
  } else {
    chatContent =
      className === "user"
        ? `<p style='padding:15px 0px 15px 10px'>${message}</p>`
        : `<span><img src="../images/50Logo.png" id="logo"></span><p style='padding:5px 5px 5px 10px'>${message}</p>`;
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
    pdfsBeingSentOut = [...filesToUpload]
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

  add_message(userMessage);

  const url = "https://fastapi-production-9440.up.railway.app/chat+/";
  const formData = new FormData();
  const conversation = JSON.stringify(messages);
  
  formData.append('conversation', conversation);

  pdfsBeingSentOut.forEach((file) => {
    formData.append('files', file); 
  });

  const requestOptions = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log("result", result);
      const text = result["result"];
      const sources = result["source_sheet"];
    
      add_message(text, "assistant");
      messageElement.innerHTML = text;
    
      console.log('results', result);
    })
    .catch((error) => {
      console.error("error", error);
      messageElement.textContent = "Something is wrong. Please try again.";
    });
};



sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});