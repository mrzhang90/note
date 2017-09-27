module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\nconsole.log("Hello Grunt");\n'
            },
            build: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.uglify.js'
            }
        },
        concat: {
            bar: {
                src: 'src/*.js',
                dest: 'build/<%= pkg.name %>.concat.js',
            },
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify','concat']);

};