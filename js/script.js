var pokemonRepository = (function () {
	// variable begins
var pokemonList = [
		{
			dexNumber: "#" + 037,
			name: "Ninetales",
			types: ["fire", "monotype"],
			height: 1.1,
			catchRate: 75,
			homeRegion: "Kanto"
		},
		{
			dexNumber: "#" + 066,
			name: "Machop",
			types: ["fighting", "monotype"],
			height: 0.8,
			catchRate: 180,
			homeRegion: "Kanto"
		},
		{
			dexNumber: "#" + 386,
			name: "Deoxys",
			type: ["psychic", "monotype"],
			height: 1.7,
			catchRate: 3,
			homeRegion: "Hoenn"
		}
	];
	// variable ends
	function getAll() {
			return pokemonList;
		}

	function add(pokemon) {
			pokemonList.push(pokemon);	
		}
	return {
		add: add,
		getAll: getAll
	};
})()

pokemonRepository.getAll().forEach(function(pokemon) {
	document.write(pokemon.name + "'s" + " " + "is" + " " + pokemon.height + "m" + "<br>")
	if (pokemon.height == 1.7) {
		document.write( "<br>" + "<br>" + "Watching the movie you'd think this pokemon was a lot taller than it is according to the Pokedex.")
		}
})
	