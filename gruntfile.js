module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    targetDir: './js/lib',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true
                }
            }
        },

        autoprefixer: {
            /*options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },*/
            files: {
                src: 'css/*.css'
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'nested',
                    cacheLocation : '.sass-cache',
                    sourcemap: "none"
                },
                files: {'css/styles.css': 'sass/*.scss'}
            }
        },

        jade: {  
            dev: {  
                options:{  
                    pretty: true,  
                    /*data: function(){
                        return {developing: "true"};
                    }*/
                },  
                files: [{ // /jade > /html
                    expand: true, 
                    src: "*.jade", 
                    dest: "html/", 
                    ext: ".html", 
                    cwd: "jade/"
                }]
            } 
        },

        watch: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            jade: {
                files: ["**/*.jade"],
                tasks: ["jade"]
            }
        },

        connect: {
            all: {
                options:{
                    port: 9000,
                    hostname: "0.0.0.0",
                    middleware: function(connect, options) {
                        return [
                            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                            connect.static(options.base)
                        ];
                    }
                }
            }
            /*server: {
                options: {
                    port: 9000,
                    livereload: true,
                    base: '.'
                }
            }*/
        },
        open: {
            all: {
                path: 'http://localhost:9000/html/ree.html'
            }
        },
        regarde: {
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'autoprefixer']
            },
            jade: {
                files: ["**/*.jade"],
                tasks: ["jade"]
            },
            all: {
                files:['**/*.html','**/*.css'],
                tasks: ['livereload']
            }
        }
    });

    //Cargar todas las tareas de grunt
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
    //Tareas
    //Sin reload
    grunt.registerTask("dev", function (target) {
        grunt.task.run([
            "jade",
            "sass",
            "autoprefixer",
            "watch"
        ]);
    });
    grunt.registerTask('bow', ['bower']);
    //Con reaload
    grunt.registerTask('server',['livereload-start','connect','open','jade','sass','autoprefixer','regarde']);
    //grunt.registerTask('co',['jade', 'sass', 'connect', 'open', 'watch']);

};