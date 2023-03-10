/***************************** */
// DEPENDENCIES
/***************************** */
require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const AuthRouter = require('./controllers/user')
const auth = require('./auth')

const { PORT = 3030, DATABASE_URL } = process.env


/***************************** */
// DATABASE CONNECTION
/***************************** */
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error))

/***************************** */
// MODELS
/***************************** */
const LicenseSchema = new mongoose.Schema({
    number: String,
    status: String,
    dateIssued: String,
    expiryDate: String,
    firstName: String,
    lastName: String,
    type: String
})

const License = mongoose.model("License", LicenseSchema)
/***************************** */
// MIDDLEWARE
/***************************** */
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// ROUTERS

app.get('/', auth, (req, res) => {
    res.json(req.payload)
})

app.use('/auth', AuthRouter)

/***************************** */
// ROUTES
/***************************** */
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

// INDEX ROUTE
app.get("/findmylicense", async (req, res) => {
    try {
        res.json(await License.find({}))
    } catch (error) {
        res.status(400).json(error)
    }
})

// CREATE ROUTE
app.post("/findmylicense", async (req, res) => {
    try {
        res.json(await License.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

// GET LICENSE FOR ID ROUTE
app.get('/findmylicense/:id', async (req, res) => {
    try{
        res.json(await License.findById(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

// UPDATE LICENSE ROUTE
app.put('/findmylicense/:id', async (req, res) => {
    try{
        res.json(await License.findByIdAndUpdate(req.params.id, req.body, {new: true}))
    }catch(error){
        res.status(400).json(error)
    }
})

// DELETE LICENSE ROUTE
app.delete('/findmylicense/:id', async (req, res) => {
    try{
        res.json(await License.findByIdAndDelete(req.params.id))
    }catch(error){
        res.status(400).json(error)
    }
})

/***************************** */
// SERVER LISTENER
/***************************** */
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})