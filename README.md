# tslint-path-formatter

[![Build Status](https://secure.travis-ci.org/Bartvds/tslint-path-formatter.png?branch=master)](http://travis-ci.org/Bartvds/tslint-path-formatter) [![Dependency Status](https://gemnasium.com/Bartvds/tslint-path-formatter.png)](https://gemnasium.com/Bartvds/tslint-path-formatter) [![NPM version](https://badge.fury.io/js/tslint-path-formatter.png)](http://badge.fury.io/js/tslint-path-formatter)

> TSLint formatter that displays absolute error path with row/column on one line.

A console formatter similar to the default output except the report displays absolute file paths with the row/column appended in a parsable format. The TypeScript equivalent of [jshint-path-reporter](https://github.com/Bartvds/jshint-path-reporter).

This allows convenient use of [TSLint](https://github.com/palantir/tslint) from within tools that apply a filter RegExp to console views to turn error lines into clickable links to instantly navigate to the error location.

### WebStorm

This reporter is tested and actively used in WebStorm with [grunt-tslint](https://github.com/palantir/grunt-tslint). For maximum effect have a output filter configured in its [edit-tool-dialog](https://www.jetbrains.com/webstorm/webhelp/edit-tool-dialog.html) of the tool you run, something like:

````
$FILE_PATH$[ \t]*[:;,\[\(\{<]$LINE$(?:[:;,\.]$COLUMN$)?.*
````

## Usage

Install from NPM
````
 $ npm install tslint-path-formatter
````

Then pass name of the module (or anything acceptable to `require.resolve()`) as the reporter option.

### grunt-tslint

````js
grunt.initConfig({
	//..
	tslint: {
		options: {
			configuration: grunt.file.readJSON("tslint.json"),
			formatter: 'tslint-path-formatter'
		}),
		source: {
			//..
		}
	}
});
````

## Options

### Globally disable ANSI colouring

For low-tech displays and pure text.
````js
require('tslint-path-formatter').color(false);
````

## Example output

> Looks very similar to [jshint-path-reporter](https://github.com/Bartvds/jshint-path-reporter):
>  
> WebStorm (with link filter and darcula theme):
> ![webstorm darcula](https://raw.github.com/Bartvds/jshint-path-reporter/master/media/example_output_webstorm.png)

## History

* 0.1.1 - Add support for rule names in output
* 0.1.0 - First release mutated from [jshint-path-reporter](https://github.com/Bartvds/jshint-path-reporter) & [eslint-path-formatter](https://github.com/Bartvds/eslint-path-formatter).

## Build

Install development dependencies in your git checkout:
````
$ npm install
````

You need the global [grunt](http://gruntjs.com) command:
````
$ npm install grunt-cli -g
````

Build and run tests:
````
$ grunt
````

See the `Gruntfile` for additional commands.

## License

Copyright (c) 2013 Bart van der Schoor

Licensed under the MIT license.




[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/Bartvds/tslint-path-formatter/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

