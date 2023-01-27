const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const adminRoutes = require('./routers/usersRoutes')
const bagRoute = require('./routers/adminRoute')
const fileUpload = require('express-fileupload')


const app = express()
app.use(fileUpload({
    useTempFiles: true
}));
app.use(express.json())
app.use("/api", bagRoute)
app.use("/api", adminRoutes)



app.use('/',(req,res)=>{
    res.status(200).send("Welcome to my API")
})


module.exports = app
