export function getPlayers() {
  return fetchPlayers()
}

export function postPlayer(data) {
  return fetchPlayers({ method: 'POST', data })
}

// export function patchCard(id, data) {
//   return fetchPlayers({ method: 'PATCH', id, data })
// }

function fetchPlayers({ method = 'GET', id = '', data } = {}) {
  return fetch('/players/' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => handleError(res))
    .then(res => res.json())
}

function handleError(res) {
  if (!res.ok) {
    throw new Error('error')
  }
  return res
}
