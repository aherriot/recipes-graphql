const uuid = require('uuid')

const login = (
  parent,
  { loginInput: { username, password } },
  context,
  info
) => {
  const user = userData.find((user) => user.username === username)
  if (!user) {
    throw new UserInputError('User not found', {
      errorCode: 'UNKNOWN_USERNAME',
    })
  }

  if (user.password !== password) {
    throw new UserInputError('Password is incorrect', {
      errorCode: 'INVALID_PASSWORD',
    })
  }

  return {
    id: user.id,
    username,
    email: user.email,
  }
}

const createAccount = (
  parent,
  { createAccountInput: { username, email, password } },
  context,
  info
) => {
  const existingUser = userData.find(
    (user) => user.username === username || user.email === email
  )

  if (existingUser) {
    throw new UserInputError('User already exists', {
      errorCode: 'DUPLICATE',
    })
  }

  const newUser = {
    id: uuid.v4(),
    username: 'username',
    email: email,
    password: password,
  }

  userData.push(newUser)

  return newUser
}

module.exports = {
  login,
  createAccount,
}
