const express = require('express');
const router = express.Router();
var mongo = require('mongodb').MongoClient;
var url = require('../mongofile.js').development.db.connection;

router.get('/', (req, res, next) => {
  try {
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(400);
  }
})

router.post('/', (req, res, next) => {
  try {
    const data = JSON.parse(req.body)
    console.log('data: ', data);

    mongo.connect(url, (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      const db = client.db('getir');
      const collection = db.collection('foo')
      
      const jsInsert = {
        "startDate": data.startDate,
        "endDate": data.endDate,
        "minCount": data.minCount,
        "maxCount": data.maxCount
      }

      collection.insertMany({
        jsInsert
      }, (err, result) => {
        if (err) throw err;

        console.log(result)
      })

      //...
    })

    const rq = {
      "code": 0,
      "msg": "Success",
      "records": [{
        "key": "TAKwGc6Jr4i8Z487",
        "createdAt": "2017-01-28T01:22:14.398Z",
        "totalCount": (data.minCount + 100)
      },
      {
        "key": "NAeQ8eX7e5TEg7oH",
        "createdAt": "2017-01-27T08:19:14.135Z",
        "totalCount": (data.maxCount - 100)
      }
      ]
    }

    res.json(rq);

  } catch (error) {
    res.sendStatus(400);
  }
})

router.put('/:id', (req, res, next) => {
  try {
    const paramId = req.params.id;
    const ndialog_code = JSON.parse(req.body).dialog_code.toString()
    const ndialog_info = JSON.parse(req.body).dialog_info.toString()
    const ndialog_content = JSON.parse(req.body).dialog_content.toString()


  } catch (error) {
    res.sendStatus(400);
  }
})

router.delete('/:id', (req, res) => {
  try {
    const paramId = req.params.id;

  } catch (error) {
    res.sendStatus(400);
  }
})

module.exports = router;