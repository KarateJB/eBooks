# What is Gulp

The streaming build system with 

* Automation - gulp is a toolkit that helps you automate painful or time-consuming tasks in your development workflow.

* Platform-agnostic - Integrations are built into all major IDEs and people are using gulp with PHP, .NET, Node.js, Java, and other platforms.

* Strong Ecosystem - Use npm modules to do anything you want + over 2000 curated plugins for streaming file transformations

* Simple - By providing only a minimal API surface, gulp is easy to learn and simple to use




# Sample 

### Install local packages

```
$ npm install gulp --save-dev
$ npm install gulp-concat --save-dev
$ npm install gulp-uglify --save-dev
$ npm install gulp-rename --save-dev
```

### Create gulp file

```
$ copy nul gulpfile.js
```


### Simple tasks sample

[gulpfile.js](https://gist.github.com/KarateJB/a1bdc68f282c2765d54d8b3b7819ad40.js)

```
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


var root = {
    // webroot: "./scripts/",
    nmSrc: "./node_modules/",
    nmDest: "Src/lib-npm/"
}

// Copy from node_modules
gulp.task('copy-jquery', function () {
    return gulp.src(root.nmSrc + "/jquery/dist/**/jquery.*")
               .pipe(gulp.dest(root.nmDest + '/jquery/'));
});


// Uglify JS Files
gulp.task('js-uglify', function() {
   return gulp.src('Src/app.js')
       .pipe(concat('app.js'))
       .pipe(rename({ suffix: '.min' }))
       .pipe(uglify())
       .pipe(gulp.dest('Src/build'));
});

//Watch
gulp.task('watch', function() {
   gulp.watch('Src/app.js', ['js-uglify']);
});


// Default Task
gulp.task('default', ['js-uglify','copy-jquery', 'watch']);
```


