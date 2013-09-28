# Tumblr Tools
## For node.js
Doesn't do anything yet.

The goal is to provide an interface for quickly queueing/posting a bunch of results from a google image (or flickr) search. Plus some other things.

Dependencies:
* Node.js (and npm)
* Bower
* Grunt (and grunt-cli)
* MongoDB

To start:
* `npm install`
* `bower install` (there isn't any frontend stuff yet)
* make sure mongodb is installed and running
* rename `config.example.js` to `config.js` and fill in the appropriate api keys
* `grunt dev` or `node app` to init