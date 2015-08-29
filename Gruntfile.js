module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                spawn: false
            },
            scripts: {
                files: [
                    '/js/*.js',
                    '/js/Cloth/*.js'
                ],
                tasks: ['uglify:gui']
            },
            styles: {
                files: ['/less/*.less'],
                tasks: ['less']
            }

        },
        uglify: {
            options: {
                beautify: true
            },
            gui: {
                files: {
                    'frontend/static/frontend/generated/js/project_gui.min.js': [
                        '/js/*.js',
                        '/js/Cloth/*.js'
                    ]
                }
            },
            libs: {
                files: {
                    'frontend/static/frontend/generated/js/project_libs.min.js': [
                        'node_modules/jquery/dist/jquery.min.js'
                    ]
                }
            }
        },
        less: {
            options: {
                beautify: true,
                plugins: [
                    new (require('less-plugin-autoprefix'))({
                        browsers: ["last 2 versions"]
                    }),
                    new (require('less-plugin-clean-css'))
                ]
            },
            target: {
                files: {
                    'frontend/static/frontend/generated/css/project_gui.min.css': [
                        '/less/*.less'
                    ]
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};