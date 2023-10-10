'use strict';

// Nuestro código tiene una pequeña falla, el día sólo tiene 24 horas y no se está tomando en cuenta el caso en el que time sea una hora inválida.
// Utilizando lo visto hasta el momento sobre operadores lógicos y condicionales, debes crear un nuevo mensaje que será usado cuando time sea una hora que no existe en el día.

var time = 13;
var greeting;

if (time >= 0 && time < 12) {
  greeting = 'Good morning';
} else if (time > 12 && time < 20) {
  greeting = 'Good afternoon';
} else if (time >= 20 && time <= 24) {
  greeting = 'Good evening';
} else if (time > 24 || time <= 0) {
  greeting = 'Wrong Time';
}

console.log(greeting); // Good afternoon

// 0 a 100 imprimir solo numeros pares
for (let i = 0; i <= 100; i++) {
  i % 2 === 0 ? console.log('PAR: ' + i) : null;
}

// Comprobamos si el número es divisible por algún número menor que él mismo
let primo;
for (let j = 2; j < 100; j++) {
  numerosPrimos(j);
  if (primo == true) {
    console.log(`${j} es numero primo`);
  }
}
function numerosPrimos(numero) {
  for (var i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return (primo = false);
    }
  }
  return (primo = true);
}
