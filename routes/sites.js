var Site = require('../models/site').model;

function toKeyValuePairs(inputObject) {
  var outputArray = [];
  for (var prop in inputObject){
    if (inputObject.hasOwnProperty(prop)){
      outputArray.push({
        'key' : prop,
        'value' : inputObject[prop]
       });
    }
  }
  return outputArray;
};

exports.showAll = function(req, res){
//todo: how to return whole collection?
  //code to get all records from collection
  // Site.find(function(err, doc) {
  //   if (err)
  //     return res.send(404);
  //   res.json(doc);
  // });
};

exports.detail = function(req, res){

  var id = req.param('id');
  if (! id)
    return res.send(404);
  Site.findById(id, function(err, doc) {
    if (err)
      return res.send(404);
    res.json(doc);
  });
};

exports.addSite = function(req, res) {
  
  var site = req.body;
  console.log('Adding site: ' + JSON.stringify(site));
  db.collection('sites', function(err, collection) {
    collection.insert(site, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        console.log('Success: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateSite = function(req, res){
  var id = req.params.id;
  var site = req.body;
  console.log('Updating site: ' + id);
  console.log(JSON.stringify(site));
  db.collection('sites', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, site, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error updating site: ' + err);
        res.send({'error':'An error has occurred'});
      } else {
        console.log('' + result + ' document(s) updated');
        res.send(site);
      }
    });
  });
    
}

 
exports.deleteSite = function(req, res) {
    var id = req.params.id;
    console.log('Deleting site: ' + id);
    db.collection('sites', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}