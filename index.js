const express = require('express')
const cors = require('cors')
const {connectDB} = require("./database/database")
const app = express()

const http = require('http').Server(app)
const bodyParser = require('body-parser')
const config = require('./config/config')

connectDB();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use("/api", require('./routes/index'))

app.listen(config.port, () => {
  console.log('Server is running in port', config.port);
});


/*
const express = require("express");
const cors = require("cors")
const {connectDB} = require("./db/db");
const app = express();
const {guitarras} = require("./routes/guitarras")
const {usuarios} = require("./routes/usuarios")
connectDB();

app.use(express.json());
app.use(cors());
app.use('/guitarras',guitarras);
app.use('/usuarios',usuarios);

app.listen(3000,()=>{
    console.log("Estoy escuchando en el host: http://localhost:" + 3000);
});
*/