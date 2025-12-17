import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const messagesRef = collection(db, "messages");

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messagesDiv = document.getElementById("messages");

const username =
  localStorage.getItem("username") || "An Unknown Brother";

// Listen for messages (LIVE)
onSnapshot(query(messagesRef, orderBy("number")), snapshot => {
  messagesDiv.innerHTML = "";
  snapshot.forEach(doc => {
    renderMessage(doc.data());
  });
});

function renderMessage(msg) {
  const wrap = document.createElement("div");
  wrap.className = "message-wrap";

  wrap.innerHTML = `
    <div class="username">${msg.user}</div>
    <div class="bubble">
      <span class="number">#${msg.number}</span>
      ${msg.text}
    </div>
  `;

  messagesDiv.appendChild(wrap);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function getNextNumber() {
  const snap = await getDocs(messagesRef);
  return snap.size + 1;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!input.value.trim()) return;

  const number = await getNextNumber();

  await addDoc(messagesRef, {
    user: username,
    text: input.value,
    number,
    created: Date.now()
  });

  input.value = "";
});
