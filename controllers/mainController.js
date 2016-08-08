var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hellosam:test@ds139425.mlab.com:39425/knouwiki');

//Create a schema - this is like a blueprint
var wikidataSchema = new mongoose.Schema({
  // writerIP: String,
  title: String,
  item: String,
  date: String
});

var wikidata = mongoose.model('wikidata', wikidataSchema);

var urlendodedParser = bodyParser.urlencoded({extended: false});

var title;
module.exports = function(app){

  // app.get('/result', function(req, res){
  //   //get data from mongodb and pass it to the view
  //   wikidata.find({title: 'title'}, function(err, data){
  //     if (err) throw err;
  //     res.render('pages/result', {todos: data});
  //   });
  // });

  app.post('/result', urlendodedParser, function(req, res){
    title = req.body.inputTitle;
    console.log(title);
    //get data from mongodb and pass it to the view
    wikidata.find({title: title}, function(err, data){
      if (data=='') {
        res.render('pages/editer', {title: title, content: '결과가 없습니다! 새로운 문서를 작성 해 주세요 :)'});
      } else if (err) {
        throw err;
      } else {
        console.log(data);
        res.render('pages/result', {title:title, todos: data});
      }
    });
  });

  app.get('/result/:title', function(req, res){
    title = req.params.title;
    console.log(title);
    //get data from mongodb and pass it to the view
    wikidata.find({title: title}, function(err, data){
      if (err) throw err;
        console.log(data);
        res.render('pages/result', {title: title, todos: data});
      });
    });

  app.get('/editer', function(req, res){
    res.render('pages/editer');
  });

  app.get('/', function(req, res){
    res.render('pages/index');
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
  });

  app.post('/editer', urlendodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = wikidata(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
      console.log('saved');
    });
    // wikidata.find({title: title}, function(err, data){
    //   console.log(title);
    //   if (err) throw err;
    //     console.log(data);

    //     res.render('pages/result', {todos: data});
      // });
  });
}
