export function getUsers() {
  return fetchUsers()
}

export function postUser(data) {
  return fetchUsers({ method: 'POST', data })
}

function fetchUsers({ method = 'GET', id = '', data } = {}) {
  return fetch('/Users/' + id, {
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
    //as found here https://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
  }
  return json
}
