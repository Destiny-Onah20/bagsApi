const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const app = require('./App')


const port = process.env.PORT
const Db = process.env.DATABASE

mongoose.connect(Db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongooseDB Conneted ");
})


app.listen(port , ()=>{
    console.log('Conneted' + port)
})