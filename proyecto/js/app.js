"use strict";

// con document.addEventListener() esperamos a que se cargue todo el html y luego el js
document.addEventListener('DOMContentLoaded',()=>{
  const pokeNum=randomPokemon()
  fetchData(pokeNum)
})

function randomPokemon(){
  return Math.floor(Math.random() * (150 - 1) + 1);
}

// consumir la API de Pokemon
const fetchData= async(pokeNum)=>{
  try {
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    // con axios no ocupamos transformar la api call a json, solo con fetch
    const data = await res.json()
    mostrarCard(data)
  } catch (error) {
    console.log(error);
  }
}

const mostrarCard=(pokemon)=>{
const flex= document.querySelector('.flex') // donde va el template
const template=document.getElementById('template-card').content // capturar template
const cloneTemplate=template.cloneNode(true) // clon del template para no modificar el original
const fragment = document.createDocumentFragment() // crea un  farmento en el DOM, en lugar de usar innerHtml, tambien sirve para loops
//modificar la imagen del pokemon
cloneTemplate.querySelector('.card-body-img').setAttribute('src',pokemon.sprites.other.dream_world.front_default) // usaria querySelectorAll si se repitiera la clase
// pasar clon al fragment
fragment.appendChild(cloneTemplate)
// ahora nuestro framgment lo pasamos al flex
flex.appendChild(fragment)
}