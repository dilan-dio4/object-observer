﻿var fs = require('fs');

module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			options: {
				configFile: 'eslint.json'
			},
			src: ['Gruntfile.js', 'src/**/*.js']
		},
		uglify: {
			build: {
				files: {
					'dist/object-observer.min.js': ['dist/object-observer.js']
				}
			}
		}
	});

	grunt.loadNpmTasks("gruntify-eslint");
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('test', ['eslint']);

	grunt.registerTask('build', 'Customized build', function () {
		grunt.log.writeln('Copy to "bin"');
		fs.writeFileSync('dist/object-observer.js', fs.readFileSync('src/object-observer.js'));
		grunt.log.ok();

		grunt.task.run('uglify:build');
	});

	grunt.registerTask('full-ci', 'Full CI Build cycle', function () {
		grunt.task.run('build');
		grunt.task.run('test');
	});
};