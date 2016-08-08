var express = require('express');
var mainController = require('./controllers/mainController');
var app = express();

app.set('port', (process.env.PORT || 5000));

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

mainController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


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
