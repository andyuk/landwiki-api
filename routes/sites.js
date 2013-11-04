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