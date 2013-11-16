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

app.get('/v1/sites', sites.showAll);
app.get('/v1/sites/:id', sites.detail);
app.post('/v1/sites', sites.addSite);
app.put('/v1/sites/:id', sites.updateSite);
app.delete('/v1/sites/:id', sites.deleteSite);

mongoose.connect(MONGO_URI, function(err) {
  if (err) throw err;
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
