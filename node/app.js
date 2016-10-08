var request = require('request');
var express = require('express');
var clarifai = require('clarifai');
var bodyParser = require('body-parser');
var app = express();

var bearerToken = 'aMT15PHFJh44y6OB2lu4JrpNdKzfVp';
var url = 'https://api.clarifai.com/v1/tag?';

app.get('/match', function (req, result) {
   var imageURL = req.url.substring(7);
   console.log('looking for ', imageURL);
   request.get(
   { 
	   url : url + 'url=' + imageURL

   }, function(err, res){
	

      var tags = res.body;
      var matches = JSON.parse(tags).results[0].result.tag;
      var classes = matches.classes;
      var probs = matches.probs;
      console.log(classes);
      result.end(JSON.stringify(classes));

   }).auth(null, null, true, bearerToken);

})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
