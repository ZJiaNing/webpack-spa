// function greeting (){
//   let str = "<h1>Hello, World!</h1>";
//   document.write(str);
// }
import '../css/index.css'

var greeting = function () {
  let str = "<h1>Hi, you guys</h1>";
  document.write(str);
}

export default greeting

/*
* CAUTION:
* 如果不export出去的话，会有一个警告如下：
* Critical dependencies warning
* critical dependency: the request of a dependency is an expression
* http://webpack.github.io/docs/context.html#critical-dependencies
*/
