const url = 'https://swapi.dev/api/';

async function fetchJson(url) {
  const response = await fetch(url);
  return await response.json();
}

async function fetchResources(resources) {
  const promises = resources.map(resource => fetchJson(resource));
  return await Promise.all(promises);
}

async function fetchCharacters() {
  let charURL = url + 'people/';
  let characters = [];

  while (charURL) {
    const data = await fetchJson(charURL);
    characters = characters.concat(data.results);
    charURL = data.next;
  }

  const homeworlds = await fetchResources(characters.map(character => character.homeworld));
  characters.forEach((character, index) => {
    character.homeworldName = homeworlds[index].name;
  });

  const films = await fetchResources(characters.map(character => character.films).flat());
  characters.forEach((character, index) => {
    character.filmNames = character.films.map(film => films.find(f => f.url === film).title).join(', ');
  });

  const species = await fetchResources(characters.map(character => character.species).flat());
  characters.forEach((character, index) => {
    character.speciesNames = character.species.length > 0 ? species.find(s => s.url === character.species[0]).name : '';
  });

  const vehicles = await fetchResources(characters.map(character => character.vehicles).flat());
  characters.forEach((character, index) => {
    character.vehicleNames = character.vehicles.length > 0 ? vehicles.find(v => v.url === character.vehicles[0]).name : '';
  });

  const starships = await fetchResources(characters.map(character => character.starships).flat());
  characters.forEach((character, index) => {
    character.starshipNames = character.starships.length > 0 ? starships.find(s => s.url === character.starships[0]).name : '';
  });

  return characters;
}

alert("The table will load soon.");

fetchCharacters().then(characters => {
  const table = document.getElementById('characterTable');
  characters.forEach(character => {
    if (character.name) {
      const row = table.insertRow();
      row.insertCell().innerHTML = character.name;
      row.insertCell().innerHTML = character.birth_year;
      row.insertCell().innerHTML = character.eye_color;
      row.insertCell().innerHTML = character.gender;
      row.insertCell().innerHTML = character.hair_color;
      row.insertCell().innerHTML = character.height;
      row.insertCell().innerHTML = character.mass;
      row.insertCell().innerHTML = character.skin_color;
      row.insertCell().innerHTML = character.homeworldName;
      row.insertCell().innerHTML = character.filmNames;
      row.insertCell().innerHTML = character.speciesNames;
      row.insertCell().innerHTML = character.vehicleNames;
      row.insertCell().innerHTML = character.starshipNames;
    }
  });
});
