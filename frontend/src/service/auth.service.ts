import axios from "axios"

interface User {
  id: string
  username: string
}

interface Response {
  user: User
  token: string
}

const apiUrl = "http://localhost:5000/auth"

export const login = async (
  username: string,
  password: string
): Promise<Response> => {
  const response = await axios.post(`${apiUrl}/login`, { username, password })
  return response.data
}

export const logout = async (): Promise<void> => {
  await axios.post(`${apiUrl}/logout`)
}

export const register = async (
  email: string,
  password: string,
  confirmPassword: string,
  username: string
): Promise<Response> => {
  const response = await axios.post(`${apiUrl}/register`, {
    email,
    password,
    confirmPassword,
    username,
  })
  return response.data
}
