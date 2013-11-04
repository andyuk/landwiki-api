var express = require('express'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose');
  config = require('./config.json'),
  sites = require('./routes/sites');

var MONGO_URI = (process.env.MONGOHQ_URL || config.mongo.uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 4000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', sites.index);
app.get('/v1/sites/:id', sites.detail);
//app.get('/land/add', sites.add);

mongoose.connect(MONGO_URI, function(err) {
  if (err) throw err;
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
