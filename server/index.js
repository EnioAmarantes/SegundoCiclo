const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use(require('./helpers/mongo'))

app.use("/livros", require("./control/livroapi"))
app.use("/autor", require('./control/autorapi'));

app.listen(3000, () => {
    console.log("Listenning...")
})