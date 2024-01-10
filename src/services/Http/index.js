import axios from "axios";

export const enhancedFetch = async (url) => {
  try {
    const response = await axios.get(url)
    const result = await response.data
    return result
  } catch (error) {
    console.log('Error');
  }
}