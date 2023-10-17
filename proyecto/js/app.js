"use strict";

// con document.addEventListener() esperamos a que se cargue todo el html y luego el js
document.addEventListener('DOMContentLoaded',()=>{
  mostrarCard()
})

function randomPokemon(){
  return Math.floor(Math.random() * (150 - 1) + 1);
}

// consumir la API de Pokemon
const fetchData= async()=>{
  const pokeNum=randomPokemon()
  try {
    const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
    // con axios no ocupamos transformar la api call a json, solo con fetch
    const data = await res.json()
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
}

const mostrarCard=async()=>{
const pokeData= await fetchData()
const pokeValues={
  image: pokeData.sprites.other.dream_world.front_default,
  name: pokeData.species.name,
  hp:pokeData.stats[0].base_stat,
  exp:pokeData.base_experience,
  abilitie:pokeData.abilities[0].ability.name,
  types:pokeData.types[0].type.name,
  version:pokeData.game_indices[0].version.name
}
console.log(pokeValues);
const flex= document.querySelector('.flex') // donde va el template
const template=document.getElementById('template-card').content // capturar template
const cloneTemplate=template.cloneNode(true) // clon del template para no modificar el original
const fragment = document.createDocumentFragment() // crea un  farmento en el DOM, en lugar de usar innerHtml, tambien sirve para loops
//modificar la imagen del pokemon
cloneTemplate.querySelector('.card-body-img').setAttribute('src',pokeValues.image) // usaria querySelectorAll si se repitiera la clase
cloneTemplate.querySelector('.card-body-title').innerHTML=`${pokeValues.name} <span>${pokeValues.hp} hp</span>` 
cloneTemplate.querySelector('.card-body-text').innerHTML=`${pokeValues.exp} Exp`
cloneTemplate.querySelectorAll('.card-footer-social h3')[0].textContent=`${pokeValues.types}`
cloneTemplate.querySelectorAll('.card-footer-social h3')[1].textContent=`${pokeValues.abilitie}`
cloneTemplate.querySelectorAll('.card-footer-social h3')[2].textContent=`${pokeValues.version}`
// pasar clon al fragment
fragment.appendChild(cloneTemplate)
// ahora nuestro framgment lo pasamos al flex
flex.appendChild(fragment)
}