const socket = io();

const total_clients = document.getElementById('clients-total');
const messageContaoner = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

const messageTone = new Audio('/message-tone.mp3');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sendMessage();
});

function sendMessage() {
  console.log('message', messageInput.value);
  if (messageInput.value === '') return;
  const data = {
    name: nameInput.value,
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit('message', data);
  addMessageToUI(true, data);
  messageInput.value = '';
}

socket.on('clients-total', (data) => {
  console.log('data', data);
  total_clients.innerText = `Total clients: ${data}`;
});

socket.on('chat-message', (data) => {
  console.log('chat message data', data);
  messageTone.play();
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  clearFeedback();
  const messageElement = `
  <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
    <p class="message">
      ${data.message}
      <span>${data.name} - ${moment(data.dateTime).fromNow()}</span>
    </p>
  </li>
  `;

  messageContaoner.innerHTML += messageElement;
  scrollToBottom();
}

function scrollToBottom() {
  messageContaoner.scrollTo(0, messageContaoner.scrollHeight);
}

messageInput.addEventListener('focus', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} is typing a message`,
  });
});
messageInput.addEventListener('keypress', (e) => {
  socket.emit('feedback', {
    feedback: `${nameInput.value} is typing a message`,
  });
});
messageInput.addEventListener('blur', (e) => {
  socket.emit('feedback', {
    feedback: '',
  });
});

socket.on('feedback', (data) => {
  clearFeedback();
  const feedback_element = `<li class="message-feedback">
  <p class="feedback" id="feedback">
    ${data.feedback}
  </p>
</li>`;
  messageContaoner.innerHTML += feedback_element;
});

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
