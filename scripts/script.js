let allPokemonData = [];

async function init() {
    await getData();
    allDataForTemplate();
}

async function getData() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20`;
    let response = await fetch(url);
    let currentRequest = await response.json();
    for (let i = 0; i < currentRequest.results.length; i++) {
        let p = currentRequest.results[i];
        let res = await fetch(p.url);
        let dataOfPokemon = await res.json();
        allPokemonData.push(dataOfPokemon);
    }
}

function allDataForTemplate() {
    let mainArea = document.querySelector(`.test`);
    for (let i = 0; i < allPokemonData.length; i++) {
        const element = allPokemonData[i];
        mainArea.innerHTML += templatePokemonOverlay(element);
    }
}

console.log(allPokemonData);
