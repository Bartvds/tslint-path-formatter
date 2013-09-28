module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-tslint');
	grunt.loadNpmTasks('grunt-run-grunt');
	grunt.loadNpmTasks('grunt-mocha-test');

	var path = require('path');

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
		run_grunt: {
			test: {
				options: {
					log: false,
					expectFail: true,
					'no-color': true,
					logFile: './tmp/output.txt',
					process: function (res) {
						var p = path.resolve('./test/fixtures/files/') + path.sep;
						//why does .replace() only work once? weird
						var actual = res.res.stdout.split(p).join('{{full}}');
						grunt.file.write('./tmp/output-fixed.txt', actual);
					}
				},
				src: ['test/Gruntfile.js']
			}
		},
		tslint: {
			demo: {
				options: {
					configuration: grunt.file.readJSON('.tslintrc'),
					formatter: path.resolve('./index')
				},
				src: ['./test/fixtures/files/**/*.ts']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'Spec'
				},
				src: ['./test/*.test.js']
			}
		}
	});
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['jshint', 'run_grunt:test', 'mochaTest:test']);
	grunt.registerTask('dev', ['jshint', 'tslint:demo']);

};