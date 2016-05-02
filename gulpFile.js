var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');
var zip = require('gulp-zip');
var forceDeploy = require('gulp-jsforce-deploy');


// transpiling to javascript
gulp.task('build',function(){
    return webpack(require('./webpack.config.js'))
        .pipe(gulp.dest('build'));

});


//get rid of all comments and space
gulp.task('uglify',['build'],function(){
    return gulp.src('build/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('minbuild'))
});


//zip it
gulp.task('zip',function(){

    return gulp.src('minbuild/*.**')
        .pipe(zip('angular2.resource'))
        .pipe(gulp.dest('pkg/staticresources/'))
})


//deploy it
gulp.task('deploy',function(){
    return gulp.src('./pkg/**', { base: "." })
        .pipe(zip('pkg.zip'))
        .pipe(forceDeploy({
            username:'',
            password:'',
            loginUrl:'',
            version:'36.0'
        }))
})


//orchestration  did not really use it but for this blog post.
//gulp.task('default',['build','uglify']);