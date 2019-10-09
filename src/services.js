export function getPlayers() {
  return fetchPlayers()
}

export function postPlayer(data) {
  return fetchPlayers({ method: 'POST', data })
}

function fetchPlayers({ method = 'GET', id = '', data } = {}) {
  return fetch('/players/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => handleError(res))
}

function handleError(res) {
  let json = res.json()
  if (!res.ok) {
    return json.then(err => {
      throw err
    })
  }
  return json
}
