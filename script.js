async function getPokemon() {
  const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Pokémon not found');
      }
      const data = await response.json();

      document.getElementById('pokemonName').textContent = capitalize(data.name);
      document.getElementById('pokemonImage').src = data.sprites.front_default;
      document.getElementById('pokemonType').textContent = data.types.map(type => capitalize(type.type.name)).join(', ');
      document.getElementById('pokemonHeight').textContent = data.height;
      document.getElementById('pokemonWeight').textContent = data.weight;

      document.getElementById('pokemonInfo').classList.remove('hidden');
      document.getElementById('error').classList.add('hidden');
  } catch (error) {
      document.getElementById('pokemonInfo').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
  }
}

async function searchPokemon() {
  const name = document.getElementById('searchInput').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      const speciesResponse = await fetch(speciesUrl);
      const speciesData = await speciesResponse.json();
      const isLegendary = speciesData.is_legendary;

      displayPokemon(data, isLegendary);
  } catch (error) {
      console.error(error);
      document.getElementById('error').classList.remove('hidden');
  }
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getPokemon() {
  const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Pokémon not found');
      }
      const data = await response.json();

      document.getElementById('pokemonName').textContent = capitalize(data.name);
      document.getElementById('pokemonImage').src = data.sprites.front_default;
      document.getElementById('pokemonType').textContent = data.types.map(type => capitalize(type.type.name)).join(', ');
      document.getElementById('pokemonHeight').textContent = data.height;
      document.getElementById('pokemonWeight').textContent = data.weight;

      const card = document.getElementById('pokemonInfo');
      card.classList.remove('hidden');
      
      // Reset animation
      card.classList.remove('show');
      void card.offsetWidth; // trigger reflow
      card.classList.add('show');

      document.getElementById('error').classList.add('hidden');
  } catch (error) {
      document.getElementById('pokemonInfo').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
  }
}

async function getPokemon() {
  const pokemonName = document.getElementById('pokemonInput').value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Pokémon not found');
      }
      const data = await response.json();
      displayPokemon(data);
  } catch (error) {
      document.getElementById('pokemonInfo').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
  }
}

async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1; // 1 to 898
  const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      displayPokemon(data);
  } catch (error) {
      document.getElementById('pokemonInfo').classList.add('hidden');
      document.getElementById('error').classList.remove('hidden');
  }
}

function resetSearch() {
  document.getElementById('pokemonInput').value = "";
  document.getElementById('pokemonInfo').classList.add('hidden');
  document.getElementById('error').classList.add('hidden');
}

function displayPokemon(data, isLegendary) {
  document.getElementById('pokemonName').textContent = capitalize(data.name);
  document.getElementById('pokemonImage').src = data.sprites.front_default;
  document.getElementById('pokemonType').textContent = data.types.map(type => capitalize(type.type.name)).join(', ');
  document.getElementById('pokemonHeight').textContent = data.height;
  document.getElementById('pokemonWeight').textContent = data.weight;

  const stats = data.stats.reduce((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat;
      return acc;
  }, {});

  setStat('pokemonHP', stats.hp);
  setStat('pokemonAttack', stats.attack);
  setStat('pokemonDefense', stats.defense);
  setStat('pokemonSpeed', stats.speed);
  setStat('pokemonSpecialAttack', stats['special-attack']);
  setStat('pokemonSpecialDefense', stats['special-defense']);

  const card = document.getElementById('pokemonInfo');
  card.classList.remove('hidden');

  // Add or remove legendary class
  if (isLegendary) {
      card.classList.add('legendary');
  } else {
      card.classList.remove('legendary');
  }

  card.classList.remove('show');
  void card.offsetWidth;
  card.classList.add('show');

  document.getElementById('error').classList.add('hidden');
}

function setStat(elementId, value) {
  const element = document.getElementById(elementId);

  // Reset width and colors
  element.style.width = '0%';
  element.classList.remove('low', 'medium', 'high', 'very-high');

  // Set color based on value
  if (value < 50) {
      element.classList.add('low');
  } else if (value < 80) {
      element.classList.add('medium');
  } else if (value < 110) {
      element.classList.add('high');
  } else {
      element.classList.add('very-high');
  }

  // Animate width based on stat value
  const percent = Math.min((value / 150) * 100, 100); // assuming 150 is the max stat value
  setTimeout(() => {
      element.style.width = percent + '%';
  }, 100); // slight delay to trigger the transition
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toggleDarkMode() {
  const body = document.body;
  const container = document.querySelector('.container');
  const buttons = document.querySelectorAll('button');
  
  // Toggle Dark Mode class on body and container
  body.classList.toggle('dark-mode');
  container.classList.toggle('dark-mode');

  // Change button styles for dark mode
  buttons.forEach(button => {
      button.classList.toggle('dark-mode');
  });
}

function createSparkles(num) {
  const sparklesContainer = document.getElementById('sparkles');
  for (let i = 0; i < num; i++) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');
      sparkle.style.left = Math.random() * 100 + 'vw';
      sparkle.style.top = Math.random() * 100 + 'vh';
      sparkle.style.animationDuration = (5 + Math.random() * 5) + 's, 2s';
      sparkle.style.opacity = Math.random();
      sparklesContainer.appendChild(sparkle);
  }
}

createSparkles(10); // You can change the number of sparkles ✨

let pokemonLoaded = false; // Track whether the Pokémon list is loaded

document.getElementById('loadPokemonList').addEventListener('click', function() {
    const pokemonListContainer = document.getElementById('pokemonListContainer');

    if (pokemonListContainer.style.display === 'block') {
        // If the list is visible, hide it
        pokemonListContainer.style.display = 'none';
        this.textContent = 'Load Pokémon List'; // Change button text back
    } else {
        // If the list is hidden, show it
        if (!pokemonLoaded) {
            // Fetch the Pokémon list only once
            fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
                .then(response => response.json())
                .then(data => {
                    const pokemonList = data.results;
                    const pokemonListContainer = document.getElementById('pokemonList');

                    // Clear any existing list
                    pokemonListContainer.innerHTML = '';

                    // Add each Pokémon to the list
                    pokemonList.forEach(pokemon => {
                        const listItem = document.createElement('li');
                        listItem.textContent = pokemon.name;
                        pokemonListContainer.appendChild(listItem);
                    });

                    // Mark the list as loaded
                    pokemonLoaded = true;
                })
                .catch(error => console.error('Error fetching Pokémon list:', error));
        }

        // Show the list and change button text
        pokemonListContainer.style.display = 'block';
        this.textContent = 'Unload Pokémon List'; // Change button text to 'Unload Pokémon List'
    }
});



