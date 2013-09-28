module.exports = function (grunt) {
	'use strict';

	var path = require('path');

	grunt.loadTasks('../node_modules/grunt-tslint/tasks');

	grunt.initConfig({
		tslint: {
			options: {
				configuration: grunt.file.readJSON('../.tslintrc'),
				formatter: path.resolve('./../index')
			},
			files: {
				src: ['fixtures/files/failureA.test.ts', 'fixtures/files/failureB.test.ts']
			}
		}
	});
	grunt.registerTask('default', ['test']);
	grunt.registerTask('test', ['tslint']);

};