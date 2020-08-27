var pokemonRepository = (function () {
var pokemonList = [];
	
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	function showDetails(pokemon) {
	  	loadDetails(pokemon).then(function () {
	    console.log(pokemon);
		  });
		}


	function listener (button, pokemon) {
		button.addEventListener('click', function () {
			showDetails(pokemon);
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

	function showLoadingMessage() {
          console.log("Booting up the Pokedex");
	}

	function hideLoadingMessage() {
		console.clear();
	}

	function loadList() {
		showLoadingMessage()
	    return fetch(apiUrl).then(function (response) {
	    	hideLoadingMessage()
	      return response.json();
	    }).then(function (json) {
	      json.results.forEach(function (item) {
	        var pokemon = {
	          name: item.name,
	          detailsUrl: item.url
	        };
	        add(pokemon);
	      });
	    }).catch(function () {
	    	hideLoadingMessage()
	      console.error("error");
	    })
	  }
	function loadDetails(item) {
		showLoadingMessage()
	    var url = item.detailsUrl;
	    return fetch(url).then(function (response) {
	      hideLoadingMessage()
	      return response.json();
	    }).then(function (details) {
	      // Now we add the details to the item
	      item.imageUrl = details.sprites.front_default;
	      item.height = details.height;
	      item.types = details.types;
	    }).catch(function (e) {
	      hideLoadingMessage()
	      console.error(e);
	    });
	  }
	  return {
	    add: add,
	    getAll: getAll,
	    loadList: loadList,
	    loadDetails: loadDetails,
	    addListItem: addListItem
	  };
})()

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
	