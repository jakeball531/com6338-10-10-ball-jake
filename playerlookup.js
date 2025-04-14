var form = document.querySelector('form')

function clearInfo() {
  var info = document.getElementById('player-info')
  info.innerHTML = ''
}

function savePlayer(player) {
  localStorage.setItem('player_name', `${player.first_name} ${player.last_name}`)
  localStorage.setItem('player_team', player.team.full_name)
  localStorage.setItem('player_position', player.position)
  localStorage.setItem('player_height_feet', player.height_feet)
  localStorage.setItem('player_height_inches', player.height_inches)
}

document.getElementById('random-player').onclick = function () {
  clearInfo()

  var randomId = Math.floor(Math.random() * 400) + 1

  fetch(`https://www.balldontlie.io/api/v1/players/${randomId}`)

    .then(res => res.json())

    .then(data => {
      var info = document.getElementById('player-info')
      info.innerHTML = ''

      var name = document.createElement('h2')
      name.textContent = `${data.first_name} ${data.last_name}`
      info.appendChild(name)

      var team = document.createElement('p')
      team.textContent = `Team: ${data.team.full_name}`
      info.appendChild(team)

      var position = document.createElement('p')
      position.textContent = `Position: ${data.position}`
      info.appendChild(position)

      var height = document.createElement('p')
      height.textContent = `Height: ${data.height_feet}' ${data.height_inches}"`
      info.appendChild(height)

      savePlayer(data)
    })

    .catch(err => {
      console.error('Error:', err)
    });
};

form.onsubmit = function(e) {
  e.preventDefault()
  var searchPlayer = this.search.value.trim()
  if (!searchPlayer) return
  form.search.value = ""

  clearInfo()

  fetch("https://www.balldontlie.io/api/v1/players?search=" + searchPlayer)

  .then(res => res.json())

  .then(data => {
    if (data.data.length === 0) {
        var errorMessage2 = document.createElement('h3')
        errorMessage2.textContent = "Player not found"
        info.appendChild(errorMessage2)
      return
    }

    var player = data.data[0]

    var info = document.getElementById('player-info')
    info.innerHTML = ''

    var name = document.createElement('h2')
    name.textContent = `${player.first_name} ${player.last_name}`
    info.appendChild(name)

    var team = document.createElement('p')
    team.textContent = `Team: ${player.team.full_name}`
    info.appendChild(team)

    var position = document.createElement('p')
    position.textContent = `Position: ${player.position}`
    info.appendChild(position)

    var height = document.createElement('p')
    height.textContent = `Height: ${player.height_feet}' ${player.height_inches}"`
    info.appendChild(height)

    savePlayer(player)
  })
  
  .catch(function(err){
    var errorMessage = document.createElement('h3')
    errorMessage.textContent = "Player not found"
    info.appendChild(errorMessage)
  })
}