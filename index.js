const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()


const uri = "mongodb+srv://<username>:<password>@cluster0.ewkr7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


const app = express()

app.use(bodyParser.json());
app.use(cors());


const port = 5000;


app.get('/', (req, res) => {
    res.send("hello FAHIM KAMON CHOLE")
})



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const servicesCollection = client.db("codeGlobe").collection("services");
  const testimonialsCollection = client.db("codeGlobe").collection("testimonials");
  


});






app.listen(process.env.PORT || port)