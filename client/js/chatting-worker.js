const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chat-container");

let userMessage;

let arr = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how are you?" },
];

function add_message(text, role = "user") {
  arr.push({ role: role, content: text });
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
    filesToUpload = [];
  
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

  add_message(userMessage);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(arr);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  fetch("https://fastapi-production-9440.up.railway.app/chat/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      text = result["result"];
      sources = result["sources"];
      add_message(text, "assistant");
      messageElement.innerHTML = text;
    })
    .catch((error) => {
      console.log("error", error);
      messageElement.textContent = "Something is wrong. Please try again";
    });
};

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});
