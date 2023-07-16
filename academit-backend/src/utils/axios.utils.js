import create from 'http-errors'
import axios from 'axios'
export const axiosUtil = async (config) => {
  try {
    const result = await axios(config)
    return result.data
  } catch (error) {
    throw create[`${error.response.status}`](error.message)
  }
}
