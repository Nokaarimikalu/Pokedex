function templatePokemonOverlay(pokemon) {
    return /*html*/ `
            <div class="pokemon type-${pokemon.types[0].type.name}" onclick="showPokemonDetails(${pokemon.id - 1})">
                <div class="pokeImage"><img src="${pokemon.sprites.front_default}" alt="" /></div>
                <div class="pokeName">
                    <h2>#${pokemon.id}</h2>
                    <h1>${pokemon.name}</h1> 
                    <div class="typen" id="element-${pokemon.id}">
                    </div>
                </div>
            </div>
    `;
}

function templatePopUp(currentPokemon, index) {
    return /*html*/ `
            <div id="popUpPokemon" onclick="closePopUp()">
                <div class="popUpInfoPokemon " onclick="event.stopPropagation()">
                    <div class="popUpImage">
                        <div class="imageOfPokemonPopUp type-${currentPokemon.types[0].type.name}">
                            <img src="${currentPokemon.sprites.front_default}" alt="" />
                                <h2 class="idOfPokemonPopUp">#${currentPokemon.id}</h2>
                                <h1 class="nameOfPokemonPopUp">${currentPokemon.name}</h1>
                        </div>
                        <div class="pokemonInfoPopUp">
                            <div class="elemente"></div>
                            <div class="ability">
                            </div>
                            <div id="pkmStats" class="statsOfthePokemon">
                            </div>
                            <div class="buttonsForPopUp ">
                                <button class="type-${currentPokemon.types[0].type.name}" onclick="prevPokemon(${index})"><</button>
                                <button class="type-${currentPokemon.types[0].type.name}" onclick="nextPokemon(${index})">></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
}

// currentPokemon.sprites.other["official-artwork"].front_default
