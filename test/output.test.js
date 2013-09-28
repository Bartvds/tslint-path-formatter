describe('tslint-path-formatter', function() {

	var grunt = require('grunt');
	var assert = require('assert');

	it('should format correctly', function(){
		var actual = grunt.file.read('./tmp/output-fixed.txt').replace(/\r?\n/g, '\n');
		var expected = grunt.file.read('./test/fixtures/files/output.txt').replace(/\r?\n/g, '\n');

		assert.equal(actual, expected);
	});
});
