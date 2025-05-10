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
                <div class="popUpInfoPokemon" onclick="event.stopPropagation()">
                    <div class="popUpImage">
                        <div class="elemente">
                        </div>
                        <img src="${currentPokemon.sprites.front_default}" alt="" />
                        <div class="ability">
                        </div>
                        <div class="buttonsForPopUp">
                            <button onclick="prevPokemon(${index})">< Previous</button>
                            <button onclick="nextPokemon(${index})">Next ></button>
                        </div>
                    </div>
                    <div id="pkmStats" class="statsOfthePokemon">
                    </div>
                </div>
            </div>
    `;
}
