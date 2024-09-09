// script.js
let users = {}; // Object to store users and their passwords
let currentUser = null; // Store the current logged-in user
let currentChatUser = null; // Store the current user being chatted with

// Register a new user
function registerUser() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (username && password) {
        if (users[username]) {
            alert('Username already exists. Please choose another.');
        } else {
            users[username] = password;
            alert('Registration successful! Please login.');
            showLogin();
        }
    } else {
        alert('Please enter both username and password.');
    }
}

// Login an existing user
function loginUser() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (users[username] && users[username] === password) {
        currentUser = username;
        showChatPage();
    } else {
        alert('Invalid username or password.');
    }
}

// Show login section
function showLogin() {
    document.getElementById('register-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

// Show register section
function showRegister() {
    document.getElementById('register-section').style.display = 'block';
    document.getElementById('login-section').style.display = 'none';
}

// Show the chat page
function showChatPage() {
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('chat-page').style.display = 'flex';
    populateUserList();
}

// Populate the user list (contacts)
function populateUserList() {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    for (const username in users) {
        if (username !== currentUser) { // Don't show the current user in the contact list
            const li = document.createElement('li');
            li.className = 'contact';
            li.textContent = username;
            li.onclick = () => selectUser(username);
            userList.appendChild(li);
        }
    }
}

// Select a user to chat with
function selectUser(username) {
    currentChatUser = username;
    document.getElementById('chat-with').textContent = `Chatting with ${username}`;
    document.getElementById('chat-messages').innerHTML = '';
}

// Send a message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();

    if (messageText && currentChatUser) {
        // Create a new message element
        const message = document.createElement('div');
        message.className = 'message sent';
        message.innerHTML = `<p>${messageText}</p>`;
        
        // Add the message to the chat area
        document.getElementById('chat-messages').appendChild(message);
        messageInput.value = '';

        // Simulate receiving a message
        setTimeout(() => {
            const receivedMessage = document.createElement('div');
            receivedMessage.className = 'message received';
            receivedMessage.innerHTML = `<p>Hi from ${currentChatUser}!</p>`;
            document.getElementById('chat-messages').appendChild(receivedMessage);
        }, 1000);
    }
}

// Search users
function searchUser() {
    const searchQuery = document.getElementById('search-user').value.toLowerCase();
    const userList = document.getElementById('user-list');
    const contacts = userList.getElementsByClassName('contact');

    for (let i = 0; i < contacts.length; i++) {
        const contactName = contacts[i].textContent.toLowerCase();
        if (contactName.includes(searchQuery)) {
            contacts[i].style.display = '';
        } else {
            contacts[i].style.display = 'none';
        }
    }
}
