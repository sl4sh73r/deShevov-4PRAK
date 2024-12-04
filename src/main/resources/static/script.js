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
    });
}

function appendLog(logId, message, type) {
    const logElement = document.getElementById(logId);
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = formatMessage(message);
    logElement.appendChild(logEntry);
    logElement.scrollTop = logElement.scrollHeight;
}

function formatMessage(message) {
    return message.replace(/(Server started|Client started|Received from server:|Sent to server:|Server response:)/g, '\n$1\n');
}

function startServer() {
    fetch('/server/start-server')
        .then(response => response.text())
        .then(data => {
            // appendLog('server-log', data, 'server');
        });
}

function stopServer() {
    fetch('/server/stop-server')
        .then(response => response.text())
        .then(data => {
            // appendLog('server-log', data, 'server');
        });
}

function startClient() {
    fetch('/client/start-client')
        .then(response => response.text())
        .then(data => {
            appendLog('client-log', data, 'client');
        });
}

function stopClient() {
    fetch('/client/stop-client')
        .then(response => response.text())
        .then(data => {
            appendLog('client-log', data, 'client');
        });
}

function sendMessage() {
    fetch('/client/send-message')
        .then(response => response.text())
        .then(data => {
            appendLog('client-log', data, 'client');
        });
}

window.onload = function() {
    connect();
};