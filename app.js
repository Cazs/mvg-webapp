var express = require('express');
var bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/frontend'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req, res)
{
  
});

app.listen(8080);
console.log('Server running on port 8080....');
