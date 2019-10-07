export function getPlayers() {
  return fetchPlayers()
}

// export function postCard(data) {
//   return fetchPlayers({ method: 'POST', data })
// }

// export function patchCard(id, data) {
//   return fetchPlayers({ method: 'PATCH', id, data })
// }

function fetchPlayers({ method = 'GET', id = '', data } = {}) {
  return fetch('http://localhost:3333/players' + id, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
