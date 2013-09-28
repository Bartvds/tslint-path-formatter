module.exports = function (grunt) {
	'use strict';

	var path = require('path');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-tslint');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			//merge reporter into jshint
			options: grunt.util._.defaults(grunt.file.readJSON('.jshintrc'), {
				reporter: './node_modules/jshint-path-reporter'
			}),
			all: [
				'Gruntfile.js',
				'index.js',
				'test/**/*.js'
			]
		},
		tslint: {
			options: {
				configuration: grunt.file.readJSON(".tslintrc"),
				formatter: path.resolve('./index')
			},
			files: {
				src: ['test/fixtures/files/failureA.test.ts', 'test/fixtures/files/failureB.test.ts']
			}
		}
	});
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'tslint']);

};