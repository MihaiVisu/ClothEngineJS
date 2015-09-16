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
                    'js/*.js',
                    'js/ClothEngine/*.js'
                ],
                tasks: ['uglify:gui']
            },
            styles: {
                files: ['less/*.less'],
                tasks: ['less']
            }
        },
        uglify: {
            options: {
                beautify: true
            },
            gui: {
                files: {
                    'generated/js/project_gui.min.js': [
                        'js/ClothEngine/cloth.js',
                    ]
                }
            },
            libs: {
                files: {
                    'generated/js/project_libs.min.js': [
                        'node_modules/jquery/dist/jquery.min.js'
                    ]
                }
            }
        },
        less: {
            options: {
                beautify: false,
                plugins: [
                    new (require('less-plugin-autoprefix'))({
                        browsers: ["last 2 versions"]
                    }),
                    new (require('less-plugin-clean-css'))
                ]
            },
            target: {
                files: {
                    'generated/css/project_gui.min.css': [
                        'less/*.less'
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
