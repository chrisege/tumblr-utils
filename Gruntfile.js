module.exports = function(grunt) {
	// load all grunt tasks matching the `grunt-*` pattern
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			all: ['Gruntfile.js', 'app.js']
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js'
				}
			}
		},
		watch: {
			mainApp: {
				files: ['app.js'],
				tasks: ['jshint']
            } 
		},
		concurrent: {
			dev: {
				options: {
					logConcurrentOutput: true
				},
				tasks: ['watch', 'nodemon:dev']
			}
		},
	});

	grunt.registerTask('default', []);
	grunt.registerTask('dev', ['concurrent:dev']);
};