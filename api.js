var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');

var mongo = require('mongodb').MongoClient;
var assert = require('assert');

router.use(express.json());
router.use(express.urlencoded());


// Connection URL
var url = 'mongodb://localhost:27017/test'; //test is the database which we want to use in MongoDB


router.get('/', function(req,res,next){
  res.send('api');
});

router.get('/get_data',function(req,res){
  var result = [] ;
  mongo.connect(url, function(err, db){
    assert.equal(null,err);
    
    db.collection('user-data').find({}).toArray(function(err,docs){
     if(!err) {
        console.log('getData Connection Successful');
    }
    else{
        console.log('Error in DB connection : ' + err);
    }
      result=docs;
      console.log(result);
      db.close();
      res.send(result);
  
    });
  });
 
});

router.post('/insert',function(req,res,next){

  var item = {
    name:req.body.name,
    age:req.body.age,
    gender:req.body.gender

  };

  mongo.connect(url, function(err, db) {
    assert.equal(null,err);
    db.collection('user-data').insertOne(item,function(err,result){
      assert.equal(null,err);
      console.log('item inserted');
      db.close();
    });
  });



});

module.exports=router;