var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hellosam:test@ds139425.mlab.com:39425/knouwiki');

//Create a schema - this is like a blueprint
var wikidataSchema = new mongoose.Schema({
  // writerIP: String,
  title: String,
  item: String
});

var wikidata = mongoose.model('wikidata', wikidataSchema);

var urlendodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
  
  app.get('/', function(request, response) {
  response.render('pages/index');
  });

  app.post('/result', function(req, res){
    //get data from mongodb and pass it to the view
    res.render('pages/result');
    wikidata.find({title: 'title'}, function(err, data){
      if (err) throw err;
      res.render('pages/result', {todos: data});
    });

  });

  app.get('/editer', function(req, res){
    res.render('pages/editer');
  });

  app.get('/', function(req, res){
    res.render('pages/index');
  });

  app.post('/editer', urlendodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = wikidata(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
      console.log('saved');
    });
  });

}
