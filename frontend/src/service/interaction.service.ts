import axios from "axios"

const apiUrl = "http://localhost:5000/interaction"

export const makeInteraction = async ({
  postId,
  count,
}: {
  postId: string
  count: number
}) => {
  const response = await axios.post(`${apiUrl}/${postId}`, { count })
  return response.data
}

export const thumpsUp = async (postId: string) => {
  const response = await axios.post(`${apiUrl}/${postId}/thumps-up`)
  return response.data
}
