let allPokemonData = [];
let offset = 20;

async function init() {
    await getData();
    allDataForTemplate();
}

async function getData() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=${offset}`;
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
        const index = i;
        mainArea.innerHTML += templatePokemonOverlay(element, index);
    }
}

console.log(allPokemonData);

function showPokemonDetails(i) {
    document.getElementById("popUpPokemon").classList.remove("d_hidden");
    console.log(`${i}`);
}

function closePopUp() {
    document.getElementById("popUpPokemon").classList.add("d_hidden");
}
