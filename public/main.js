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
  if (message_input.value == "") {
    return;
  }
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
  clearFeedback();
  const element = `     
   <li class=${isfromMe ? "message-right" : "message-left"}>
          <p class="message">
        ${data.message}
            <span>${data.name} ● ${moment(data.date).fromNow()} </span>
          </p>
        </li>`;

  message_contiener.innerHTML += element;
  AutomaticallyScroll();
}

socket.on("Client-total", (data) => {
  client_total.textContent = `Clients Total : ${data}`;
});

socket.on("chat_message", (data) => {
  addMessageToUi(false, data);
});

function AutomaticallyScroll() {
  message_contiener.scrollTo(0, message_contiener.scrollHeight);
}

message_input.addEventListener("keypress", (e) => {
  socket.emit("feedback", name_input.value);
});

socket.on("feedback", (username) => {
  clearFeedback();
  const feedback_element = `        <li class="message-feedback">
    <p class="feedback">
    ✍ ${username} is typing a message...
    </p>
    </li>`;
  message_contiener.innerHTML += feedback_element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
