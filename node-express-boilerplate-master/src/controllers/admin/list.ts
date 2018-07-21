import { Request, Response } from 'express';
import { connect, MongoClient } from 'mongodb'

module Example {
  'use strict';
  var mongoDB = 'mongodb://localhost:27017';

  export function userList(req: Request, res: Response) {
    MongoClient.connect(mongoDB, function (err, client) {
      if (err) throw err
      var db = client.db('Renova')
      db.collection('User').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
        client.close();
      })
    })
  }
  export function productList(req: Request, res: Response) {
    MongoClient.connect(mongoDB, function (err, client) {
      if (err) throw err
      var db = client.db('Renova')
      db.collection('Product').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
        client.close();
      })
    })
  }
  export function offerList(req: Request, res: Response) {
    MongoClient.connect(mongoDB, function (err, client) {
      if (err) throw err
      var db = client.db('Renova')
      db.collection('Offer').find().toArray(function (err, result) {
        if (err) throw err
        res.send(result)
        client.close();
      })
    })
  }

}
export = Example;
