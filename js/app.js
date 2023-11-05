"use strict";

// con document.addEventListener() esperamos a que se cargue todo el html y luego el js
document.addEventListener('DOMContentLoaded', function(){
  mostrarCard()
  })

  // clase pokemones 
  class pokeHelpers {
    constructor(pokemonSearchedName) {
      this.pokemonSearchedName = pokemonSearchedName;
    }
    newSearchedPokemon() {
      this.pokemonSearchedName && mostrarCard(this.pokemonSearchedName);
    }
    // funcion que se acciona si presionamos enter y envia el nombre del pokemon a la mostrarCard()
    searchPressingEnter() {
      var input = document.getElementById('pokemonName');
      input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // cancelamos cualquier accion por default
          const pokeHelpersOne = new pokeHelpers(input.value);
          pokeHelpersOne.newSearchedPokemon(); // buscar [pokemon con clase]
        }
      });
    }
  }
  
  // creamor una nueva funcionp rototype de la clase
  pokeHelpers.prototype.randomPoke=function(){
    return Math.floor(Math.random() * (400 - 1) + 1);
  }
  


// funcion que se activa al presionar el botton "search"
function searchedPokemon(pokemonSearchedName) {
  const pokeSearch = new pokeHelpers(pokemonSearchedName)
  pokeSearch.newSearchedPokemon()
}

// consumimos la API de Pokemon
// con axios no ocupamos transformar la api call a json, solo con fetch
const fetchData = async (pokemonSearchedName) => {
  const myRandomPokemon = new pokeHelpers()
  let pokeValue = pokemonSearchedName
    ? pokemonSearchedName.toLowerCase()
    : myRandomPokemon.randomPoke();
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeValue}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    alert("Sorry, that Pokemon hasn't been catched yet! 😮");
    document.getElementById('pokemonName').value = '' // limiamos el input
  }
};


// funcion para mapear los 3 specs en la base the la poke card y evitar repetir codigo
function mapSpecs(pokeValues,cloneTemplate) {
  const pokemonClonObject=Object.assign({}, pokeValues) // clonamos el objecto original 
  const pokemonSpecs=Object.keys(pokemonClonObject).slice(4) //obtenemos las keys de solo los ultimos keys
  pokemonSpecs.map((spec)=>{
        cloneTemplate.querySelectorAll('.card-footer-specs h3')[pokemonSpecs.indexOf(spec)].textContent = `${pokemonClonObject[spec]}`;
     })
}


const mostrarCard=async(pokemonSearchedName)=>{
  // script to check if the user searched the pokemon by pressing enter
  const pokeData= await fetchData(pokemonSearchedName)
  const pokeValues={
    image: pokeData.sprites.other.dream_world.front_default,
    name: pokeData.species.name,
    hp:pokeData.stats[0].base_stat,
    exp:pokeData.base_experience,
    types:pokeData.types[0].type.name,
    abilities:pokeData.abilities[0].ability.name,
    version:pokeData.game_indices[0].version.name
  }
  // console.log(pokemonClonObject[pokemonSpecs[1]]);
  const flex= document.querySelector('.flex') // donde va el template
  const template=document.getElementById('template-card').content // capturar template
  const cloneTemplate=template.cloneNode(true) // clon del template para no modificar el original
  const fragment = document.createDocumentFragment() // crea un  farmento en el DOM, en lugar de usar innerHtml, tambien sirve para loops
  
flex.setHTML('') // limpiamos el html  y prcedemos a renderear todos los elementos
cloneTemplate.querySelector('.card-body-img').setAttribute('src',pokeValues.image) // usaria querySelectorAll si se repitiera la clase
cloneTemplate.querySelector('.card-body-title').innerHTML=`${pokeValues.name} <span>${pokeValues.hp} hp</span>` 
cloneTemplate.querySelector('.card-body-text').innerHTML=`${pokeValues.exp} Exp`
mapSpecs(pokeValues,cloneTemplate)  // enviamos la data y el clon del template para mapear los valores necesarios
fragment.appendChild(cloneTemplate)// pasar clon al fragment
flex.appendChild(fragment)  // ahora nuestro framgment lo pasamos al flex
const searchByEnterKey = new pokeHelpers()
searchByEnterKey.searchPressingEnter() // verificar sei se buscó algun pokemon presionando enter.
}