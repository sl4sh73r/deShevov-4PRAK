let stompClient = null;

function connect() {
    if (stompClient !== null) {
        return;
    }
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/server-log', function (message) {
            appendLog('server-log', message.body, 'server');
        });
        stompClient.subscribe('/topic/client-log', function (message) {
            appendLog('client-log', message.body, 'client');
        });
        stompClient.subscribe('/topic/token-log', function (message) {
            appendLog('token-log', message.body, 'token');
        });
    });
}

function appendLog(logId, message, type) {
    const logElement = document.getElementById(logId);
    const lastLogEntry = logElement.lastElementChild;

    // Check if the last log entry is the same as the new message
    if (lastLogEntry && lastLogEntry.textContent === formatMessage(message)) {
        return;
    }

    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = formatMessage(message);
    logElement.appendChild(logEntry);
    logElement.scrollTop = logElement.scrollHeight;
}

function formatMessage(message) {
    return message.replace(/(Server started|Client started|Received from server:|Sent to server:|Server response:|Parsed token:)/g, '\n$1\n');
}

function fetchAndLog(url, logId, type) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            appendLog(logId, data, type);
        });
}

function startServer() {
    fetchAndLog('/server/start-server', 'server-log', 'server');
}

function stopServer() {
    fetchAndLog('/server/stop-server', 'server-log', 'server');
}

function startClient() {
    fetchAndLog('/client/start-client', 'client-log', 'client');
}

function stopClient() {
    fetchAndLog('/client/stop-client', 'client-log', 'client');
}

function sendMessage() {
    fetchAndLog('/client/send-message', 'client-log', 'client');
}

function parseToken() {
    const token = document.getElementById('token-input').value;
    fetch('/token/parse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => response.text())
    .then(data => {
        appendLog('token-log', data, 'token');
    });
}

window.onload = function() {
    connect();
};