export function getUsers() {
  //need to modify: get only name, residence and ability
  return fetchUsers()
}

export function signIn(data) {
  return fetchUsers({ path: '/signin', method: 'POST', data })
}

export function signUp(data) {
  return fetchUsers({ path: '/signup', method: 'POST', data })
}

export function getUserSession(token) {
  return fetch('/verify?token=' + token, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => console.error(err))
}

export function logout(token) {
  return fetch('/logout?token=' + token, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => console.error(err))
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
      console.error(err)
      throw err
    })
    //as found here https://stackoverflow.com/questions/29473426/fetch-reject-promise-with-json-error-object
  } else {
    return json
  }
}
