function templatePokemonOverlay(pokemon) {
    return /*html*/ `
            <div class="pokemon">
                <div class="pokeImage"><img src="${pokemon.sprites.front_default}" alt="" /></div>
                <div class="pokeName">
                    <h2>#${pokemon.id}</h2>
                    <h1>${pokemon.name}</h1>
                </div>
            </div>
    `;
}
