var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://hellosam:test@ds029745.mlab.com:29745/todo');

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlendodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/result', function(req, res){
  //get data from mongodb and pass it to the view
  Todo.find({}, function(err, data){
    if (err) throw err;
    res.render('result', {todos: data});
  });

});

app.post('/edit', urlendodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    if(err) throw err;
    res.json(data);
  });
});
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.get('/edit', function(req, res){
//   res.render('pages/edit');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });
