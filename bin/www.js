#!/usr/bin/env node

"use strict"

const server = require("../dist/server.js")
const debug = require("debug")("express:server")
const http = require("http")
const webSocket = require("ws")
const httpPort = normalizePort(process.env.Port || 8080)
const app = server.Server.bootstrap().app
const httpServer = http.createServer(app)
httpServer.on("error", onError)
httpServer.on("listening", onListening)
const wss = new webSocket.Server({ noServer: true })
wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        debug(message);
    })
    ws.send("you are right")
})
httpServer.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/chat') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            debug("server has been connect successfully by wss")
            wss.emit("connection", ws, request)
        })
    } else {
        socket.destroy()
    }
})
httpServer.listen(httpPort)


function normalizePort(val) {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {
    if (error.syscall !== "listen") {
        throw error
    }

    const bind = typeof httpPort === "string" ? "Pipe" + httpPort : "Port" + httpPort
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE":
            console.error(bind + "already is used")
            process.exit(1)
            break
        default:
            throw error
    }
}

function onListening() {
    const address = httpServer.address()
    const bind = typeof httpPort === "string" ? "Pipe" + httpPort : "Port" + httpPort
    debug(`currently is listening on ${address}:${bind}`)
}
