var path = require('path');

var options = {style: 'ansi'};
// copied colors from color.js
var colorWrap = {
	//grayscale
	'white': ['\033[37m', '\033[39m'],
	'grey': ['\033[90m', '\033[39m'],
	'black': ['\033[30m', '\033[39m'],
	//colors
	'blue': ['\033[34m', '\033[39m'],
	'cyan': ['\033[36m', '\033[39m'],
	'green': ['\033[32m', '\033[39m'],
	'magenta': ['\033[35m', '\033[39m'],
	'red': ['\033[31m', '\033[39m'],
	'yellow': ['\033[33m', '\033[39m']
};
var wrapStyle = function (str, color) {
	str = '' + str;
	if (options.style === 'ansi' && colorWrap.hasOwnProperty(color)) {
		var arr = colorWrap[color];
		return arr[0] + str + arr[1];
	}
	return str;
};
/*jshint -W098 */
var warn = function (str) {
	return wrapStyle(str, 'yellow');
};
var fail = function (str) {
	return wrapStyle(str, 'red');
};
var ok = function (str) {
	return wrapStyle(str, 'green');
};
var accent = function (str) {
	return wrapStyle(str, 'bold');
};
var writeln = function (str) {
	if (arguments.length === 0) {
		str = '';
	}
	console.log(str);
};
var hasProp = Object.prototype.hasOwnProperty;

function repeat(len, str) {
	var ret = '';
	while (ret.length < len) {
		ret += str;
	}
	return ret;
}

function PathFormatter() {

}
PathFormatter.prototype = Object.create({
	name: 'tslint-path-formatter',
	getName: function () {
		return this.name;
	},
	format: function (failures) {
		var output = "";

		var files = {};
		var data = [];

		var codeMaxLen = 0;

		failures.forEach(function (failure) {
			var fileName = failure.getFileName();
			var res;
			if (hasProp.call(files, fileName)) {
				res = files[fileName];
			}
			else {
				files[fileName] = res = {
					file: failure.getFileName(),
					errors: []
				};
				data.push(res);
			}
			var lineAndCharacter = failure.getStartPosition().getLineAndCharacter();
			var item = {
				reason: failure.getFailure(),
				line: lineAndCharacter.line() + 1,
				character: lineAndCharacter.character() + 1,
				code: (failure.getRuleName ? failure.getRuleName() : '')
			};
			res.errors.push(item);
			codeMaxLen = item.code ? Math.max(item.code.length, codeMaxLen) : codeMaxLen;
		});

		var fileCount = data.length;
		var errorCount = 0;
		var i = 0;

		data.forEach(function (res) {
			i++;
			var errors = res.errors;
			var file;
			if (res.file) {
				file = path.resolve(res.file);
			}
			if (!file) {
				file = '<unknown file>';
			}
			var head = 'File \'' + res.file + '\'';
			if (!errors || errors.length === 0) {
				//writeln(ok('>> ') + head + ' ' + ok('OK') + (i === fileCount ? '\n' : ''));
			} else {
				writeln(fail('>> ') + head);// + ' ' + fail(errors.length + ' error' + (errors.length == 1 ? '' : 's')));
				errorCount += errors.length;
				errors.sort(function (a, b) {
					if (a && !b) {
						return -1;
					}
					else if (!a && b) {
						return 1;
					}
					if (a.line < b.line) {
						return -1;
					}
					else if (a.line > b.line) {
						return 1;
					}
					if (a.character < b.character) {
						return -1;
					}
					else if (a.character > b.character) {
						return 1;
					}
					return 0;
				});

				errors.forEach(function (err) {
					var str = '';
					if (!err) {
						return;
					}
					var e;
					// '(error)'
					if (err.id) {
						e = err.id.match(/[\w ]+/);
						if (e) {
							e = e[0];
						}
					}
					if (!e) {
						e = 'error';
					}

					str += fail(e.toUpperCase()) + ' at ' + file + '(' + err.line + ',' + err.character + '):';

					str += '\n';
					if (err.code) {
						str += warn('[' + err.code + ']') + repeat(codeMaxLen + 1 - err.code.length, ' ');
					}

					str += warn(err.reason ? err.reason : '<undefined reason>');
					if (typeof err.evidence !== 'undefined') {
						str += '\n' + err.evidence;
					}
					writeln(str);
				});
				writeln('');
			}
		});
		var report = 'TSLint found ';
		var fileReport = fileCount + ' file' + (fileCount === 1 ? '' : 's');
		if (fileCount === 0) {
			fileReport = warn(fileReport);
		}
		if (errorCount === 0) {
			//writeln(report + ok('no errors')); // + ' in ' + fileReport);
		}
		else {
			writeln(report + fail(errorCount + ' error' + ((errorCount === 1) ? '' : 's')) + '\n'); // + ' in ' + fileReport + '\n');
		}

		return output;
	}
});
module.exports = {
	Formatter: PathFormatter,
	options: options,
	color: function (enable) {
		options.style = enable ? 'ansi' : false;
	}
};
