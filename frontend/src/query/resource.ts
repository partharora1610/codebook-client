import axios from "axios"

async function getData() {
  const response = await axios.get(`http://localhost:5000/notebook`)
  return response.data
}

export default async function getResources() {
  const data = await getData()
  return data
}
