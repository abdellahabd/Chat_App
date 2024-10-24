const socket = io();

const client_total = document.querySelector(".clients-total");
const message_form = document.getElementById("message-form");
const message_input = document.getElementById("message-input");
const name_input = document.getElementById("name-input");
const message_contiener = document.getElementById("message-container");

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
  socket.emit("message", data);

  addMessageToUi(true, data);

  message_input.value = "";
}

function addMessageToUi(isfromMe, data) {
  const element = `     
   <li class=${isfromMe ? "message-right" : "message-left"}>
          <p class="message">
        ${data.message}
            <span>${data.name} ● ${moment(data.date).fromNow()} </span>
          </p>
        </li>`;

  message_contiener.innerHTML += element;
}

socket.on("Client-total", (data) => {
  client_total.textContent = `Clients Total : ${data}`;
});

socket.on("chat_message", (data) => {
  addMessageToUi(false, data);
});
