/*jshint node:true*/
module.exports = function (grunt) {
	var path = require('path');

  // Load the Intern task
  grunt.loadNpmTasks('intern');

  // Configure tasks
  grunt.initConfig({
    intern: {
      dist: {
        options: {
          runType: 'client',
          config: 'tests/intern',
          reporters: [ 'Console' ]
        }
      }
    }
  });


  // Register a test task that uses Intern
  grunt.registerTask('test', [ 'intern' ]);

  // By default we just test
  grunt.registerTask('default', [ 'test' ]);
};