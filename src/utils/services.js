export function getUsers() {
  return fetchUsers()
}

export function signIn(data) {
  return fetchUsers({ path: '/signin', method: 'POST', data })
}

export function signUp(data) {
  return fetchUsers({ path: '/signup', method: 'POST', data })
}

export function verifyUserSession(token) {
  return fetch('/verifySession?token=' + token, {
    method: 'GET',
  })
    .then(res => handleError(res))
    .catch(err => console.error(err))
}

export function logout(token) {
  return fetch('/logout?token=' + token, {
    method: 'GET',
  })
    .then(res => handleError(res))
    .catch(err => console.error(err))
}

function fetchUsers({
  path = '/getAllUsers/',
  method = 'GET',
  id = '',
  data,
} = {}) {
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
  } else {
    return json
  }
}
