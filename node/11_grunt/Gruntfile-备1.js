//参考：http://blog.csdn.net/mazhimazh/article/details/42456329
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            //第一种方案-手动指定，不智能
            static_mappings: {
                //由于这里的src-dest文件映射时手动指定的, 每一次新的文件添加或者删除文件时，Gruntfile都需要更新  
                files: [
                    { src: 'lib/a.js', dest: 'build/a.min.js' },//可以指定单个文件
                    { src: 'lib/b.js', dest: 'build/b.min.js' },
                ]
            },
            //第二种方案-自动匹配指定，智能化方案
            dynamic_mappings: {
                //当'minify'任务运行时Grunt将自动在"lib/"下搜索"**/*.js", 然后构建适当的src-dest文件映射，因此你不需要在文件添加或者移除时更新Gruntfile  
                files: [{
                    // 当你希望处理大量的单个文件时，这里有一些附加的属性可以用来动态的构建一个文件. 这些属性都可以指定在Compact和Files Array映射格式中(这两种格式都可以使用)。  
                    expand: true, // 设置true用于启用下面的选项  
                    cwd: 'lib/', //匹配相对lib目录的src来源  相对于当前路径所匹配的所有src路径(但不包括当前路径。)  
                    src: '**/*.js', //实际的匹配模式 相对于cwd路径的匹配模式  
                    dest: 'build/', //目标路径前缀 flatten 从生成的dest路径中移除所有的路径部分。  
                    ext: '.min.js' // 使用这个属性值替换生成的dest路径中所有实际存在文件的扩展名(比如我们通常将压缩后的文件命名为.min.js)  
                    //rename 对每个匹配的src文件调用这个函数(在执行ext和flatten之后)。 传递dest和匹配的src路径给它， 这个函数应该返回一个新的dest值。 如果相同的dest返回不止一次， 每个使用它的src来源都将被添加到一个数组中。
                }]
            }
        },
        concat: {
            bar: {
                src: ['src/*.js'],
                dest: 'build/all.min.js',
            },
        }
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);

};