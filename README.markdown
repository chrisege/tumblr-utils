# Tumblr Tools
## For node.js
Doesn't do anything yet.

put your tumblr api keys in a ./tumblr-keys.js file like so:

`
var	tumblr = {
	key: 'redacted',
	secret: 'redacted'
};
module.exports = tumblr;
`
Dependencies:
* Node.js (and npm)
* Bower
* Grunt (and grunt-cli)
* MongoDB

To start:
* `npm install`
* `bower install` (there isn't any frontend stuff yet)
* make sure mongodb is installed and running
* `grunt dev` or `node app` to init