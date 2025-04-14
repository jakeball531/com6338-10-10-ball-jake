var form = document.querySelector('form')

function clearPoke() {
    var pokeinfo = document.getElementById('pokemon-info')
    pokeinfo.innerHTML = ''
  }

function savePoke(pokemon) {
  localStorage.setItem('poke_name', pokemon.name)
  localStorage.setItem('poke_id', pokemon.id)
  localStorage.setItem('poke_height', pokemon.height)
  localStorage.setItem('poke_weight', pokemon.weight)
  localStorage.setItem('poke_img', pokemon.sprites.front_default)
}

document.getElementById('random-pokemon').onclick = function () {

  clearPoke();
  var randomPoke = Math.floor(Math.random() * 1025) + 1

  fetch(`https://pokeapi.co/api/v2/pokemon/${randomPoke}`)
  .then(res => res.json())
  .then(data => {
    var pokeinfo = document.getElementById('pokemon-info')
    pokeinfo.innerHTML = ''

    var namePoke = document.createElement('h2')
    namePoke.textContent = data.name.toUpperCase()
    pokeinfo.appendChild(namePoke)
        
    var img = document.createElement('img')
    img.src = data.sprites.front_default
    pokeinfo.appendChild(img)
        
    var height = document.createElement('p')
    height.textContent = `Height: ${data.height * 10} cm`
    pokeinfo.appendChild(height)
        
    var weight = document.createElement('p')
    weight.textContent = `Weight: ${data.weight / 10} kg`
    pokeinfo.appendChild(weight)
        
    var species = document.createElement('p')
    species.textContent = `Pokedex number: #${data.id}`
    pokeinfo.appendChild(species)
  })

  savePoke(data)

  .catch(err => console.error('Error:', err))
}


form.onsubmit = function(e) {
  e.preventDefault()
  var searchPoke = this.search.value.trim()
  if (!searchPoke) return
  form.search.value = ""
  console.log(searchPoke)
  
  clearPoke()
  
  fetch("https://pokeapi.co/api/v2/pokemon/" + searchPoke)
  
  .then(res => res.json())
  .then(data => {
    var pokeinfo = document.getElementById('pokemon-info')
    pokeinfo.innerHTML = ''

    var namePoke = document.createElement('h2')
    namePoke.textContent = data.name.toUpperCase()
    pokeinfo.appendChild(namePoke)
        

    var img = document.createElement('img')
    img.src = data.sprites.front_default
    pokeinfo.appendChild(img)
        
    var height = document.createElement('p')
    height.textContent = `Height: ${data.height * 10} cm`
    pokeinfo.appendChild(height)
        
    var weight = document.createElement('p')
    weight.textContent = `Weight: ${data.weight / 10} kg`
    pokeinfo.appendChild(weight)
        
    var species = document.createElement('p')
    species.textContent = `Pokedex number: #${data.id}`
    pokeinfo.appendChild(species)
  })
  
  savePoke(data)

  .catch(function(err){
    var errorMessage = document.createElement('h3')
    errorMessage.textContent = "Pokemon not found"
    pokeinfo.appendChild(errorMessage)
  })
}