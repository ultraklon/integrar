
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , macheador = require('./NodeCSV');

var app = express();
var webdir = './';
// all environments
app.set('domain', '192.168.1.49');
app.set('port', process.env.PORT || 3000);


app.set('view options', { layout:false });
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router	);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.static('/home/myName/allMyMedia/'));
//app.use(express.directory(path.join(__dirname, 'public/img/')));

//app.use("/public/img", 	express.static(__dirname+"/public/img"));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res) {
	res.render(__dirname +  '/views/index.ejs')
});

app.get('/api/discapacitados/', function(req, res) {
	macheador.MachearCSV("educacion-2011-discapacidad.csv", function ( jeison ){ //req.params.fileName
			res.send(jeison);
	});
});
app.get('/api/tramites/', function(req, res) {
	macheador.MachearCSV("tramites.csv", function ( jeison ){ //req.params.fileName
			res.send(jeison);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
