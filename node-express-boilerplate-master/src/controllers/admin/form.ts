import { Request, Response } from 'express';
import { connect, MongoClient } from 'mongodb'
import * as multer from 'multer'
module Example {
    'use strict';
    var mongoDB = 'mongodb://localhost:27017';

    export function userAdd(req: Request, res: Response) {

        MongoClient.connect(mongoDB, function (err, client) {
            if (err) throw err
            var db = client.db('Renova')
            db.collection('User').insertOne(req.body, function (err, result) {
                if (err) throw err
                res.send(result);
            })
        });
    }
    export function AddOffer(req: Request, res: Response) {
        MongoClient.connect(mongoDB, function (err, client) {
            if (err) throw err
            var db = client.db('Renova')
            db.collection('Offer').insertOne(req.body, function (err, result) {
                if (err) throw err
                res.send(result);
            })
        });
    }
    function convert(collection, from, to) {
        var i;
        for (i = 0; i < collection.length; i++) {
            collection[i][to] = collection[i][from];
            delete collection[i][from];
        }
        return collection;
    }
    export function Populatedropdown(req: Request, res: Response) {
        MongoClient.connect(mongoDB, function (err, client) {
            if (err) throw err
            var db = client.db('Renova')
            db.collection('Product').find({}).project({ ProductName: 1 }).toArray((err, collection) => {
                var step1 = convert(collection, "_id", "id");
                var step2 = convert(step1, "ProductName", "name");
                if (err) throw err;
                res.send(step2);
                client.close();
            });
        });
    }
    export function PostFile(req: Request) {
        try {
            MongoClient.connect(mongoDB, function (err, client) {
                if (err) throw err
                var db = client.db('Renova')
                var fileName = req.file.filename;
                var data =JSON.parse(req.body.data);
                 data["image"] = "uploads/" + fileName;
                 console.log(req);
                data["Time"] = Date.now();
                data["SoldQuantity"] = 0;
                db.collection('Product').insertOne(data, function (err, result) {
                    if (err) throw err
                    return "success";
                })
            });
        }
        catch (error) {
            return error;
        }
    }
}
export = Example;
