const express = require("express");
const mongoose = require("mongoose");
const port = process.env.port || 1777;
const cors = require("cors")
const path = require("./Router")
// const url = "mongodb://localhost/playerAPI"
const url = "mongodb+srv://admin:admin12345@cluster0.bs8eu.mongodb.net/chrisdata?retryWrites=true&w=majority";

const app = express()
mongoose.connect(url, {
useCreateIndex: true,
useFindAndModify: false,
useNewUrlParser: true,
useUnifiedTopology: true,
})

.then(() => {
    console.log(`server is connected`)
})

app.use(cors());
app.use(express.json())
app.get ("/", async (req,res) => {
    res.status(200).send("let test some API")
})
app.use("/club/API", path)
app.listen(port, () => {
    console.log(`server is listening to port: ${port}`)
}) 