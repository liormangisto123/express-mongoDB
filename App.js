const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const mongoUri = 'mongodb+srv://yaron:12345@cluster0.tsq8t.mongodb.net/test';
const mongoClient = new MongoClient(mongoUri, { useUnifiedTopology: true })
var ObjectId = require('mongodb').ObjectId;

// , { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 10, maxPoolSize: 10 }

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/Businesses', (req, res) => {
  mongoClient.db('test').collection('businesses').find({}).toArray((err, results) => {
    if (err) {
      console.log(e)
      return
    }
    res.json(results);
  })
})

app.get('/Businesses/:id', (req, res) => {
  let id = req.params.id;
  mongoClient.db('test').collection('businesses').findOne({ _id : new ObjectId(id) })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err)
    })

})

app.post('/AddNewBusiness', async (req, res) => {
  console.log(req.body);

  try {
    console.log('calling mongo')
    await mongoClient.db('test').collection('businesses').insertOne(req.body);
    console.log('success!!')

  } catch (e) {

    console.log('oops error')
    console.log(e)
  }
})
mongoClient.connect(async err => {

  if (err) {
    console.log(err);
    return;
  }

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

})




