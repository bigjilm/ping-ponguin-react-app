export function getAllUsers() {
  return fetchUsers()
}

export function getUserById(id) {
  return fetchUsers({ path: '/getUserById?id=' + id })
}

export function getUserBySession(token) {
  return fetchUsers({ path: '/getUserBySession?token=' + token })
}

export function signIn(data) {
  return fetchUsers({ path: '/signin', method: 'POST', data })
}

export function signUp(data) {
  return fetchUsers({ path: '/signup', method: 'POST', data })
}

export function deleteUser(id) {
  return fetchUsers({ path: '/deleteUser?id=' + id, method: 'DELETE' })
}

export function verifyUserSession(token) {
  return fetch('/verifySession?token=' + token, {
    method: 'GET',
  }).then(handleError)
}

export function logout(token) {
  return fetch('/logout?token=' + token, {
    method: 'GET',
  }).then(handleError)
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

export function getChannels(userId) {
  return fetch('getChannels?userId=' + userId, {
    method: 'GET',
  }).then(handleError)
}

export function getMessages(channelId) {
  return fetch('getMessages?channelId=' + channelId, {
    method: 'GET',
  }).then(handleError)
}

function fetchUsers({ path = '/getAllUsers/', method = 'GET', data } = {}) {
  return fetch(path, {
    method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(handleError)
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
