//import { resolve } from "url";

/*
var arr = [1, 2, 3];
var arrfunc = function(ar) {
  var newarr = [];
  ar.forEach(num => {
    newarr.push((num += 1));
  });
  return newarr;
};
var newarray = arrfunc(arr);
console.log(newarray);
//console.log(newarray);
*/

// Example for using await promise with async function.
function promiseFunc(arr) {
  return new Promise(resolve => {
    arr.push(4);
    resolve(arr);
  });
}

async function func(arr) {
  var arr2 = await promiseFunc(arr);
  console.log(arr2);
}

func([1, 2, 3]);

/* Example when trying this without await.
function promiseFunc(arr) {
  setTimeout(function() {
    arr.push(4);
    return arr;
  }, 2000);
}

function func(arr) {
  var arr2 = promiseFunc(arr);
  console.log(arr2);
}

func([1, 2, 3]);
*/
