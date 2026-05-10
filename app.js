const express = require("express")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
app.use(express.json())
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("User Connected:", socket.id)
    socket.on("send-message", ({ Usermsg, time,inputValue }) => {
        io.emit("recieve", { msg: Usermsg, time, senderId: socket.id ,inputValue:inputValue})
    })
    socket.on("disconnect", () => {

        console.log("User left")

    })
})

module.exports = { server }
