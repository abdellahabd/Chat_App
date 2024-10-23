const socket = io();

const client_total = document.querySelector(".clients-total");
socket.on("Client-total", (data) => {
  client_total.textContent = `Clients Total : ${data}`;
});
