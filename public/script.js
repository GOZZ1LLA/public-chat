const socket = io({
  transports: ["polling"]
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const messagesDiv = document.getElementById("messages");

function addMessage(text) {
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Receive old messages
socket.on("chat-history", history => {
  messagesDiv.innerHTML = "";
  history.forEach(msg => {
    addMessage(msg.text);
  });
});

// Receive new messages
socket.on("chat-message", msg => {
  addMessage(msg.text);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  socket.emit("chat-message", text);
  input.value = "";
});
