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
                beautify: false
            },
            gui: {
                files: {
                    'generated/js/project_gui.min.js':[
                        'js/ClothEngine/cloth.js',
                    ]
                }
            },
            libs: {
                files: {
                    'generated/js/project_libs.min.js': [
                        'node_modules/jquery/dist/jquery.min.js',
                        'node_modules/bootstrap/dist/js/bootstrap.min.js'
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
                    new (require('less-plugin-clean-css'))()
                ]
            },
            gui: {
                files: {
                    'generated/css/project_gui.min.css': [
                        'less/*.less'
                    ]
                }
            },
            libs: {
                files: {
                    'generated/css/project_libs.min.css': [
                        'node_modules/bootstrap/less/bootstrap.less'
                    ]
                }
            }
        },
        imagemin: {
            fonts: {
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }]
                },
                files: {
                    'generated/fonts/glyphicons-halflings-regular.eot': 'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
                    'generated/fonts/glyphicons-halflings-regular.svg': 'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
                    'generated/fonts/glyphicons-halflings-regular.ttf': 'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
                    'generated/fonts/glyphicons-halflings-regular.woff': 'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
                    'generated/fonts/glyphicons-halflings-regular.woff2': 'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};
