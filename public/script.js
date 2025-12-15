const socket = io({
  transports: ["polling"]
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", e => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  socket.emit("chat-message", text);
  input.value = "";
});

socket.on("chat-message", msg => {
  const div = document.createElement("div");
  div.className = "message";
  div.textContent = msg;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});
