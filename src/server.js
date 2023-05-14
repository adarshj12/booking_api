const express = require('express');
const cors = require('cors');
const app = express();
const userRoute = require('../src/routes/users');
const clientRoute = require('../src/routes/clients')
const connection = require('../src/config/db');
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user',userRoute)
app.use('/api/v1/client',clientRoute)

app.all('*',(req,res)=>{
    res.status(404).json('invalid route')
})

const port = process.env.PORT

app.listen(port, async () => {
    await connection();
    console.log(`server started at http://localhost:${port}`);
})