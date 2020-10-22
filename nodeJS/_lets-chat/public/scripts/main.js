const socket = io();

const inboxPeople = document.querySelector(".onlineUsers");

let userName = "";

const newUserConnected = (user) => {
  userName = user || `User${Math.floor(Math.random() * 1000000)}`;
  socket.emit("new user", userName);
  addToUsersBox(userName);
};

const addToUsersBox = (userName) => {
  if (!!document.querySelector(`.${userName}-userlist`)) {
    return;
  }

  const userBox = `
    <div class="chat_ib ${userName}-userlist py-3">
      <h5>${userName}</h5>
    </div>
  `;
  inboxPeople.innerHTML += userBox;
};

// new user is created so we generate nickname and emit event
newUserConnected();

socket.on("new user", function (data) {
  data.map((user) => addToUsersBox(user));
});

socket.on("user disconnected", function (userName) {
  document.querySelector(`.${userName}-userlist`).remove();
});


const inputField = document.querySelector(".message_form__input");
const messageForm = document.querySelector(".message_form");
const messageBox = document.querySelector(".messages__history");
const mainInbox = document.querySelector(".inbox__messages");

const addNewMessage = ({ user, message }) => {
  const time = new Date();
  const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

  const receivedMsg = `
  <div class="incoming__message clearfix">
    <div class="received__message px-3 py-2 float-left my-1">
      <p>${message}</p>
      <div class="message__info">
        <span class="message__author font-weight-lighter">${user}</span>
      </div>
    </div>
  </div>`;

  const myMsg = `
  <div class="outgoing__message clearfix">
    <div class="sent__message px-3 py-2 float-right my-1">
      <p>${message}</p>
    </div>
  </div>`;

  messageBox.innerHTML += user === userName ? myMsg : receivedMsg;
  mainInbox.scrollTop = mainInbox.scrollHeight;
};

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputField.value) {
    return;
  }

  socket.emit("chat message", {
    message: inputField.value,
    nick: userName,
  });

  inputField.value = "";
});

socket.on("chat message", function (data) {
  addNewMessage({ user: data.nick, message: data.message });
});
