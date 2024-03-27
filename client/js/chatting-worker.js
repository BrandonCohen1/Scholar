
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chat-container");

const API_KEY = "";
let userMessage;

let arr = [
  {"role": "user", "content": "Hi"},

  {"role": "assistant", "content": "Hi, how are you?"},
]

function add_message(text,role="user"){
  arr.push({"role":role,"content":text})
}
const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent = className === "user" ? `<p>${message}</p>` : `<span>SC</span><p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
}

const handleChat = () => {
  console.log("start")

  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatBox.appendChild(createChatLi(userMessage, "user"));
  chatInput.value = '';

  setTimeout(() => {
    const incomingChatLI = createChatLi("Hmmm...", "bot")
    chatBox.appendChild(incomingChatLI);
    generateResponse(incomingChatLI);
  }, 10000);
  console.log("done")
}

const generateResponse = (incomingChatLI) => {
  const messageElement = incomingChatLI.querySelector('p');
  console.log('user message',userMessage )
  add_message(userMessage)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify(arr);
  console.log("raw",raw)

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  console.log("SDDDd")
  fetch("https://fastapi-production-9440.up.railway.app/chat/", requestOptions)
  .then((response) =>response.json())
  .then((result) => {
    text = result['result']
    sources = result['sources']
    add_message(text,'assistant')
    messageElement.textContent = text
  })
  .catch((error) => {
    console.log('error')
    messageElement.textContent = "Something is wrong. Please try again";

  });
  console.log("done for real")

  // fetch('http://localhost:8080/api/chat', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ content: userMessage }),
  // })
  // .then(res => res.json())
  // .then(data => {
  //     messageElement.textContent = data.choices[0].message.content;
  // }).catch((error) => {
  //     console.log(error);
  //     messageElement.textContent = "Something is wrong. Please try again";
  // });
};

sendChatBtn.addEventListener("click", handleChat);

chatInput.addEventListener("keydown", function(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
})