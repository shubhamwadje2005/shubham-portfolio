const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const path = require("path");

const app = express()
app.use(express.json())
app.use(express.static("dist"));
app.use(cors({ origin: "https://shubham-portfolio-vgfs.onrender.com", credentials: true }))

app.use("/api/contact", require("./routes/contact.route"))


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: "server error" })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("db connected")
    app.listen(process.env.PORT || 5000, console.log("Server Running..."))
})