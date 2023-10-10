'use strict';
// declaracion
var numero;
console.log(numero); //prints undefined
// asignacion
numero = 12;
console.log(numero); //prints 12

let nombre = 'Abraham'; // "let" does not allow us to redeclare variable
nombre = 'Jesus'; // let si se puede re declarar
const apellido = 'Delgado'; // const no se puede redeclarar

var a = 5;
var b = 10;
var c = 15;

(((3 + b) * c) / a) * 2; // 78✅

((a + b * c) / 5) * 2; // 62✅

b / a + 2 * c; // 32✅

(a + b + c / c) * a; // 80✅

(3 * a) / c + a + b + c; // 31✅

a - ((b + c) * a) / 1; // -120✅
