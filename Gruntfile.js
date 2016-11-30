/*jshint node:true*/
module.exports = function (grunt) {
	var path = require('path');

  // Load all the tasks
  grunt.loadNpmTasks('intern');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Configure tasks
  grunt.initConfig({
    intern: {
      dev: {
        options: {
          runType: 'client',
          config: 'tests/intern',
          reporters: [ 'Console' ]
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', './*.js', 'widgets/**/*.js'],
      options: {
        jshintrc: './.jshintrc'
      }
    }
  });


  // Register tasks
  grunt.registerTask('test', [ 'jshint', 'intern' ]);
  grunt.registerTask('default', [ 'test' ]);
};