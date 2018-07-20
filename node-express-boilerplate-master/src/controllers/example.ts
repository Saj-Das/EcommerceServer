import { Request, Response } from 'express';
import * from  'mongoose'

module Example {
'use strict';

var MongoClient = require('mongodb').MongoClient
var mongoDB = 'mongodb://localhost:27017';


export function healthCheck (req: Request, res: Response) {
  

  MongoClient.connect(mongoDB, function (err, client) {
    if (err) throw err
  
    var db = client.db('Renova')
    
    db.collection('User').find().toArray(function (err, result) {
      if (err) throw err
  res.send(result)
    
    })
  })

})
}

}
export = Example;
