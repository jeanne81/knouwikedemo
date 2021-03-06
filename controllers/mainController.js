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
  createdTime: String,
  editedTime: String,
  displayTime: String,

  timeOrderBy: Number
});

var wikidata = mongoose.model('wikidata', wikidataSchema);

var urlendodedParser = bodyParser.urlencoded({extended: false});

var title;

module.exports = function(app){

  app.get('/result/:title', function(req, res){
    title = req.params.title;
    //get data from mongodb and pass it to the view
    wikidata.find({title: title}, function(err, data){
      if (err) throw err;
        res.render('pages/result', {title: title, todos: data});
      });
    });

  // app.get('/', function(req, res){
  //   wikidata.find({}, function(err, data){
  //     if(err) throw err;
  //     res.render('pages/index', {todos: data});
  //   }).sort({date:1});
  app.get('/', function(req, res){
    wikidata.find({}).sort({timeOrderBy: -1}).exec(function(err, data){
      if(err) throw err;
      res.render('pages/index', {todos: data});
    });
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
  });

  app.post('/edit_document', urlendodedParser, function(req, res){
    title = req.body.editdoctitle;
    item = req.body.item;

    wikidata.find({title: title}, function(err, data){
      if (err) throw err;
      res.render('pages/edit_document', {title: title, todos: data, content: '문서를 편집 해 주세요'});
      });
  });

  app.post('/edit_confirm', urlendodedParser, function(req, res){
    title = req.body.title;
    item = req.body.item;
    console.log(title);
    console.log(item);
    wikidata.find({title: title}).remove().exec(function(err, data){
      if(err) throw err;
      console.log('deleted');
      var newTodo = wikidata(req.body).save(function(err,data){
        if(err) throw err;
        res.json(data);
        console.log('saved');
      });
    });
  });


  app.post('/result', urlendodedParser, function(req, res){
    title = req.body.inputTitle;
    //get data from mongodb and pass it to the view
    wikidata.find({title: title}, function(err, data){
      if (data=='') {
        res.render('pages/editer', {title: title, todos: data, content: '결과가 없습니다! 새로운 문서를 작성 해 주세요'});
      } else if (err) {
        throw err;
      } else {
        res.render('pages/result', {title:title, todos: data});
      }
    });
  });
}
