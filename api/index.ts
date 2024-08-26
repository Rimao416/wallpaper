import axios from "axios";

const API_KEY = "26140628-5856a3d3057563b5861cd7e52";
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;
const formatUrl = (params: any) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;
  let paramKeys = Object.keys(params);
  paramKeys.map((key) => {
    let value = key == "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });
  console.log("Final url", url);
  return url;
};
export const apiCall = async (url: any) => {
  try {
    const response = await axios.get(formatUrl(url));
    const { data } = response;
    return { success: true, data };
  } catch (error) {}
};
