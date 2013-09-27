module.exports = function(grunt) {
	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	grunt.initConfig();
	
	grunt.registerTask('default', []);
	grunt.registerTask('dev', ['build:debug', 'concurrent:dev']);
};