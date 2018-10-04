module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),

      //Define Path
      dirs: {
          inputSCSS             : 'development/sass',
          inputJS               : 'development/js',
          inputHTMLELements     : 'development/html-elements',
          outputCSS             : 'production/css',
          outputJS              : 'production/js'
      },

      // Plugin 01: CSSmin
      cssmin: {
        options: {
        },
        target: {
          files: {
          }
        }
      },

      // Plugin 02: Uglify
      uglify: {
        options: {
          beautify: false,
          compress: {
            drop_console: false
          }
        },
        my_target: {
          files: {
          }
        }
      },

    // Plugin 02: Uglify : minify lai cac tap tin JS
    uglify: {
      my_target: {
        files: {
          'dest/output.min.js': ['src/input1.js', 'src/input2.js']
        }
      }
    },

    // Plugin 03: Sass : dịch tập tin trong folder inputSCC sang outputSCSS
    sass: {                           
      dist: {                           
        options: {                       
          style: 'expanded'
        },
        files: {                         
          src: '<%= dirs.inputSCSS %>/main.scss',
          dest:'<%= dirs.outputSCSS %>/main.css',
        }
      }
    },
    
    // Plugin 04: Watch: quan sat sự thay đổi hay không, xem nếu filters thay đổi thì biên dịch lại sass, va thay đổi includes
      watch: {
        scripts: {
          files: [
            '<%= dirs.inputSCSS %>/*.scss',       //development/sass/*.sass
            // '<%= dirs.inputSCSS %>/*/*.scss',     //development/sass/*/*.sass
            // 'development/index.html',
            // '<%= dirs.inputHTMLELements %>/*.html',
            // '<%= dirs.inputHTMLELements %>/*/*.html',
          ],
          tasks: ['sass','includes'],
          options: {
            spawn: false,
            livereload: true
          },
        },
      },

    // Plugin 05: Connect
      connect: {
        server: {
          options: {
            hostname: 'localhost',
            port: 1111,
            base: 'production/',
            liverelaod: true
          }
        }
      },

    // Plugin 06: Includes : quan sát tập tin html nào 
      includes: {
        files: {
          src: [
            'development/index.html'
          ], // Source files
          dest: 'production/', // hiển thị kết quả ở folder này
          flatten: true,
          cwd: '.',
          options: {
            silent: true,
            banner: ''
          }
        }
      }
    });
    
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-includes');

    //03 Register tesk
    grunt.registerTask('default', 'Log some stuff.', function() {
      grunt.log.write('Logging some stuff... ').ok();
    })
    // Task Developer 
    grunt.registerTask('dev', [
      'includes', // include các file html được tách ra
      'sass',     // biên dịch các tập tin sass
      'connect',  // nó chạy webserver ảo
      'watch',    // quan sat sự thay đổi cac tập tin
    ]);
  
    // Task Publish Project 
    grunt.registerTask('publish', [
      'cssmin',
      'uglify',
    ]);
  };