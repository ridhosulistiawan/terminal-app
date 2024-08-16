const socket = new WebSocket(`ws://${window.location.host}`);
const term = new Terminal();

term.open(document.getElementById('terminal'));

socket.onmessage = function (event) {
    term.write(event.data);
};

term.onData(function (data) {
    socket.send(data);
});

