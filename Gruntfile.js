module.exports = function(grunt) {
  var concatConfig = {
    options: {
      separator: ';',
    },
    dist: {
      src: [
        './src/vendor/jquery/dist/jquery.js',
        './src/vendor/underscore/underscore.js',
        './src/vendor/bootstrap/dist/js/bootstrap.js',
        './src/vendor/angular/angular.js',
        './src/vendor/firebase/firebase.js',
        './src/vendor/firebase-simple-login/firebase-simple-login.js',
        './src/vendor/angular-route/angular-route.js',
        './src/vendor/angular-bootstrap/ui-bootstrap.js',
        './src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
        './src/vendor/angularfire/angularfire.js',
        './src/app/main.js',
        './src/app/controllers/index.js',
        './src/app/controllers/modal.js'
      ],
      dest: './app/javascripts/app.js'
    }
  };

  var uglifyConfig = {
    dist: {
      files: {
        './app/javascripts/app.min.js': './app/javascripts/app.js'
      }
    }
  };

  var watchConfig = {
    scripts: {
      files: ['Gruntfile.js', './src/app/**/*.js', './src/app/**/*.less'],
      tasks: [
        // 'jshint:all',
        'concat:dist',
        'uglify:dist',
        'less:dist',
        'cssmin:dist'
      ],
      options: {
        livereload: true
      }
    },
    html: {
      files: ['./index.html'],
      tasks: [],
      options: {
        livereload: true
      }
    }
  };

  var connectConfig = {
    server: {
      options: {
        port: 3000,
        base: './',
        useAvailablePort: true
      }
    }
  };

  var jshintConfig = {
    all: ['./Gruntfile.js', './src/app/**/*.js']
  };

  var lessConfig = {
    dist: {
      files: {
        './app/css/styles.css': './src/app/css/main.less'
      }
    }
  };

  var cssminConfig = {
    dist: {
      files: {
        './app/css/styles.min.css': ['./app/css/styles.css']
      }
    }
  };

  grunt.initConfig({
    concat: concatConfig,
    uglify: uglifyConfig,
    watch: watchConfig,
    connect: connectConfig,
    jshint: jshintConfig,
    less: lessConfig,
    cssmin: cssminConfig
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.task.registerTask('start', [//'jshint:all',
                                    'concat:dist',
                                    'uglify:dist',
                                    'less:dist',
                                    'cssmin:dist',
                                    'connect:server',
                                    'watch']);
																		
	grunt.task.registerTask('build', ['concat:dist',
                                    'uglify:dist',
                                    'less:dist',
                                    'cssmin:dist']);
};
