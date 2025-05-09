let allPokemonData = [];

async function init() {
    await getData();
    allDataForTemplate();
}

console.log(allPokemonData);

async function getData() {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=40&offset=${allPokemonData.length}`;
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

function showPokemonDetails(indexOfPokemon) {
    let pokemon = allPokemonData[indexOfPokemon];
    let popUpArea = document.querySelector(`#popUpSection`);
    popUpArea.innerHTML = "";
    popUpArea.innerHTML = templatePopUp(pokemon, indexOfPokemon);
    pokemonStats(pokemon);
    pokemonAbility(pokemon);
    pokemonType(pokemon);
}

function closePopUp() {
    document.getElementById("popUpPokemon").classList.add("d_hidden");
}

function pokemonStats(pokemon) {
    let pokemonStats = document.querySelector(`#pkmStats`);
    for (let i = 0; i < pokemon.stats.length; i++) {
        const attribute = pokemon.stats[i];
        pokemonStats.innerHTML += /*html*/ `
            <h2><b>${attribute.stat.name.charAt(0).toUpperCase() + attribute.stat.name.slice(1)}:</b>${attribute.base_stat}</h2>
        `;
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
    let newIndex = currentIndex + 1;
    if (newIndex < allPokemonData.length) {
        showPokemonDetails(newIndex);
    }
}

function prevPokemon(currentIndex) {
    let newIndex = currentIndex - 1;
    if (newIndex >= 0) {
        showPokemonDetails(newIndex);
    }
}

async function loadMorePokemon(button) {
    const text = button.querySelector(".btn-text");
    const loading = button.querySelector(".pokeball-loader");
    text.textContent = "Loading...";
    loading.style.display = "inline-block";
    button.disabled = true;
    const oldLength = allPokemonData.length;
    try {
        await getData();
        let m = document.querySelector(".test");
        for (let i = oldLength; i < allPokemonData.length; i++) m.innerHTML += templatePokemonOverlay(allPokemonData[i]);
    } catch (error) {
        console.error("Fehler:", error);
    }
    text.textContent = "Next";
    loading.style.display = "none";
    button.disabled = false;
}

function searchPokemon(info) {
    let mainArea = document.querySelector(`.test`);
    mainArea.innerHTML = "";
    if (info.length === 0) {
        allDataForTemplate();
    } else if (info.length < 3) {
        return;
    } else {
        const filteredPokemon = allPokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(info.toLowerCase()));

        filteredPokemon.forEach((pokemon) => {
            mainArea.innerHTML += templatePokemonOverlay(pokemon);
        });
    }
}
