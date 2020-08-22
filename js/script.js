var pokemonRepository = (function () {
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
	function showDetails (pokemon) {
		console.log(pokemon);
	};

	function listener (button, pokemon) {
		button.addEventListener('click', function (pokemon) {
			showDetails(pokemon.target);
		});
	}

	function addListItem(pokemon) {
		var poke = document.querySelector('.pokemon-list');
		var listItem = document.createElement(("li"));
		var button = document.createElement('button');
		button.innerText = pokemon.name;
		listener(button, pokemon);
		listItem.appendChild(button);
		poke.appendChild(listItem);
	};

	function getAll() {
			return pokemonList;
		};

	function add(pokemon) {
			pokemonList.push(pokemon);	
		};
	return {
		addListItem: addListItem,
		add: add,
		getAll: getAll
	};
})()
// the parameter pokemon is pokemonList. follow it through each function
pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon)	
})
	