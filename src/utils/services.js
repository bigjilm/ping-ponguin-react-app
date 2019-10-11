export function getUsers() {
  return fetchUsers()
}

// export function getToken(key) {
//   return fetch('/users/verify', {
//     method: 'GET',
//     body: JSON.stringify(key),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }).then(res => handleError(res))
// }

export function signIn(data) {
  return fetchUsers({ path: 'users/signin', method: 'POST', data })
}

export function signUp(data) {
  return fetchUsers({ path: 'users/signup', method: 'POST', data })
}

export function postUser(data) {
  return fetchUsers({ method: 'POST', data })
}

function fetchUsers({ path = '/users/', method = 'GET', id = '', data } = {}) {
  return fetch(path + id, {
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
