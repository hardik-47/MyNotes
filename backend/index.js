const connectToMongo =require('./db');
const express = require('express')
const cors= require('cors');


connectToMongo();

const app = express()
const port = 5000


const corsOptions={

  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials:true,

};

app.use(cors(corsOptions));
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

