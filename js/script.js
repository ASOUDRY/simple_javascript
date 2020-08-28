var pokemonRepository = (function () {
var pokemonList = [];
	
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// Modular Code Starts here
      function showModal(pokemage, pokename, pokeheight) {
	  var modalContainer = document.querySelector('#modal-container');

	  modalContainer.innerHTML = '';

	  var modal = document.createElement('div');
  	  modal.classList.add('modal');

  	  var closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      // Create the three Elements
      var img = document.createElement('img');
      img.src = pokemage;

	  var name = document.createElement('h1');
  	   name.innerText = pokename;

	  var height = document.createElement('p');
	  height.innerText = pokeheight;
      // actually attaching the code to a button
      modal.appendChild(img);
      modal.appendChild(closeButtonElement);
	  modal.appendChild(name);
  	  modal.appendChild(height);
      modalContainer.appendChild(modal);

	  modalContainer.classList.add('is-visible');
	}

	function hideModal() {
    var modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
    }
    // e key is escape key
	window.addEventListener('keydown', (e) => {
	  var modalContainer = document.querySelector('#modal-container');
	  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
	    hideModal();  
	  }
      modalContainer.addEventListener('click', (e) => {
		  // Since this is also triggered when clicking INSIDE the modal
		  // We only want to close if the user clicks directly on the overlay
		  var target = e.target;
		  if (target === modalContainer) {
		    hideModal();
		  }
		});
	});

	// Modular Code Ends Here

	function showDetails(pokemon) {
	  	loadDetails(pokemon).then(function () {
	  	showModal(pokemon.imageUrl, pokemon.name, pokemon.height)
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
    // clears the console
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
	  // The properties the repository can return
	  return {
	    add: add,
	    getAll: getAll,
	    loadList: loadList,
	    loadDetails: loadDetails,
	    addListItem: addListItem
	  };
})()

pokemonRepository.loadList().then(function() {
  // Follow the Pokemon List all the way through the variables
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});