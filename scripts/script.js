let allPokemonData = [];
const maxStats = {
    hp: 255,
    attack: 190,
    defense: 230,
    "special-attack": 194,
    "special-defense": 230,
    speed: 180,
};

async function init() {
    await getData();
    allDataForTemplate();
}

async function getData() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${allPokemonData.length}`;
    const response = await fetch(url);
    const currentRequest = await response.json();
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
        const container = document.getElementById(`element-${element.id}`);
        for (let j = 0; j < element.types.length; j++) {
            const type = element.types[j].type.name;
            const types = type.charAt(0).toUpperCase() + type.slice(1);
            container.innerHTML += `<div class="typeForAll type-${type}">${types}</div>`;
        }
    }
}

function showPokemonDetails(indexOfPokemon) {
    let pokemon = allPokemonData[indexOfPokemon];
    let popUpArea = document.querySelector(`#popUpSection`);
    document.body.classList.add("no-scroll");
    popUpArea.innerHTML = "";
    popUpArea.innerHTML = templatePopUp(pokemon, indexOfPokemon);
    let type = pokemon.types[0].type.name;
    pokemonStats(pokemon, type);
    pokemonAbility(pokemon);
    pokemonType(pokemon);
}

function closePopUp() {
    document.getElementById("popUpPokemon").classList.add("d_hidden");
    document.body.classList.remove("no-scroll");
}

function pokemonStats(pokemon, type) {
    let pokemonStats = document.querySelector(`#pkmStats`);
    stats(pokemon, type, pokemonStats);
}

function stats(pokemon, type, pokemonStats) {
    for (let i = 0; i < pokemon.stats.length; i++) {
        const attribute = pokemon.stats[i];
        const statName = attribute.stat.name;
        const baseStat = attribute.base_stat;
        const percent = (baseStat / maxStats[statName]) * 100;
        pokemonStats.innerHTML += /*html*/ `
            <div class="pokemonStats">
                <h2><b>${attribute.stat.name.charAt(0).toUpperCase() + attribute.stat.name.slice(1)}:</b>${attribute.base_stat}</h2>
                <div class="statBar">
                    <div class="statBarStats type-${type}"style="width: ${percent}%"></div>
                </div>
            </div>`;
    }
}

function pokemonAbility(pokemon) {
    let pokemonAbility = document.querySelector(`.ability`);
    for (let i = 0; i < pokemon.abilities.length; i++) {
        const ability = pokemon.abilities[i];
        const name = ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
        if (ability.is_hidden) {
            pokemonAbility.innerHTML += `<p><b>Hidden Ability:</b> ${name}</p>`;
        } else {
            pokemonAbility.innerHTML += `<p><b>Ability:</b> ${name}</p>`;
        }
    }
}

function pokemonType(pokemon) {
    let pokemonType = document.querySelector(`.elemente`);
    for (let i = 0; i < pokemon.types.length; i++) {
        const types = pokemon.types[i];
        const type = types.type.name.charAt(0).toUpperCase() + types.type.name.slice(1);
        pokemonType.innerHTML += /*html*/ `
            <div class="type type-${types.type.name}">${type}</div>
        `;
    }
}

function nextPokemon(currentIndex) {
    if (currentIndex + 1 < allPokemonData.length) {
        showPokemonDetails(currentIndex + 1);
    }
}

function prevPokemon(currentIndex) {
    if (currentIndex - 1 >= 0) {
        showPokemonDetails(currentIndex - 1);
    }
}

function renderPokemonTypesForOverlay(pokemon) {
    const container = document.getElementById(`element-${pokemon.id}`);
    for (let j = 0; j < pokemon.types.length; j++) {
        const type = pokemon.types[j].type.name;
        const types = type.charAt(0).toUpperCase() + type.slice(1);
        container.innerHTML += `<div class="typeForAll type-${type}">${types}</div>`;
    }
}

async function loadMorePokemon(button) {
    const loading = button.querySelector(".pokeball-loader");
    loading.style.display = "inline-block";
    button.disabled = true;
    const oldLength = allPokemonData.length;
    await getData();
    let mainArea = document.querySelector(".test");
    for (let i = oldLength; i < allPokemonData.length; i++) {
        mainArea.innerHTML += templatePokemonOverlay(allPokemonData[i]);
        renderPokemonTypesForOverlay(allPokemonData[i]);
    }
    loading.style.display = "none";
    button.disabled = false;
}

function searchPokemon(info) {
    let mainArea = document.querySelector(`.test`);
    const loadButton = document.querySelector(".loadingPokemon");
    mainArea.innerHTML = "";
    searchForPokemon(info, loadButton, mainArea);
}

function searchForPokemon(info, loadButton, mainArea) {
    if (info.length === 0) {
        allDataForTemplate();
        loadButton.style.display = "block";
    } else if (info.length < 3) {
        loadButton.style.display = "none";
        return;
    } else {
        const filteredPokemon = allPokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(info.toLowerCase()));
        filteredPokemon.forEach((pokemon) => {
            mainArea.innerHTML += templatePokemonOverlay(pokemon);
            renderPokemonTypesForOverlay(pokemon);
        });
        loadButton.style.display = "none";
    }
}
