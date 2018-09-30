const WebSocket = require('ws');

const wss = new WebSocket.Server({host:"0.0.0.0", port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    var t = JSON.parse(message);
    // process.stdout.write(message+"\r")
    var z = (t[1].split(/;/))[2];

    var direction = null;
    if(z >= 3){
        direction = "left"
    }

    if(z <= -3){
        direction = "right"
    }

    if(direction){
        process.stdout.write("                "+"\r")
        process.stdout.write(direction+"\r")
    }

  });

  ws.send('something');
});
