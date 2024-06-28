import axios from "axios"

async function getData() {
  const response = await axios.get(``)
  return response
}

export default async function getInfiniteNotebook() {
  const data = await getData()
  return data
}
