var express = require('express'),
    sys = require('sys'),
    oauth = require('oauth'),
    tumblr = require('./tumblr-keys.js');

var app = express();

var consumer = function() {
	return new oauth.OAuth(
    	"https://tumblr.com/oauth/request_token", "http://www.tumblr.com/oauth/access_token", 
    	tumblr.key, tumblr.secret, "1.0A", "http://127.0.0.1:3000/sessions/callback/", "HMAC-SHA1"
    );   
};

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger());
  app.use(express.cookieParser('hello'));
  app.use(express.session());
  app.use(function(req, res, next){
  	res.locals.session = req.session;
  	next();
  });
});

app.get('/', function(req, res){
  var body = 'Hello World'+tumblr.key;
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.get('/sessions/connect', function(req, res){
  consumer().getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
    if (error) {
      res.send("Error getting OAuth request token : " + sys.inspect(error), 500);
    } else {  
      req.session.oauthRequestToken = oauthToken;
      req.session.oauthRequestTokenSecret = oauthTokenSecret;
      res.redirect("http://www.tumblr.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
    }
  });
});

app.get('/sessions/callback', function(req, res){
  sys.puts(">>"+req.session.oauthRequestToken);
  sys.puts(">>"+req.session.oauthRequestTokenSecret);
  sys.puts(">>"+req.query.oauth_verifier);
  consumer().getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
    if (error) {
      res.send("Error getting OAuth access token : " + sys.inspect(error) + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+sys.inspect(results)+"]", 500);
    } else {
      req.session.oauthAccessToken = oauthAccessToken;
      req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
      // Right here is where we would write out some nice user stuff
      consumer.get("http://api.tumblr.com/v2/user/info", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          res.send("Error getting tumblr data : " + sys.inspect(error), 500);
        } else {
          req.session.tumblrname = data.name;    
          res.send('You are signed in: ' + req.session.tumblrname)
        }  
      });  
    }
  });
});

app.listen(3000);
console.log('Listening on port 3000');
