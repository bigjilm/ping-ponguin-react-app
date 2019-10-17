export function getAllUsers() {
  return fetchUsers()
}

export function getUser(token) {
  return fetchUsers({ path: '/getUser?token=' + token })
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

export function editProfile(data) {
  return fetchUsers({
    path: '/editProfile?id=' + data._id,
    method: 'PATCH',
    data,
  })
}

export function editPassword(id, data) {
  return fetchUsers({
    path: '/editPassword?id=' + id,
    method: 'PATCH',
    data,
  })
}

function fetchUsers({ path = '/getAllUsers/', method = 'GET', data } = {}) {
  return fetch(path, {
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
