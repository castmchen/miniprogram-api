export function onConnection(ws: WebSocket) {
  ws.onmessage = event => {
    let chatInfo = JSON.parse(event.data);
  };

  ws.send()
}

 (ws) => {
    ws.on("message", (message) => {

    })
    ws.send(JSON.stringify({message: "you are right"}))
