let url = 'https://swapi.dev/api/';
async function fetchStarWarsCharacters() {
  let charURL = url + 'people/'
  let characters = [];

  while (charURL) {
    const response = await fetch(charURL);
    const data = await response.json();

    characters = characters.concat(data.results);
    charURL = data.next;
  }

  return characters;
}

async function fetchStarWarsPlanet(planetUrl) {
  const response = await fetch(planetUrl);
  const data = await response.json();
  planet = data.results
  return planet.name;
}

fetchStarWarsCharacters().then(characters => {
  var table = document.getElementById("characterTable");
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].name !== undefined) {
      var row = table.insertRow();
      row.insertCell().innerHTML = characters[i].name;
      row.insertCell().innerHTML = characters[i].birth_year;
      row.insertCell().innerHTML = characters[i].eye_color;
      row.insertCell().innerHTML = characters[i].gender;
      row.insertCell().innerHTML = characters[i].hair_color;
      row.insertCell().innerHTML = characters[i].height;
      row.insertCell().innerHTML = characters[i].mass;
      row.insertCell().innerHTML = characters[i].skin_color;
    }
  }
});
