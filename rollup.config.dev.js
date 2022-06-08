import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import template from 'rollup-plugin-generate-html-template'

export default {
    // input:'./src/main.js',//入口文件
    input:'./TestPage/test.js',//入口文件
    output:{
      file:'./out/test.js',//打包后的存放文件
      // file:'./out/treeLayout.js',//打包后的存放文件
      format:'cjs',//输出格式 amd es6 iife umd cjs
      name:'bundleName',//如果iife,umd需要指定一个全局变量
      sourcemap: true
    },
    plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**'
        }),
        serve({
          open: true,
          contentBase: 'out'
        }),
        livereload(),
        template({
          template: './TestPage/index.html',
          target: './out/index.html',
          })
    ],
    external: []
}
  