const socket = io();

const client_total = document.querySelector(".clients-total");
const message_form = document.getElementById("message-form");
const message_input = document.getElementById("message-input");
const name_input = document.getElementById("name-input");

message_form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {
  const data = {
    name: name_input.value,
    message: message_input.value,
    date: new Date(),
  };

  message_input.value = "";

  socket.emit("message", data);
}

socket.on("Client-total", (data) => {
  client_total.textContent = `Clients Total : ${data}`;
});

socket.on("chat_message", (data) => {
  console.log(data);
});
